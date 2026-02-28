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


2: Development Environment Stabilization (dev.nix)
Commit: 33864d8  
Chore: Cleaned and stabilized dev.nix configuration for consistent Node 20 environment

## Issue
The development environment configuration was inconsistent and partially duplicated:
- Repeated declarations
- Unstructured package definitions
- Nested/duplicated preview configuration
- Minor formatting and structural inconsistencies
- Unclear separation between dev-only and production context

## Root Cause
The `dev.nix` file had undergone incremental edits without structural cleanup, leading to:
- Redundant blocks
- Improper nesting
- Configuration drift
- 
## Fix
- Standardized on `stable-24.11` channel
- Locked Node.js to version 20
- Cleaned duplicate fields and nesting
- Simplified Firebase emulator configuration
- Restructured preview command formatting
- Removed unnecessary extensions configuration

## Impact
- Stable and reproducible Node 20 development environment
- Cleaner configuration structure
- Reduced setup errors for collaborators
- Improved maintainability

3: Architecture & Security Blueprint Expansion

Commit: dafe946  
Docs: Expanded blueprint with architecture, security model, and CI considerations

## Issue
The project documentation lacked:
- Clear architectural explanation
- Defined AI tool + flow separation
- Security model description
- CI/CD compatibility notes
- Explicit design principles
This made the system harder to evaluate, maintain, and scale.

## Root Cause
Initial documentation focused only on features, without explaining:
- System architecture
- Data flow
- Validation layers
- Security safeguards
- Development environment guarantees

## Fix
- Added structured overview of system architecture
- Documented Tool + Flow orchestration model
- Defined data flow lifecycle
- Formalized security measures (sanitization, schema validation, safe API calls)
- Added CI/CD compatibility expectations (Node 20, TS checks, linting)
- Included design principles and future improvement roadmap

## Impact
- Improved technical clarity for reviewers
- Demonstrated architectural maturity
- Increased maintainability
- Strengthened security and robustness documentation
- Made system evaluation easier for jury review

4: Removal of Malicious/Invalid Imports & Proper Flow Registration
Commit: 34d99dd  
Fix: Removed malicious placeholder imports and properly registered AI flows for development

## Issue
The development entry file (`dev.ts`) contained:
- Malicious/invalid placeholder imports
- Non-existent module references
- Unnecessary Zod import
- Unregistered AI flows

This caused:
- Runtime failures
- Module resolution errors
- Potential security risks
- AI flows not being properly initialized

## Root Cause
The file included corrupted placeholder code and incomplete development setup, likely from scaffolding or injected mock references.

## Fix
- Removed malicious and invalid import statements
- Eliminated unused dependencies
- Properly imported and registered the Wikipedia flow
- Added environment variable validation warning for `OPENAI_API_KEY`

## Impact
- Restored stable development entry point
- Eliminated module resolution errors
- Improved security posture
- Ensured AI flows are correctly initialized during development

5: Corrected Gemini Model Configuration & Environment Validation
Commit: fa03754  
Fix: Corrected invalid Gemini model name and added environment validation for Google AI plugin

## Issue
The Genkit configuration contained:
- Duplicate imports (`genkit`, `googleAI`)
- Invalid Gemini model name (`gemini-2.5-flashes`)
- Improper plugin configuration
- Missing explicit API key injection

This caused:
- Potential runtime initialization failures
- Invalid model resolution
- AI not functioning correctly
- Confusing and redundant configuration

## Root Cause
Misconfigured Genkit setup with:
- Typographical errors in model naming
- Duplicate code blocks
- Inconsistent plugin initialization pattern
- Lack of proper environment validation

## Fix
- Removed duplicate imports
- Replaced invalid model with stable `googleai/gemini-1.5-flash`
- Properly configured `googleAI` plugin with `apiKey`
- Added environment variable warning for `GOOGLE_API_KEY`
- Cleaned and consolidated Genkit initialization

## Impact
- Restored stable AI initialization
- Prevented runtime model errors
- Improved configuration clarity
- Strengthened environment-based security
- Ensured compatibility with Google GenAI plugin

6: Corrected Tailwind Layer Syntax & Dark Mode Selector
Commit: 5ac93d1  
Fix: Corrected Tailwind layer syntax and invalid dark mode selector

## Issue
The global stylesheet (`globals.css`) contained:
- Invalid dark mode selector (`.dark force`)
- Incorrect `@layer base` block syntax
- Misplaced curly braces

This caused:
- Tailwind compilation errors
- Broken dark mode styling
- Potential build failures
- Unpredictable UI rendering

## Root Cause
CSS syntax corruption and incorrect Tailwind layer usage resulted in invalid stylesheet parsing.

## Fix
- Removed invalid `.dark force` selector
- Corrected `.dark` class definition
- Fixed `@layer base` syntax
- Properly structured CSS blocks and braces

## Impact
- Restored Tailwind compilation
- Enabled proper dark mode behavior
- Prevented UI rendering inconsistencies
- Improved frontend stability



