---
name: code-review-and-quality
description: >-
  Five-axis code review and health inspection from Addy Osmani's agent-skills. Triggers on /review, PR preparation, pre-commit checks, or when assessing code quality, security, and maintainability.
---

# Code Review & Quality Assurance (Addy Osmani)

A structured five-axis audit framework designed to evaluate code health prior to merge or release.

---

## The 5-Axis Review Framework

Every review must evaluate and score changes across five distinct dimensions:

### Axis 1: Correctness & Logic
- Does the code fulfill 100% of the specification requirements?
- Are edge cases handled (null, undefined, empty array, timeouts, unexpected API responses)?
- Are race conditions, state desyncs, or unhandled promise rejections possible?

### Axis 2: Security & Privacy
- Are user inputs sanitized or parameterized (SQL injection, XSS, SSRF)?
- Are secrets, API keys, or private tokens kept out of source code and commits?
- Are permissions, authorization scopes, and CORS properly restricted?

### Axis 3: Performance & Resources
- Are network waterfalls introduced?
- Are expensive calculations hoisted or memoized?
- Are event listeners, intervals, and observers cleaned up to prevent memory leaks?
- Are bundle imports direct rather than pulling large barrel files?

### Axis 4: Maintainability & Simplicity
- Is the code self-documenting with clear naming and minimal nesting?
- Does it adhere to the DRY (Don't Repeat Yourself) principle without premature abstraction?
- Is dead code, commented-out code, or unused imports removed?

### Axis 5: Architecture & Standards
- Does the code respect project conventions and directory organization?
- Are interfaces and types decoupled from concrete implementations?
- Does it use modern browser/framework capabilities over legacy workarounds?

---

## Output Template

When performing a review, generate findings in the following format:
```markdown
### Code Review Summary: [Component / Feature Name]

- **Axis 1 (Correctness)**: [Pass | Minor | Critical] - Notes...
- **Axis 2 (Security)**: [Pass | Minor | Critical] - Notes...
- **Axis 3 (Performance)**: [Pass | Minor | Critical] - Notes...
- **Axis 4 (Maintainability)**: [Pass | Minor | Critical] - Notes...
- **Axis 5 (Architecture)**: [Pass | Minor | Critical] - Notes...

#### Required Changes Before Merge:
1. ...
```
