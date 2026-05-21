export type ApiProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  endpoint: string;
  features: string[];
  useCases: string[];
  pricing: string;
  status: string;
  exampleUrl: string;
};

export const apiProducts: ApiProduct[] = [
  {
    id: "google-maps",
    name: "Google Maps Business Scraper",
    description:
      "Extract business information, contact details, reviews, and location data from Google Maps",
    category: "Business & Location",
    icon: "🏢",
    endpoint: "https://data-apis.elormdokosi.com/gmaps",
    features: [
      "Business contact information",
      "Reviews and ratings",
      "Location coordinates",
      "Operating hours",
      "Website links",
      "Photos and images",
    ],
    useCases: [
      "Lead generation",
      "Competitor analysis",
      "Market research",
      "Local business directory",
      "Review monitoring",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/gmaps/search?query=restaurants%20in%20Austin&max_results=5",
  },
  {
    id: "producthunt",
    name: "ProductHunt Rankings API",
    description:
      "Access daily, weekly, monthly, and yearly product rankings from ProductHunt",
    category: "Social Media",
    icon: "🚀",
    endpoint: "https://data-apis.elormdokosi.com/producthunt",
    features: [
      "Daily/Weekly/Monthly/Yearly rankings",
      "Product categories (240+ categories)",
      "Today's launches",
      "Upcoming launches",
      "Cached data for fast access",
      "Category-specific products",
    ],
    useCases: [
      "Product discovery",
      "Trend analysis",
      "Competitor tracking",
      "Market research",
      "Startup monitoring",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl: "https://data-apis.elormdokosi.com/producthunt/categories",
  },
  {
    id: "chrome-webstore",
    name: "Chrome Web Store Extensions",
    description:
      "Scrape Chrome extension data including details, ratings, and metadata",
    category: "E-commerce",
    icon: "🔧",
    endpoint: "https://data-apis.elormdokosi.com/chrome-webstore",
    features: [
      "Extension details and metadata",
      "User ratings and reviews",
      "Category filtering (18 categories)",
      "Download counts",
      "Developer information",
      "Pricing data",
    ],
    useCases: [
      "Extension market analysis",
      "Competitor research",
      "Trend identification",
      "Developer insights",
      "Product discovery",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/chrome-webstore/extensions?category=productivity&limit=5",
  },
  {
    id: "facebook-marketplace",
    name: "Facebook Marketplace Search",
    description:
      "Search and extract listings from Facebook Marketplace by location or IP",
    category: "E-commerce",
    icon: "🛒",
    endpoint: "https://data-apis.elormdokosi.com/facebook-marketplace",
    features: [
      "Location-based search",
      "IP geolocation support",
      "Product listings",
      "Pricing information",
      "Seller details",
      "Image extraction",
    ],
    useCases: [
      "Market research",
      "Price monitoring",
      "Product discovery",
      "Competitor analysis",
      "Local market insights",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/facebook-marketplace/search?query=laptop&limit=5",
  },
  {
    id: "twitter",
    name: "Twitter Data Scraper",
    description:
      "Extract user data, list members, and social media insights from Twitter",
    category: "Social Media",
    icon: "🐦",
    endpoint: "https://data-apis.elormdokosi.com/twitter",
    features: [
      "User profile data",
      "List member extraction",
      "Follower analysis",
      "Tweet data",
      "Engagement metrics",
      "Social connections",
    ],
    useCases: [
      "Social media analysis",
      "Influencer research",
      "Audience insights",
      "Competitor monitoring",
      "Lead generation",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl: "https://data-apis.elormdokosi.com/twitter/user?username=openai",
  },
  {
    id: "zillow",
    name: "Zillow Real Estate API",
    description:
      "Access real estate data including sales, rentals, and sold properties",
    category: "Real Estate",
    icon: "🏠",
    endpoint: "https://data-apis.elormdokosi.com/zillow",
    features: [
      "Property sales data",
      "Rental listings",
      "Sold properties",
      "Price history",
      "Property details",
      "Location data",
    ],
    useCases: [
      "Real estate analysis",
      "Market trends",
      "Investment research",
      "Property valuation",
      "Market comparison",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/zillow/search?location=Austin%2C%20TX&limit=5",
  },
  {
    id: "amazon-search",
    name: "Amazon Product Search",
    description:
      "Extract product data, prices, reviews, and seller information from Amazon",
    category: "E-commerce",
    icon: "🛍️",
    endpoint: "https://data-apis.elormdokosi.com/amazon-search",
    features: [
      "Product details",
      "Pricing information",
      "Customer reviews",
      "Seller data",
      "Availability status",
      "Product images",
    ],
    useCases: [
      "Price monitoring",
      "Product research",
      "Competitor analysis",
      "Market trends",
      "Inventory tracking",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/amazon-search/search?query=wireless%20headphones&limit=5",
  },
  {
    id: "youtube",
    name: "YouTube Transcript Extractor",
    description:
      "Extract transcripts and captions from YouTube videos in multiple languages",
    category: "Media",
    icon: "🎥",
    endpoint: "https://data-apis.elormdokosi.com/youtube",
    features: [
      "Video transcripts",
      "Multi-language support",
      "Timestamp data",
      "Speaker identification",
      "Text processing",
      "Download options",
    ],
    useCases: [
      "Content analysis",
      "SEO research",
      "Educational content",
      "Accessibility",
      "Content repurposing",
    ],
    pricing: "Free tier available",
    status: "Active",
    exampleUrl:
      "https://data-apis.elormdokosi.com/youtube/transcript?video_id=dQw4w9WgXcQ",
  },
];

export const apiCategories = [
  { name: "Business & Location", count: 1 },
  { name: "Social Media", count: 2 },
  { name: "E-commerce", count: 3 },
  { name: "Real Estate", count: 1 },
  { name: "Media", count: 1 },
] as const;

export function getApiById(id: string): ApiProduct | undefined {
  return apiProducts.find((api) => api.id === id);
}
