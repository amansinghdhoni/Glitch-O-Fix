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
- 
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

7: Rebuilt Corrupted Root Layout with Proper Next.js App Router Structure
Commit: 6c124a4  
Fix: Rebuilt corrupted layout.tsx with proper Next.js App Router structure and font optimization

## Issue
The `layout.tsx` file was severely corrupted with:
- Random injected characters and malformed text
- Duplicate imports
- Invalid component declaration
- Broken JSX structure
- Incorrect `<html>` language attribute
- Manual font `<link>` usage conflicting with Next.js font optimization

## Root Cause
File corruption and improper Next.js App Router structure resulted in invalid TypeScript and JSX syntax.

## Fix
- Removed all corrupted and injected content
- Rebuilt `RootLayout` using proper Next.js App Router format
- Properly defined `Metadata` export
- Implemented `next/font/google` Inter font optimization
- Removed manual `<head>` font links
- Corrected `<html lang="en">`
- Cleaned and structured JSX properly

## Impact
- Restored application compilation
- Ensured correct App Router behavior
- Enabled optimized font loading
- Improved performance and SEO compliance
- Eliminated structural runtime risks

8: Rebuilt Corrupted page.tsx with Functional WikiAgent Chat Interface
Commit: a4cd1d4  
Fix: Rebuilt corrupted page.tsx with functional WikiAgent chat interface and Wikipedia integration

## Issue
The `page.tsx` file was completely corrupted with:
- Massive injected random characters
- Broken JSX structure
- Invalid TypeScript syntax
- Missing component export
- No functional UI logic

## Root Cause
Severe file corruption and missing functional structure for the main App Router page component.

## Fix
- Removed all corrupted and injected content
- Rebuilt page using Next.js App Router (`'use client'`)
- Implemented React state management for chat
- Integrated `answerQuestionWithWikipedia` AI flow
- Added proper async handling with loading state
- Implemented structured message typing
- Added error fallback handling
- Displayed validated Wikipedia source links

## Impact
- Restored full frontend functionality
- Enabled end-to-end AI question answering
- Properly connected UI to AI flow layer
- Improved UX with loading and error states
- Eliminated runtime and compilation failures

9: Corrected TypeScript Ref Types in Alert Components for Strict Type Safety
Commit: 8628d32  
Fix: Corrected TypeScript ref types in Alert components for strict type safety

### Issue
The "alert-dialog.tsx" component had incorrect ref type definitions:

- `AlertTitle` was typed as `HTMLParagraphElement` but rendered an `<h5>` element.
- `AlertDescription` was typed as `HTMLParagraphElement` but rendered a `<div>` element.
- 
## Root Cause
Incorrect generic type parameters passed to `React.forwardRef`, not matching the actual rendered DOM elements.

## Fix
- Updated `AlertTitle` ref type to `HTMLHeadingElement`
- Updated `AlertDescription` ref type to `HTMLDivElement`
- Ensured rendered JSX elements align with declared ref types
- Maintained proper `React.HTMLAttributes<>` typing

## Impact
- Eliminated strict TypeScript compilation warnings
- Improved ref correctness and safety
- Restored full type alignment between JSX and generics
- Increased maintainability and developer experience


