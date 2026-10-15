---
name: test-driven-development
description: >-
  Strict Test-Driven Development (TDD) workflow from Addy Osmani's agent-skills. Triggers on /test, /build, bug fixing tasks, or when implementing new domain logic. Enforces Red-Green-Refactor cycles and concrete verification proof.
---

# Test-Driven Development (Addy Osmani)

Enforces strict verification and the classic Red-Green-Refactor cycle. "Tests are proof, not an afterthought."

---

## 1. The Three Laws of TDD for Agents

1. **You must write a failing test before writing any production code.**
2. **You must only write enough of a test to demonstrate a failure or compile error.**
3. **You must only write enough production code to pass the single failing test.**

---

## 2. Execution Phases

### Phase 1: Red (Observe Failure)
- Write an automated unit or integration test testing the smallest atomic requirement.
- Execute the test in the terminal using the workspace runner.
- **MANDATORY**: Verify that it fails for the expected reason (not a syntax error or wrong import).

### Phase 2: Green (Make It Pass)
- Write the minimal, direct code required to pass the test.
- Resist the temptation to write ahead of the test or implement speculative features.
- Re-run the test command. Verify all tests pass with code 0.

### Phase 3: Refactor (Clean & Optimize)
- Remove duplication, improve naming, streamline abstractions.
- Ensure all tests still pass after refactoring.

---

## 3. Bug Fixing Protocol

When a bug is reported:
1. Write a regression test that faithfully reproduces the reported failure.
2. Run the test and verify it fails (Red).
3. Apply the minimal fix to production code.
4. Run the test and verify it passes (Green).
5. Never close a bug ticket without the accompanying regression test.
