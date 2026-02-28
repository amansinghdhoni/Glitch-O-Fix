import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Validate required environment variables
 */
if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    'Warning: GOOGLE_API_KEY is not set. AI functionality may not work properly.'
  );
}

/**
 * Initialize Genkit AI instance
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],

  // Use stable and valid Gemini model
  model: 'googleai/gemini-1.5-flash',

});