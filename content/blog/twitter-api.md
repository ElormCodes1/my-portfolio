---
title: Twitter Data Scraper API
paragraph: Profiles, list members, and engagement-oriented fields from X/Twitter — JSON for audience research and social listening pipelines.
category: APIs
relatedApi: twitter
icon: "🐦"
tags: ["api", "twitter", "social-media", "data-acquisition"]
publishDate: "2026-05-14"
---

Official APIs shifted; research workflows still need stable profile and list exports. This service focuses on user and list-member extraction you can pipe into graph tools or CRM enrichment.

## What you get

Profile metadata, follower-facing fields, list membership rolls, and hooks for tweet-level pulls depending on route — check the reference for the current surface area.

## Example request

```bash
curl "https://data-apis.elormdokosi.com/twitter/user?username=openai"
```

List routes accept list IDs or slugs as documented on [/apis/twitter](/apis/twitter).

## When to use it

- **Influencer research** — build cohorts from curated lists.
- **Audience insights** — export followers of a brand account for analysis (respect platform ToS in production).
- **Competitor monitoring** — snapshot bios and counts on a schedule.

## Playground

Use the [Lab playground](/lab#playground) with your key. Heavy or custom social graphs belong in a [contact](/contact) conversation — rate limits and compliance vary by client.
