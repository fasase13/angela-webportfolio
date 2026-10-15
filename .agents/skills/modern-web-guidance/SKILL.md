---
name: modern-web-guidance
description: >-
  Search tool and architectural standards for modern web development best practices from Google Chrome and Microsoft Edge. MANDATORY: Trigger when building, refactoring, or optimizing frontend components, HTML layouts, CSS styling, UI dialogs/popovers, modern animations, and Core Web Vitals (INP, LCP, CLS).
---

# Modern Web Guidance (Google Chrome & Microsoft Edge Standards)

A systematic skill embedding modern web platform standards, native browser APIs, and browser compatibility best practices directly into agent workflows. Steers implementations away from bloated legacy patterns and heavy JavaScript polyfills toward high-performance native browser features.

---

## 1. Trigger Conditions & Decision Matrix

Activate this skill when:
- Designing or implementing UI components (modals, dialogs, drawers, dropdowns, tooltips, popovers).
- Writing CSS layouts, responsive grids, container queries, and subgrids.
- Creating animations, scroll effects, or multi-page transitions.
- Diagnosing or optimizing performance (Interaction to Next Paint - INP, Cumulative Layout Shift - CLS).
- Implementing forms, input validation, or autocomplete states.

Do NOT activate for:
- Pure backend logic (database schema, SQL, ORM configurations, Express routes).
- Server infrastructure, CI/CD pipelines, Dockerfiles.
- Machine-local tooling scripts without web UI.

---

## 2. Modern Native Web Standards vs. Legacy Anti-Patterns

| Category | Legacy Anti-Pattern (AVOID) | Modern Native Platform Solution (PREFER) |
| :--- | :--- | :--- |
| **Overlays & Modals** | Custom `div` + `z-index: 99999` + JS key listener | Native `<dialog>` element + `.showModal()` + `::backdrop` |
| **Tooltips & Menus** | Heavy Popper.js / Floating UI calculation | Native **Popover API** (`popover="auto"`) + CSS **Anchor Positioning** |
| **Component Layout** | Window `resize` listeners & custom breakpoints | CSS **Container Queries** (`@container (min-width: ...)`) |
| **Nested Grids** | Re-declaring explicit columns on inner children | CSS **Subgrid** (`grid-template-columns: subgrid`) |
| **Entry/Exit Transitions** | Complex JS animation classes or height hacks | CSS `@starting-style` + `transition-behavior: allow-discrete` |
| **Page Transitions** | Fragmented client-side router transition hacks | Native **View Transitions API** (`document.startViewTransition`) |
| **Scroll Animation** | Scroll event throttling with `requestAnimationFrame` | CSS **Scroll-Driven Animations** (`animation-timeline: scroll()`) |
| **Colors** | Raw Hex/RGB or CSS preprocessor color math | CSS `oklch()` color space + `color-mix(in oklch, ...)` |
| **Long Tasks** | `setTimeout(fn, 0)` hacks for cooperative multitasking | Native `scheduler.yield()` API |
| **Field Auto-Sizing** | JS measurement of `scrollHeight` on textarea input | CSS `field-sizing: content` |
| **Form Validation** | Immediate validation on keystroke (premature errors) | CSS `:user-invalid` and `:user-valid` pseudo-classes |
| **DOM Move** | Re-mounting DOM node (losing iframe/video state) | Native `Node.moveBefore()` API |

---

## 3. Core Implementation Guidelines

### A. Native Overlays: `<dialog>` and Popover API
```html
<!-- Native Modal with automatic top-layer rendering and backdrop -->
<dialog id="user-settings-modal" class="modern-dialog">
  <form method="dialog">
    <h2>Account Settings</h2>
    <p>Manage your workspace preferences.</p>
    <button type="submit">Close</button>
  </form>
</dialog>

<!-- Invoking without JavaScript -->
<button commandfor="user-settings-modal" command="show-modal">Open Settings</button>
```

```css
/* Animated entry and exit with @starting-style */
.modern-dialog {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.25s ease-out, transform 0.25s ease-out, display 0.25s allow-discrete;
}

.modern-dialog[open] {
  opacity: 1;
  transform: scale(1);
}

@starting-style {
  .modern-dialog[open] {
    opacity: 0;
    transform: scale(0.95);
  }
}

.modern-dialog::backdrop {
  background: oklch(0 0 0 / 0.5);
  backdrop-filter: blur(8px);
}
```

### B. High-Performance Colors & Responsive Styling
```css
:root {
  /* OKLCH ensures uniform perceptual lightness across hue shifts */
  --brand-primary: oklch(0.65 0.24 265);
  --brand-surface: oklch(0.98 0.01 265);
  --brand-surface-subtle: color-mix(in oklch, var(--brand-primary) 12%, transparent);
}

/* Container Queries for truly modular component design */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 480px) {
  .card-layout {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
}
```

### C. Performance & Responsiveness (INP & Long Tasks)
```javascript
// Break up heavy processing without blocking main thread interactions
async function processLargeDataset(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    
    // Periodically yield control back to the browser for user input responsiveness
    if (i % 50 === 0 && 'scheduler' in window && 'yield' in window.scheduler) {
      await window.scheduler.yield();
    }
  }
}
```

---

## 4. Verification & Audit Checklist

Before declaring any frontend implementation complete:
1. **Semantic HTML**: Did you use native elements (`<dialog>`, `<details>`, `<nav>`, `<main>`) before reaching for custom JS containers?
2. **Reduced Motion**: Is all motion wrapped in `@media (prefers-reduced-motion: no-preference)`?
3. **Contrast & Color**: Are colors evaluated in OKLCH or checked for WCAG 2.1 AA (4.5:1 text, 3:1 UI boundaries)?
4. **Layout Shift**: Do all media/image tags have explicit `aspect-ratio` or `width`/`height` attributes?
5. **Top Layer**: Are modals rendered in the browser's top-layer rather than managing manual `z-index` wars?
