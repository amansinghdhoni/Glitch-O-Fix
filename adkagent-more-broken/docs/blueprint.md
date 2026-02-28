# **App Name**: WikiAgent

## Overview

WikiAgent is an AI-powered question answering system that retrieves factual information from Wikipedia and synthesizes structured responses for users.

The system is built using a Tool + Flow architecture powered by Genkit, ensuring modularity, validation, and secure AI orchestration.

---

## Core Features

### 1. Question Input
- Text input field for users to type their questions.
- Input validation (minimum/maximum length).
- Sanitization to prevent prompt injection attacks.

### 2. AI Agent Answering
- Uses a dedicated Wikipedia search tool.
- Fetches top relevant Wikipedia articles.
- Extracts plaintext summaries safely via Wikipedia API.
- Synthesizes answers using structured flow logic.
- Avoids hallucination by grounding responses in retrieved content.

### 3. Source Linking
- Displays list of Wikipedia URLs used.
- Ensures transparency and verifiability.
- Sources are validated URL strings.

### 4. Chat Interface
- Displays conversation history.
- Supports scrolling through previous questions and answers.
- Graceful error messaging when retrieval fails.

---

## Technical Architecture

### AI Layer
- Genkit-based `defineTool` for Wikipedia search.
- Genkit-based `defineFlow` for answer orchestration.
- Strict input/output schemas using Zod validation.

### Data Flow
1. User submits question.
2. Input schema validates and sanitizes question.
3. Wikipedia search tool retrieves top 3 articles.
4. Extract API retrieves plaintext summaries.
5. Flow synthesizes final response.
6. Output returned with answer and source URLs.

---

## Security & Robustness Measures

- Input sanitization against prompt injection.
- Strict Zod schema validation.
- Safe API calls with error handling.
- Graceful fallback when Wikipedia returns no results.
- No hardcoded secrets.
- Environment variable validation.
- Structured error boundaries in UI.
- Rate limiting in API routes (if applicable).

---

## CI/CD Compatibility

The project is designed to:

- Compile successfully under Node 20.
- Pass TypeScript validation.
- Pass lint checks.
- Avoid runtime crashes.
- Avoid security vulnerabilities.
- Maintain clean and meaningful Git history.

---

## Design Principles

- Do not hardcode answers.
- Do not bypass flow logic.
- Preserve modular AI architecture.
- Keep tool and flow separation intact.
- Ensure maintainability and readability.

---

## Future Improvements

- Add caching for repeated queries.
- Improve answer summarization logic.
- Add rate limiting middleware.
- Add streaming responses.
- Add unit tests for flow logic.
