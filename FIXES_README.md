# FIXES_README.md
Glitch-O-Fix
## Track: Agentic AI (Track A)
Identified issues:
1: Wikipedia Flow Stabilization
Commit:7fa1418 – Updated wikipedia flow

## Issue
The Wikipedia answer flow was breaking due to:
- Duplicate and inconsistent Zod schemas
- Incorrect output keys (`text/urls` instead of `answer/sources`)
- Invalid Wikipedia API endpoints
- Wrong variable references
- Corrupted loop variable
- Improper async flow definition

## Root Cause Analysis
The flow had undergone partial refactoring but was not fully aligned with:
- Zod schema validation rules
- Genkit tool and flow structure
- Wikipedia API specifications
- Type-safe output contracts

## Fix
- Standardized output schema to:
  `{ answer: string, sources: string[] }`
- Corrected API URLs and parameters
- Fixed loop and variable references
- Added input sanitization
- Implemented proper error handling
- Rebuilt `defineFlow` structure to match framework requirements

## Impact
- Eliminated runtime errors
- Restored schema consistency
- Ensured valid API responses
- Improved robustness and security



