import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const APITester = dynamic(() => import("@/components/lab/APITester"), {
  loading: () => (
    <div className="card-lab p-6 font-mono text-sm text-steel">
      Loading API tester…
    </div>
  ),
  ssr: false,
});
import JsonLd from "@/components/seo/JsonLd";
import { getApiById } from "@/lib/apis-data";
import { apiServiceSchema, breadcrumbSchema, SITE_URL } from "@/lib/structured-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const apiDetails = {
  "google-maps": {
    name: "Google Maps Business Scraper",
    description: "Extract comprehensive business information, contact details, reviews, and location data from Google Maps",
    category: "Business & Location",
    icon: "🏢",
    endpoint: "https://data-apis.elormdokosi.com/gmaps",
    features: [
      "Business contact information (phone, email, website)",
      "Customer reviews and ratings",
      "Location coordinates (latitude, longitude)",
      "Operating hours and availability",
      "Business photos and images",
      "Address and location details",
      "Business categories and tags",
      "Price range indicators"
    ],
    useCases: [
      "Lead generation for sales teams",
      "Competitor analysis and market research",
      "Local business directory creation",
      "Review monitoring and sentiment analysis",
      "Location-based marketing campaigns",
      "Business intelligence and analytics"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/gmaps",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/gmaps/search?query=restaurants%20in%20Austin&max_results=50"`,
    exampleResponse: {
      "task_id": "uuid-string",
      "status": "running",
      "message": "Search initiated successfully"
    },
    seoKeywords: [
      "Google Maps API",
      "business data extraction",
      "local business scraping",
      "contact information API",
      "business directory API",
      "location data API",
      "reviews API",
      "lead generation API"
    ]
  },
  "producthunt": {
    name: "ProductHunt Rankings API",
    description: "Access comprehensive product rankings, launches, and category data from ProductHunt with 240+ categories",
    category: "Social Media",
    icon: "🚀",
    endpoint: "https://data-apis.elormdokosi.com/producthunt",
    features: [
      "Daily, weekly, monthly, and yearly rankings",
      "240+ product categories with full metadata",
      "Today's launches and upcoming launches",
      "Cached data for lightning-fast access",
      "Category-specific product filtering",
      "Product details and descriptions",
      "Vote counts and engagement metrics",
      "Developer and maker information"
    ],
    useCases: [
      "Product discovery and trend analysis",
      "Competitor tracking and monitoring",
      "Startup ecosystem research",
      "Market trend identification",
      "Investment opportunity analysis",
      "Product launch strategy planning"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/producthunt",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/producthunt/categories"`,
    exampleResponse: {
      "status": "completed",
      "total_categories": 240,
      "categories": [
        {
          "name": "Productivity",
          "slug": "productivity",
          "id": "34"
        }
      ]
    },
    seoKeywords: [
      "ProductHunt API",
      "product rankings API",
      "startup data API",
      "product discovery API",
      "tech trends API",
      "launch data API",
      "product categories API",
      "startup ecosystem API"
    ]
  },
  "chrome-webstore": {
    name: "Chrome Web Store Extensions",
    description: "Scrape comprehensive Chrome extension data including details, ratings, metadata, and developer information",
    category: "E-commerce",
    icon: "🔧",
    endpoint: "https://data-apis.elormdokosi.com/chrome-webstore",
    features: [
      "Extension details and comprehensive metadata",
      "User ratings, reviews, and feedback",
      "18 category filtering options",
      "Download counts and popularity metrics",
      "Developer information and contact details",
      "Pricing data and monetization info",
      "Extension descriptions and features",
      "Update history and version tracking"
    ],
    useCases: [
      "Extension market analysis and research",
      "Competitor analysis and benchmarking",
      "Trend identification in browser extensions",
      "Developer insights and market opportunities",
      "Product discovery and feature analysis",
      "Market size and growth analysis"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/chrome-webstore",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/chrome-webstore/categories"`,
    exampleResponse: {
      "available_categories": {
        "productivity_developer": {
          "name": "Developer",
          "string": "productivity_developer"
        }
      },
      "total_categories": 18
    },
    seoKeywords: [
      "Chrome Web Store API",
      "browser extension API",
      "extension data scraping",
      "Chrome extension API",
      "browser plugin API",
      "extension market API",
      "developer tools API",
      "browser extension analytics"
    ]
  },
  "facebook-marketplace": {
    name: "Facebook Marketplace Search",
    description: "Search and extract comprehensive listings from Facebook Marketplace with location-based or IP geolocation support",
    category: "E-commerce",
    icon: "🛒",
    endpoint: "https://data-apis.elormdokosi.com/facebook-marketplace",
    features: [
      "Location-based search with city/country support",
      "IP geolocation for automatic location detection",
      "Product listings with detailed information",
      "Pricing information and currency support",
      "Seller details and contact information",
      "High-quality image extraction",
      "Category filtering and search optimization",
      "Real-time availability status"
    ],
    useCases: [
      "Market research and price monitoring",
      "Product discovery and trend analysis",
      "Competitor analysis and benchmarking",
      "Local market insights and opportunities",
      "Inventory tracking and management",
      "Consumer behavior analysis"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/facebook-marketplace",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/facebook-marketplace/search?query=bicycle&city=Berlin&count=24"`,
    exampleResponse: {
      "success": true,
      "results": [
        {
          "title": "Mountain Bike",
          "price": "$299",
          "location": "Berlin, Germany"
        }
      ]
    },
    seoKeywords: [
      "Facebook Marketplace API",
      "marketplace data API",
      "classified ads API",
      "product listings API",
      "marketplace scraping",
      "e-commerce data API",
      "local marketplace API",
      "buy and sell API"
    ]
  },
  "twitter": {
    name: "Twitter Data Scraper",
    description: "Extract comprehensive user data, list members, and social media insights from Twitter",
    category: "Social Media",
    icon: "🐦",
    endpoint: "https://data-apis.elormdokosi.com/twitter",
    features: [
      "User profile data and metadata",
      "List member extraction and analysis",
      "Follower and following analysis",
      "Tweet data and engagement metrics",
      "Social connections and networks",
      "Account verification status",
      "Bio and description information",
      "Activity and posting patterns"
    ],
    useCases: [
      "Social media analysis and monitoring",
      "Influencer research and identification",
      "Audience insights and demographics",
      "Competitor monitoring and analysis",
      "Lead generation and prospecting",
      "Social listening and sentiment analysis"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/twitter",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/twitter/scrape?list_url=https://twitter.com/i/lists/123456&max_members=100"`,
    exampleResponse: {
      "task_id": "uuid-string",
      "status": "running",
      "message": "Twitter scraping initiated"
    },
    seoKeywords: [
      "Twitter API",
      "social media scraping",
      "Twitter data extraction",
      "social media API",
      "Twitter list API",
      "social media analytics",
      "influencer data API",
      "social media monitoring"
    ]
  },
  "zillow": {
    name: "Zillow Real Estate API",
    description: "Access comprehensive real estate data including sales, rentals, and sold properties with detailed market information",
    category: "Real Estate",
    icon: "🏠",
    endpoint: "https://data-apis.elormdokosi.com/zillow",
    features: [
      "Property sales data and listings",
      "Rental listings and pricing",
      "Sold properties and transaction history",
      "Price history and market trends",
      "Detailed property information",
      "Location and neighborhood data",
      "Property photos and virtual tours",
      "Market statistics and analytics"
    ],
    useCases: [
      "Real estate market analysis",
      "Property investment research",
      "Market trend identification",
      "Property valuation and appraisal",
      "Competitive market analysis",
      "Investment opportunity assessment"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/zillow",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/zillow/sales?location=Austin%20TX&max_price=500000&max_pages=5"`,
    exampleResponse: {
      "task_id": "uuid-string",
      "status": "running",
      "message": "Real estate search initiated"
    },
    seoKeywords: [
      "Zillow API",
      "real estate API",
      "property data API",
      "real estate scraping",
      "property listings API",
      "real estate analytics",
      "housing market API",
      "property investment API"
    ]
  },
  "amazon-search": {
    name: "Amazon Product Search",
    description: "Extract comprehensive product data, prices, reviews, and seller information from Amazon marketplace",
    category: "E-commerce",
    icon: "🛍️",
    endpoint: "https://data-apis.elormdokosi.com/amazon-search",
    features: [
      "Detailed product information",
      "Pricing data and price history",
      "Customer reviews and ratings",
      "Seller data and performance metrics",
      "Availability status and inventory",
      "Product images and media",
      "Category and classification data",
      "Shipping and delivery information"
    ],
    useCases: [
      "Price monitoring and tracking",
      "Product research and analysis",
      "Competitor analysis and benchmarking",
      "Market trend identification",
      "Inventory tracking and management",
      "Consumer behavior analysis"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/amazon-search",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/amazon-search/search?search_term=laptop&max_products=20"`,
    exampleResponse: {
      "task_id": "uuid-string",
      "status": "running",
      "message": "Amazon search initiated"
    },
    seoKeywords: [
      "Amazon API",
      "product data API",
      "e-commerce scraping",
      "Amazon product API",
      "price monitoring API",
      "product research API",
      "marketplace data API",
      "e-commerce analytics"
    ]
  },
  "youtube": {
    name: "YouTube Transcript Extractor",
    description: "Extract transcripts and captions from YouTube videos with multi-language support and advanced processing",
    category: "Media",
    icon: "🎥",
    endpoint: "https://data-apis.elormdokosi.com/youtube",
    features: [
      "Video transcripts and captions",
      "Multi-language support (100+ languages)",
      "Timestamp data and synchronization",
      "Speaker identification and segmentation",
      "Text processing and formatting",
      "Download options (TXT, JSON, SRT)",
      "Quality and accuracy metrics",
      "Automatic language detection"
    ],
    useCases: [
      "Content analysis and research",
      "SEO research and optimization",
      "Educational content processing",
      "Accessibility and inclusion",
      "Content repurposing and creation",
      "Language learning and analysis"
    ],
    pricing: "Free tier available",
    status: "Active",
    documentation: "https://data-apis.elormdokosi.com/docs#/youtube",
    exampleRequest: `curl -X GET "https://data-apis.elormdokosi.com/youtube/transcript?video_url=https://www.youtube.com/watch?v=VIDEO_ID&language=en"`,
    exampleResponse: {
      "task_id": "uuid-string",
      "status": "running",
      "message": "Transcript extraction initiated"
    },
    seoKeywords: [
      "YouTube API",
      "transcript extraction API",
      "video caption API",
      "YouTube transcript API",
      "video content API",
      "subtitle extraction API",
      "video analysis API",
      "content processing API"
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const api = apiDetails[params.slug as keyof typeof apiDetails];
  
  if (!api) {
    return {
      title: "API Not Found",
      description: "The requested API page could not be found."
    };
  }

  return {
    title: `${api.name} - Professional API Service | Elorm Dokosi`,
    description: api.description,
    keywords: api.seoKeywords,
    openGraph: {
      title: `${api.name} - Professional API Service`,
      description: api.description,
      type: "website",
      url: `https://elormdokosi.com/apis/${params.slug}`,
      images: [
        {
          url: `https://elormdokosi.com/images/apis/${params.slug}-preview.jpg`,
          width: 1200,
          height: 630,
          alt: `${api.name} - API Service`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${api.name} - Professional API Service`,
      description: api.description,
      images: [`https://elormdokosi.com/images/apis/${params.slug}-preview.jpg`]
    },
    alternates: {
      canonical: `https://elormdokosi.com/apis/${params.slug}`
    }
  };
}

export default function APIDetailPage({ params }: { params: { slug: string } }) {
  const api = apiDetails[params.slug as keyof typeof apiDetails];
  
  if (!api) {
    notFound();
  }

  const catalogApi = getApiById(params.slug);

  return (
    <>
      <JsonLd
        data={[
          apiServiceSchema(
            catalogApi ?? {
              id: params.slug,
              name: api.name,
              description: api.description,
              category: api.category,
              icon: api.icon,
              endpoint: api.endpoint,
              features: api.features,
              useCases: api.useCases,
              pricing: api.pricing,
              status: api.status,
              exampleUrl: api.endpoint,
            },
          ),
          breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Lab", url: `${SITE_URL}/lab` },
            { name: api.name, url: `${SITE_URL}/apis/${params.slug}` },
          ]),
        ]}
      />
      <section className="pt-24 pb-20 md:pt-28">
        <div className="container">
          <Link
            href="/lab#apis"
            className="label-mono mb-6 inline-block text-radar hover:text-frost"
          >
            ← Back to Lab
          </Link>
          <div className="card-lab mb-12 p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <div className="text-5xl mr-4">{api.icon}</div>
                <div>
                  <h1 className="heading-display mb-2 text-3xl md:text-4xl">
                    {api.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="rounded border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-steel">
                      {api.category}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-xs text-signal">
                      <span className="h-2 w-2 rounded-full bg-signal" />
                      {api.status}
                    </span>
                    <span className="font-mono text-xs text-radar">{api.pricing}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="mb-6 text-lg text-steel">{api.description}</p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={api.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View documentation
              </a>
              <Link
                href={`/lab?tab=playground&api=${params.slug}`}
                className="btn-ghost"
              >
                Open playground
              </Link>
              <Link href="/contact" className="btn-ghost">
                Get support
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Features Section */}
              <div className="card-lab p-6">
                <h2 className="heading-display mb-4 text-2xl">Key features</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {api.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-steel">
                      <span className="text-radar">▸</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-lab p-6">
                <h2 className="heading-display mb-4 text-2xl">Use cases</h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {api.useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className="rounded-md border border-[var(--color-border)] bg-ink-muted p-3 text-sm text-steel"
                    >
                      {useCase}
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-lab p-6">
                <h2 className="heading-display mb-4 text-2xl">API example</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="label-mono mb-2">Request</h3>
                    <pre className="overflow-x-auto rounded-md bg-ink-muted p-4 font-mono text-xs text-frost/90">
                      <code>{api.exampleRequest}</code>
                    </pre>
                  </div>
                  <div>
                    <h3 className="label-mono mb-2">Response</h3>
                    <pre className="overflow-x-auto rounded-md bg-ink-muted p-4 font-mono text-xs text-frost/90">
                      <code>{JSON.stringify(api.exampleResponse, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {catalogApi && (
                <APITester
                  apiName={api.name}
                  endpoint={api.endpoint}
                  exampleRequest={catalogApi.exampleUrl}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="card-lab p-6">
                <h3 className="heading-display mb-4 text-lg">Quick info</h3>
                <div className="space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-xs uppercase text-steel">Endpoint</span>
                    <p className="mt-1 break-all text-frost">{api.endpoint}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-steel">Category</span>
                    <p className="mt-1 text-frost">{api.category}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-steel">Status</span>
                    <p className="mt-1 text-signal">{api.status}</p>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-steel">Pricing</span>
                    <p className="mt-1 text-radar">{api.pricing}</p>
                  </div>
                </div>
              </div>

              <div className="card-lab p-6">
                <h3 className="heading-display mb-4 text-lg">Related APIs</h3>
                <div className="space-y-3">
                  {Object.entries(apiDetails)
                    .filter(([key]) => key !== params.slug)
                    .slice(0, 3)
                    .map(([key, relatedApi]) => (
                      <Link
                        key={key}
                        href={`/apis/${key}`}
                        className="block rounded-md border border-[var(--color-border)] p-3 transition-colors hover:border-radar/40"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{relatedApi.icon}</span>
                          <div>
                            <p className="font-medium text-frost">{relatedApi.name}</p>
                            <p className="text-xs text-steel">{relatedApi.category}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(apiDetails).map((slug) => ({
    slug,
  }));
}

