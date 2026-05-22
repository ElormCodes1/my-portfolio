---
title: Amazon Product Search API
paragraph: Product search results with price, reviews, seller, and availability — Amazon catalog data as JSON for monitoring and research.
category: APIs
relatedApi: amazon-search
icon: "🛍️"
tags: ["api", "amazon", "e-commerce", "price-monitoring"]
publishDate: "2026-05-16"
---

Amazon’s UI is built for humans, not warehouses. This API turns keyword search into rows you can diff nightly: ASIN, title, price, rating histograms, seller, and stock signals.

## What you get

Product detail objects from search pages — enough for price trackers, affiliate research, or assortment studies without running your own captcha farm.

## Example request

```bash
curl "https://data-apis.elormdokosi.com/amazon-search/search?query=wireless%20headphones&limit=5"
```

Increase `limit` carefully; throttle client-side to stay inside fair use.

## When to use it

- **Price monitoring** — alert when a SKU undercuts your MAP.
- **Product research** — compare review velocity for launch candidates.
- **Inventory tracking** — watch third-party seller churn on a listing.

## Playground

Try it in the [Lab playground](/lab#playground). Reference: [/apis/amazon-search](/apis/amazon-search).
