---
name: firecrawl
description: >-
  Live web scraping, deep crawling, and documentation sourcing for AI coding agents. Triggers when searching for external library documentation, extracting structured content from websites, crawling multi-page docs, downloading clean LLM-ready markdown, or gathering up-to-date web intelligence.
allowed-tools:
  - Bash(firecrawl *)
  - Bash(npx firecrawl-cli *)
---

# Firecrawl Web Intelligence & Documentation Sourcing

Allows agents to access live web content, scrape complex JavaScript-rendered single-page applications, map and crawl full documentation sets, and retrieve clean, noise-free Markdown optimized for LLM context windows.

---

## 1. Core Primitives & Capabilities

| Primitive | Action | Best For | Typical Invocation |
| :--- | :--- | :--- | :--- |
| **`search`** | Semantic web query | Finding relevant documentation or articles when the URL is unknown. | `firecrawl search "<query>"` |
| **`scrape`** | Extract single URL | Converting any web page or SPA into clean markdown. | `firecrawl scrape https://example.com/docs` |
| **`map`** | Discover site URLs | Mapping the sitemap or sub-pages of a documentation portal. | `firecrawl map https://example.com/docs` |
| **`crawl`** | Bulk extract directory | Extracting an entire library's docs subtree into local markdown files. | `firecrawl crawl https://example.com/docs --limit 20` |
| **`developer`** | Dev index lookup | Searching GitHub issues, merged PRs, release notes, and library repos. | `firecrawl developer "<query>"` |

---

## 2. Escalation Workflow for Agents

When researching technical documentation or external web resources:

1. **Direct Scrape**: If a specific documentation URL is known, scrape it directly to retrieve clean markdown without HTML boilerplates.
2. **Search to Scrape**: If only a topic or library name is known, run `search` to locate top-ranked URLs, then `scrape` the targeted pages.
3. **Map + Targeted Extraction**: For comprehensive documentation sets, run `map` with a search filter to identify the relevant sub-paths, avoiding indiscriminate whole-site crawling.
4. **Token Preservation**: Truncate or extract only relevant subheadings or code blocks to keep agent context lean.

---

## 3. Configuration & Authentication

### Environment Setup
Firecrawl supports both keyless free tier usage and API-key-authenticated access:
```bash
# Set your API key in environment or .env file
export FIRECRAWL_API_KEY="fc-YOUR_API_KEY"

# Or on Windows PowerShell:
$env:FIRECRAWL_API_KEY="fc-YOUR_API_KEY"
```

### Direct CLI Execution
```bash
# Using npx directly
npx -y firecrawl-cli@latest scrape https://docs.example.com --only-main-content

# Inspect authentication and remaining credit status
npx -y firecrawl-cli@latest --status
```

### SDK Integration in Web Apps
```typescript
import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

// Scrape URL to clean markdown
const scrapeResponse = await app.scrapeUrl('https://docs.example.com', {
  formats: ['markdown'],
  onlyMainContent: true
});

if (scrapeResponse.success) {
  console.log(scrapeResponse.markdown);
}
```

---

## 4. Fallback Strategy

If external network access, DNS resolution, or API quotas prevent live execution:
- Rely on offline workspace references located in `.agent/skills/*/references/`.
- Use the IDE's built-in web search and URL content fetching tools (`search_web`, `read_url_content`).
