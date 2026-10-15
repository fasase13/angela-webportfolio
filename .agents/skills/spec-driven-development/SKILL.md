---
name: spec-driven-development
description: >-
  Spec-driven development workflow from Addy Osmani's agent-skills. Triggers on /spec, or whenever requirements are ambiguous, a new feature/system is initiated, or before starting multi-file architectural changes. Enforces writing a structured specification before code.
---

# Spec-Driven Development (Addy Osmani)

Spec-driven development prevents scope creep, rework, and hallucinated requirements by establishing an agreed-upon contract before any code is written or edited.

---

## 1. When to Trigger
- When the user asks for a new feature, architecture redesign, or refactor.
- When requirements contain implicit assumptions or ambiguity.
- When prompted with `/spec`.

---

## 2. Specification Protocol

Every specification produced must adhere to the **PRD-Lite Format**:

### Part 1: Problem & Goals
- **Objective**: Exactly what problem this work solves in 2-3 sentences.
- **Non-Goals / Scope Boundaries**: Explicitly list what will **NOT** be built in this slice.
- **Success Criteria**: Measurable conditions that prove the task is 100% complete.

### Part 2: Technical Design & Interfaces
- **Public API / Contracts**: Type definitions, function signatures, props, route endpoints.
- **Data Flow & State**: Where state originates, how it mutates, and where it is persisted.
- **File & Directory Changes**: List exact target file paths to be created or modified.

### Part 3: Edge Cases & Error States
- Network failures, empty collections, invalid inputs, unauthorized states.
- Performance limits (e.g., handling 1,000+ items without UI stutter).

### Part 4: Verification Plan
- Explicit unit/integration test commands that will validate the implementation.
- Expected terminal output and status code.

---

## 3. The Spec Review Gate

Do not proceed to implementation (`/build`) until the user approves the spec or confirms the scope boundaries.
