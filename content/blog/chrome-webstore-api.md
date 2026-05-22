---
title: Chrome Web Store Extensions API
paragraph: Extension metadata, ratings, installs, and developer fields from the Chrome Web Store — structured for market maps and competitive research.
category: APIs
relatedApi: chrome-webstore
icon: "🔧"
tags: ["api", "chrome", "extensions", "e-commerce"]
publishDate: "2026-05-12"
---

The extension economy is opaque until you can query it like a catalog. This API returns listing details across 18 categories so you can rank by installs, compare pricing models, or watch new entrants.

## What you get

Extension title, description snippets, ratings, user counts, developer info, pricing, and category tags — the fields you would otherwise scrape from store pages one URL at a time.

## Example request

```bash
curl "https://data-apis.elormdokosi.com/chrome-webstore/extensions?category=productivity&limit=5"
```

Swap `category` and `limit` to page through niches (ad blockers, dev tools, AI assistants, etc.).

## When to use it

- **Extension market analysis** — size a category before you build.
- **Competitor research** — track rating and install deltas for named rivals.
- **Developer insights** — see who publishes across multiple properties.

## Playground

Test calls in the [Lab playground](/lab#playground) or see [/apis/chrome-webstore](/apis/chrome-webstore) for all routes.
