'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

/* ===========================
   INPUT SCHEMA
=========================== */

const AnswerQuestionWithWikipediaInputSchema = z.object({
  question: z.string().min(3).max(500).describe('The user question to answer using Wikipedia.'),
});

/* ===========================
   WIKIPEDIA TOOL
=========================== */

const WikipediaSearchToolInputSchema = z.object({
  query: z.string().min(1).describe('The search query for Wikipedia.'),
});

const WikipediaSearchResultSchema = z.object({
  title: z.string(),
  extract: z.string(),
  url: z.string().url(),
});

const WikipediaSearchToolOutputSchema = z.array(WikipediaSearchResultSchema);

const wikipediaSearchTool = ai.defineTool(
  {
    name: 'wikipediaSearch',
    description:
      'Searches Wikipedia for articles related to the given query and returns their titles, extracts, and URLs.',
    inputSchema: WikipediaSearchToolInputSchema,
    outputSchema: WikipediaSearchToolOutputSchema,
  },
  async ({ query }) => {
    try {
      // 1. ADVANCED SANITIZATION (Added to handle typos and question phrasing)
      // Remove punctuation and phrases like "who is", "what is" to focus on the keyword
      const cleanQuery = query
        .replace(/[?.,]/g, '')
        .replace(/^(who|what|where|when) (is|was|are|were) /i, '')
        .trim();

      // 2. SWITCH TO OPENSEARCH API (This fixes the "whwo" typo issue)
      // OpenSearch handles fuzzy matching and suggestions much better than standard search
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
        cleanQuery
      )}&limit=3&namespace=0&format=json&origin=*`;

      const searchResponse = await fetch(searchUrl);
      if (!searchResponse.ok) return [];

      const searchData: any = await searchResponse.json();

      // OpenSearch response format: [ searchTerm, [titles], [descriptions], [urls] ]
      const titles = searchData[1];

      if (!titles || titles.length === 0) return [];

      const results: z.infer<typeof WikipediaSearchToolOutputSchema> = [];

      // 3. FETCH EXTRACTS FOR FOUND TITLES (Preserved your existing logic structure)
      for (const title of titles) {
        const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext=true&format=json&titles=${encodeURIComponent(
          title
        )}&origin=*`;

        const extractResponse = await fetch(extractUrl);
        if (!extractResponse.ok) continue;

        const extractData: any = await extractResponse.json();

        let extract = '';
        if (extractData?.query?.pages) {
          const pageId = Object.keys(extractData.query.pages)[0];
          extract = extractData.query.pages[pageId]?.extract || '';
        }

        // If extract is empty or just "refer to...", skip it or provide a default
        if (!extract) continue;

        results.push({
          title,
          extract,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(
            title.replace(/ /g, '_')
          )}`,
        });
      }

      return results;
    } catch (error) {
      console.error('Error fetching from Wikipedia:', error);
      return [];
    }
  }
);

/* ===========================
   OUTPUT SCHEMA (FIXED)
=========================== */

const AnswerQuestionWithWikipediaOutputSchema = z.object({
  answer: z.string().describe('Final synthesized answer to the question.'),
  sources: z.array(z.string()).describe('List of source URLs used.'),
});

export type AnswerQuestionWithWikipediaInput = z.infer<
  typeof AnswerQuestionWithWikipediaInputSchema
>;

export type AnswerQuestionWithWikipediaOutput = z.infer<
  typeof AnswerQuestionWithWikipediaOutputSchema
>;

/* ===========================
   FLOW
=========================== */

const answerQuestionWithWikipediaFlow = ai.defineFlow(
  {
    name: 'answerQuestionWithWikipediaFlow',
    inputSchema: AnswerQuestionWithWikipediaInputSchema,
    outputSchema: AnswerQuestionWithWikipediaOutputSchema,
  },
  async ({ question }) => {
    const articles = await wikipediaSearchTool({ query: question });

    if (!articles.length) {
      return {
        answer: `I couldn't find any articles matching that request. It's possible the spelling was too far off, or the topic isn't on Wikipedia.`,
        sources: [],
      };
    }

    // Basic synthesis logic
    const combinedExtract = articles
      .map((a) => a.extract)
      .filter(Boolean)
      .join('\n\n');

    return {
      answer:
        combinedExtract.length > 0
          ? combinedExtract.substring(0, 2000)
          : 'Unable to generate answer.',
      sources: articles.map((a) => a.url),
    };
  }
);

/* ===========================
   EXPORTED FUNCTION
=========================== */

export async function answerQuestionWithWikipedia(
  input: AnswerQuestionWithWikipediaInput
): Promise<AnswerQuestionWithWikipediaOutput> {
  return answerQuestionWithWikipediaFlow(input);
}