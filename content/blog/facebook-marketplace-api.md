---
title: Facebook Marketplace Search API
paragraph: Search Marketplace listings by query and location — prices, sellers, and images as JSON for local market intel.
category: APIs
relatedApi: facebook-marketplace
icon: "🛒"
tags: ["api", "marketplace", "e-commerce", "data-acquisition"]
publishDate: "2026-05-13"
---

Marketplace is where local inventory shows up before it hits national aggregators. This API wraps search so you can monitor categories (electronics, vehicles, furniture) without brittle DOM scrapers.

## What you get

Listing title, price, location context, seller hints, and image URLs suitable for deduplication and price history tables.

## Example request

```bash
curl "https://data-apis.elormdokosi.com/facebook-marketplace/search?query=laptop&limit=5"
```

Location-aware variants (city name or IP-based geo) are documented on the [Marketplace API reference](/apis/facebook-marketplace).

## When to use it

- **Price monitoring** — watch median ask for a SKU in a metro.
- **Product discovery** — find arbitrage or supply gaps.
- **Local market insights** — compare regions for the same query.

## Playground

Run live searches from [/lab#playground](/lab#playground). Need a private feed or compliance review for your use case? [Contact](/contact).
