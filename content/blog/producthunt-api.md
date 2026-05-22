---
title: ProductHunt Rankings API
paragraph: Daily, weekly, and category-ranked launches from Product Hunt — cached JSON for trend watches and competitive product intel.
category: APIs
relatedApi: producthunt
icon: "🚀"
tags: ["api", "producthunt", "startups", "data-acquisition"]
publishDate: "2026-05-11"
---

Product Hunt moves fast. If you are tracking what ships in your category, polling HTML pages breaks within a week. This API exposes rankings and category slices as stable HTTP resources.

## What you get

Endpoints cover daily/weekly/monthly/yearly leaderboards, 240+ categories, today’s launches, and upcoming products. Responses are cached server-side so repeat reads stay fast for dashboards.

## Example request

```bash
curl "https://data-apis.elormdokosi.com/producthunt/categories"
```

For a specific slice, hit category or ranking routes documented on the [ProductHunt API page](/apis/producthunt).

## When to use it

- **Product discovery** — alert when a competitor launches in your tag.
- **Trend analysis** — compare weekly winners across categories.
- **Startup monitoring** — feed a newsletter or internal Slack digest.

## Playground

Open [Lab → playground](/lab#playground), pick ProductHunt, and paste your API key. Full parameter list lives on [/apis/producthunt](/apis/producthunt).
