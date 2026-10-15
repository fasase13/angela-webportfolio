---
name: vercel-react-best-practices
description: >-
  Vercel Engineering's 70+ performance rules and architectural guidelines for React and Next.js (App Router, Server Components, Server Actions). Triggers on React component authoring, Next.js page development, data fetching, bundle optimization, and hydration performance.
---

# Vercel React & Next.js Best Practices

Official performance and architectural guidelines maintained by Vercel Engineering. Organizes 70+ rules across 8 priority tiers to eliminate network waterfalls, optimize bundle footprints, and maximize server-side performance.

---

## 1. Rule Categories by Priority

| Priority | Category | Impact | Focus Area |
| :---: | :--- | :---: | :--- |
| **1** | **Eliminating Waterfalls** | **CRITICAL** | Parallel data fetching, deferring `await`, streaming with Suspense |
| **2** | **Bundle Size Optimization** | **CRITICAL** | Direct imports, dynamic imports, deferring non-critical 3rd-party scripts |
| **3** | **Server-Side Performance** | **HIGH** | `React.cache()` deduplication, server action authentication, prop hoisting |
| **4** | **Client Data Fetching** | **MEDIUM-HIGH** | SWR / React Query caching, deduplication, optimistic mutation UI |
| **5** | **Re-render Optimization** | **MEDIUM** | Primitive prop passing, localized state, context splitting |
| **6** | **Rendering Performance** | **MEDIUM** | Virtualization for large lists, CSS containment, content-visibility |
| **7** | **JavaScript Micro-Optimizations** | **LOW-MEDIUM** | Map/Set lookups, loop efficiency, avoiding regex recalculation |
| **8** | **Advanced Architecture** | **LOW** | Module federations, edge runtime routing, partial prerendering |

---

## 2. Critical Rule Directives

### Priority 1: Eliminating Waterfalls (CRITICAL)
- **`async-parallel`**: Execute independent asynchronous operations simultaneously with `Promise.all()`.
  ```typescript
  // AVOID (Sequential waterfall):
  const user = await getUser(id);
  const posts = await getPosts(id);

  // PREFER (Concurrent fetch):
  const [user, posts] = await Promise.all([getUser(id), getPosts(id)]);
  ```
- **`async-defer-await`**: Never await high-latency promises at the top level of a component if only needed in a branch or modal.
- **`async-suspense-boundaries`**: Stream slow-loading UI blocks using `<Suspense fallback={<Skeleton />}>` rather than blocking the entire route page.

### Priority 2: Bundle Size Optimization (CRITICAL)
- **`bundle-barrel-imports`**: Avoid barrel file imports (e.g. `import { Button } from '@/components'`). Import directly from source (`import { Button } from '@/components/Button'`) to enable aggressive tree-shaking.
- **`bundle-dynamic-imports`**: Lazy-load heavy dependencies (monaco editor, charts, rich text editors) using `next/dynamic` or `React.lazy()`.
- **`bundle-defer-third-party`**: Load analytics, tracking scripts, and chat widgets only after hydration using `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`.

### Priority 3: Server-Side Performance & React Server Components (HIGH)
- **`server-cache-react`**: Wrap per-request data fetchers with `React.cache()` to automatically deduplicate redundant queries across different components in the same render pass.
- **`server-auth-actions`**: Always verify user authentication and authorization inside Server Actions; never rely solely on UI state.
- **`server-hoist-static-io`**: Hoist static I/O reads (reading config files, SVG definitions, fixed headers) outside the request handler function to module scope.

---

## 3. Production Next.js App Router Verification

When building Next.js applications:
1. Is the component tree split into Server Components by default, pushing `'use client'` to the leaf nodes?
2. Are server action mutations calling `revalidatePath()` or `revalidateTag()` appropriately?
3. Are dynamic route metadata calls (`generateMetadata`) sharing cached queries with page components?
4. Are images utilizing `next/image` with explicit aspect ratios and priority for LCP candidates?
