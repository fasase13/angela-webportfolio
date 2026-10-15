---
name: using-agent-skills
description: >-
  Meta-router and software engineering lifecycle director from Addy Osmani's agent-skills. Activates the appropriate phase-specific engineering skill based on the user's intent: /spec, /plan, /build, /test, /review, or /ship.
---

# Agent Skills Lifecycle Director (Addy Osmani)

A disciplined engineering orchestration framework designed to transition AI agents from ad-hoc coders into rigorous, senior-grade software engineers. Enforces non-negotiable verification gates, process-over-prose discipline, and phased execution.

---

## 1. The Engineering Lifecycle

```
  DEFINE          PLAN           BUILD          VERIFY         REVIEW          SHIP
 ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
 │ Idea │ ───▶ │ Spec │ ───▶ │ Code │ ───▶ │ Test │ ───▶ │  QA  │ ───▶ │  Go  │
 │Refine│      │  PRD │      │ Impl │      │Debug │      │ Gate │      │ Live │
 └──────┘      └──────┘      └──────┘      └──────┘      └──────┘      └──────┘
  /spec          /plan          /build        /test         /review       /ship
```

---

## 2. Command & Skill Mapping

| Stage | Trigger / Slash Command | Skill Activated | Core Rule |
| :--- | :--- | :--- | :--- |
| **01. Define** | `/spec`, "Define feature" | `spec-driven-development` | Never write implementation code before a spec exists. |
| **02. Plan** | `/plan`, "Plan tasks" | `planning-and-task-breakdown` | Deconstruct work into atomic, verifiable tasks with explicit gates. |
| **03. Build** | `/build`, "Implement" | `test-driven-development` & `incremental-implementation` | Red-Green-Refactor. Implement one vertical slice at a time. |
| **04. Verify** | `/test`, "Prove it works" | `verification-and-proof` | Concrete proof in terminal output is mandatory. Assumptions are forbidden. |
| **05. Review** | `/review`, "Code review" | `code-review-and-quality` | 5-axis review: correctness, security, performance, maintainability, architecture. |
| **06. Ship** | `/ship`, "Deploy ready" | `shipping-and-launch` | Pre-flight checklists, zero-downtime, verification in production. |

---

## 3. Anti-Rationalization Guardrails

AI agents frequently attempt shortcuts under cognitive load. The following anti-rationalization rules are strictly enforced:

| Rationalization (FORBIDDEN) | Mandated Behavior |
| :--- | :--- |
| *"The task is simple, I don't need a spec or plan."* | If it touches more than 1 file or alters an interface, write the spec/plan first. |
| *"I will write tests after the implementation is finished."* | Write the failing test first. Observe it fail. Then write minimum code to pass. |
| *"The code looks correct, so it must work."* | Run the command or test in the terminal and provide the exact exit code and stdout. |
| *"I will skip edge cases for now and handle them later."* | Explicitly list edge cases in the spec boundaries. Either implement or reject upfront. |
| *"Let me refactor other files while I am in here."* | Scope boundaries: Never touch files outside the agreed atomic task. |

---

## 4. Progressive Disclosure

To preserve model context, detailed guidelines and checklists live in dedicated sub-skills. When this director matches a phase, load only the specific target skill into active focus.
