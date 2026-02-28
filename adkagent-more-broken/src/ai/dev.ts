/**
 * Development entry point for AI flows.
 * Loads environment variables and registers all AI flows.
 */

import { config } from 'dotenv';
config();

// Import flows so Genkit can register them
import '@/ai/flows/answer-question-with-wikipedia';

// Optional: Validate required environment variables
if (!process.env.OPENAI_API_KEY) {
  console.warn(
    'Warning: OPENAI_API_KEY is not set. AI features may not function properly.'
  );
}