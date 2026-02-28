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

### Issue
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

### Issue
The project documentation lacked:
- Clear architectural explanation
- Defined AI tool + flow separation
- Security model description
- CI/CD compatibility notes
- Explicit design principles
This made the system harder to evaluate, maintain, and scale.

### Root Cause
Initial documentation focused only on features, without explaining:
- System architecture
- Data flow
- Validation layers
- Security safeguards
- Development environment guarantees

### Fix
- Added structured overview of system architecture
- Documented Tool + Flow orchestration model
- Defined data flow lifecycle
- Formalized security measures (sanitization, schema validation, safe API calls)
- Added CI/CD compatibility expectations (Node 20, TS checks, linting)
- Included design principles and future improvement roadmap

### Impact
- Improved technical clarity for reviewers
- Demonstrated architectural maturity
- Increased maintainability
- Strengthened security and robustness documentation
- Made system evaluation easier for jury review



