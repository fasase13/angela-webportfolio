---
name: ui-ux-pro-max
description: >-
  Professional UI/UX and motion design intelligence for web applications. Triggers when designing interfaces, establishing design systems, selecting color palettes, pairing typography, crafting responsive layouts, or implementing micro-animations (GSAP, CSS springs, Bento grids, Glassmorphism, Dark Neo-grotesque).
---

# UI/UX Pro Max - Antigravity UI & Motion Design Expert

Provides professional visual design intelligence, aesthetic archetypes, motion physics, and typography pairings to elevate web interfaces from basic MVPs to state-of-the-art, premium experiences.

---

## 1. Visual Archetypes & Aesthetic Directions

When designing or styling an application, select an intentional aesthetic archetype rather than defaulting to generic Bootstrap or plain unstyled boxes:

| Archetype | Characteristics | Ideal Product Fit | Key CSS Traits |
| :--- | :--- | :--- | :--- |
| **SaaS Precision / Modern Linear** | Ultra-clean dark mode, subtle borders, high information density, micro-radii (6-8px). | Developer tools, analytics dashboards, B2B platforms. | `border: 1px solid oklch(1 0 0 / 0.1)`, dark graphite background, mono accents. |
| **Glassmorphism / Spatial UI** | Translucent frosted surfaces, multi-layered depth, vibrant ambient backdrops, subtle specular highlights. | Consumer web apps, modern portfolios, AI interfaces. | `backdrop-filter: blur(16px)`, `background: oklch(1 0 0 / 0.05)`, subtle drop shadow. |
| **Bento Grid** | Modular asymmetrical grid cards, variable cell spans, cohesive card padding, interactive card hover glows. | Feature landing pages, product overviews, summaries. | `display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.5rem;` |
| **Neo-Grotesque Editorial** | Bold typographic hierarchy, sharp contrast, prominent rules, confident whitespace. | Media, design agencies, long-form content apps. | Large display headings, high-contrast serif/sans mix, minimal borders. |

---

## 2. Typography Pairing Matrix

Avoid browser default fonts. Pair a high-character display font with a clean, highly legible body font:

| Pairing Profile | Header / Display Font | Body & Interface Font | Monospace Accent |
| :--- | :--- | :--- | :--- |
| **Tech & Modern** | `Plus Jakarta Sans` or `Outfit` | `Inter` | `JetBrains Mono` |
| **Clean & Linear** | `Geist` | `Geist Sans` | `Geist Mono` |
| **SaaS Authority** | `Cabinet Grotesk` | `Satoshi` or `Inter` | `Fira Code` |
| **Editorial Polish** | `Newsreader` or `Fraunces` | `Inter` or `Source Sans Pro` | `IBM Plex Mono` |

---

## 3. Harmonic Color Systems & OKLCH

Never pick random, oversaturated colors. Structure tokens along perceptual color axes:

```css
:root {
  /* Neutral scale */
  --bg-canvas: oklch(0.12 0.02 260);
  --bg-surface: oklch(0.18 0.03 260);
  --bg-surface-elevated: oklch(0.24 0.04 260);
  --border-subtle: oklch(1 0 0 / 0.08);
  --border-hover: oklch(1 0 0 / 0.18);

  /* Text hierarchy */
  --text-primary: oklch(0.96 0.01 260);
  --text-secondary: oklch(0.72 0.02 260);
  --text-muted: oklch(0.52 0.02 260);

  /* Primary brand & accents */
  --accent-primary: oklch(0.68 0.22 250);
  --accent-hover: oklch(0.74 0.22 250);
  --accent-glow: color-mix(in oklch, var(--accent-primary) 20%, transparent);
}
```

---

## 4. Motion Physics & Micro-Interactions

### Spring and Timing Constants
- **Fast Micro-interaction (buttons, switches)**: `150ms - 200ms` with ease-out curve `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Card Expansion / Modal Entry**: `300ms - 400ms` with spring-like deceleration.
- **Continuous Ambient**: `8s - 12s` infinite soft float for glow orbs.

### Interactive Card Glow
```css
.bento-card {
  position: relative;
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease;
}

.bento-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-hover);
  box-shadow: 0 12px 32px -8px var(--accent-glow);
}
```

---

## 5. Non-Negotiable Polish Rules
1. **No generic raw colors**: Use tailored palette tokens.
2. **No unformatted data tables**: Always provide proper cell padding, subtle borders, and tabular numerals (`font-variant-numeric: tabular-nums`).
3. **No 0ms abrupt state changes**: Transitions must be smoothed with 150-250ms transitions.
4. **Always respect motion settings**: Wrap heavy motion in `@media (prefers-reduced-motion: no-preference)`.
