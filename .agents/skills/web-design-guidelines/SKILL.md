---
name: web-design-guidelines
description: >-
  Vercel's comprehensive 100+ production UI/UX audit rules covering accessibility, responsive layouts, focus management, forms, typography, and dark mode. Triggers when building UI components, reviewing visual design, checking WCAG compliance, or polishing user interactions.
---

# Web Design & Interface Guidelines (Vercel)

Audits and structures web interfaces for compliance with over 100 battle-tested production rules covering accessibility, ergonomics, performance, and visual polish.

---

## 1. Core Rule Domains

| Domain | Key Requirement | Anti-Pattern (AVOID) |
| :--- | :--- | :--- |
| **Accessibility (a11y)** | WCAG 2.1 AA contrast (4.5:1 text, 3:1 graphical elements). Semantic landmark elements (`<nav>`, `<main>`, `<aside>`). | Icon-only buttons without `aria-label` or visually-hidden text. |
| **Focus Management** | Visible, un-obscured focus states with `:focus-visible`. Keyboard navigation for all interactable elements. | Removing outlines (`outline: none`) without an accessible replacement. |
| **Forms & Input** | Visible labels associated via `htmlFor`/`id`. Explicit `autocomplete` attributes. In-place validation errors. | Relying on `placeholder` text as the only form field label. |
| **Layout & CLS** | Fixed aspect-ratio containers for images and embeds to prevent layout shifts (CLS < 0.1). | Unsized images causing content to jump as assets load. |
| **Typography** | Base font >= 16px to prevent iOS auto-zoom on input focus. Line height 1.4-1.6 for readability. | Gray text with low contrast (< 4.5:1) on white/dark backgrounds. |
| **Theming & Color** | Declare `color-scheme: light dark`. Support `prefers-color-scheme` smoothly without flash of unstyled theme (FOUT). | Hardcoding hex colors directly inside component layout styles. |
| **Motion** | Always wrap animations with `@media (prefers-reduced-motion: no-preference)`. | Autoplay animations that cannot be paused by the user. |

---

## 2. Accessible Component Patterns

### Icon-Only Buttons
```html
<!-- Correct accessible pattern -->
<button type="button" class="btn-icon" aria-label="Close settings dialog">
  <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>
</button>
```

### Form Input with Accessible Error State
```html
<div class="form-group">
  <label for="user-email">Email Address</label>
  <input 
    type="email" 
    id="user-email" 
    name="email" 
    autocomplete="email" 
    aria-invalid="true" 
    aria-describedby="email-error-msg"
    required
  />
  <span id="email-error-msg" class="field-error" role="alert">
    Please enter a valid email address.
  </span>
</div>
```

---

## 3. UI Pre-Flight Checklist

Before handing off any UI component:
- [ ] Can every button, link, and input be operated entirely with the `Tab`, `Enter`, `Space`, and arrow keys?
- [ ] Does tabbing through the page show a sharp, high-contrast focus ring?
- [ ] Is zoom disabled in the viewport meta tag? *(It must NEVER be disabled: avoid `user-scalable=no`)*.
- [ ] Does dark mode adapt contrast properly without pure stark black/white blinding contrasts?
- [ ] Are tap targets at least 44x44px for touch interfaces?
