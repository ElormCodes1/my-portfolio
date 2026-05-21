# 🚀 API Quick Reference Card

## Base URL
```
http://localhost:8000
```

## 🏢 Business & Location APIs

### Google Maps Business Scraper
```bash
# Start search
GET /gmaps/search?query=restaurants%20in%20Austin&max_results=50

# Check status
GET /gmaps/status/{task_id}

# Get results
GET /gmaps/results/{task_id}?page=1&page_size=20

# Download
GET /gmaps/download/{task_id}/csv
```

### Facebook Marketplace Search
```bash
# Search with location
GET /facebook-marketplace/search?query=motorcycle&city=Berlin&count=48

# Search with IP location
GET /facebook-marketplace/search?query=bicycle&count=24
```

## 🏠 Real Estate APIs

### Zillow Property Search
```bash
# Sales
GET /zillow/sales?location=Austin%20TX&max_price=500000&max_pages=5
GET /zillow/sales/simple?location=Phoenix%20AZ&max_price=400000&max_pages=2

# Rentals
GET /zillow/rentals?location=Seattle%20WA&max_price=3000&max_pages=3
GET /zillow/rentals/simple?location=Portland%20OR&max_price=2500&max_pages=2

# Sold Properties
GET /zillow/sold?location=Denver%20CO&max_price=600000&max_pages=5
GET /zillow/sold/simple?location=Miami%20FL&max_price=500000&max_pages=2

# Status & Results (all Zillow endpoints)
GET /zillow/status/{task_id}
GET /zillow/results/{task_id}?page=1&page_size=50
GET /zillow/download/{task_id}/csv
```

## 🛒 E-commerce APIs

### Amazon Product Search
```bash
GET /amazon-search/search?search_term=laptop&max_products=20
GET /amazon-search/status/{task_id}
GET /amazon-search/results/{task_id}
GET /amazon-search/download/{task_id}/csv
```

### Chrome Web Store Extensions
```bash
GET /chrome-webstore/scrape?max_extensions=50&categories=1,2,3
GET /chrome-webstore/categories
GET /chrome-webstore/status/{task_id}
GET /chrome-webstore/results/{task_id}
GET /chrome-webstore/download/{task_id}/csv
```

## 📱 Social Media APIs

### Twitter Data Scraper
```bash
GET /twitter/scrape?list_url=https://twitter.com/i/lists/123456&max_members=100
GET /twitter/status/{task_id}
GET /twitter/results/{task_id}
GET /twitter/download/{task_id}/csv
```

### ProductHunt Rankings
```bash
# Daily rankings
GET /producthunt/products/daily?year=2024&month=12&day=15&page=1&limit=50

# Weekly rankings
GET /producthunt/products/weekly?year=2024&week=50&page=1&limit=50

# Monthly rankings
GET /producthunt/products/monthly?year=2024&month=12&page=1&limit=50

# Yearly rankings
GET /producthunt/products/yearly?year=2024&page=1&limit=50

# Launches
GET /producthunt/launches/today
GET /producthunt/launches/upcoming

# Categories
GET /producthunt/categories
GET /producthunt/categories/{category_id}/products
```

## 🎥 Media APIs

### YouTube Transcript Extractor
```bash
GET /youtube/transcript?video_url=https://www.youtube.com/watch?v=VIDEO_ID&language=en
GET /youtube/status/{task_id}
GET /youtube/results/{task_id}
GET /youtube/download/{task_id}/txt
```

## 🔧 Common Endpoints

### Health Checks
```bash
GET /health                    # Main health check
GET /gmaps/health             # Google Maps health
GET /zillow/health            # Zillow health
GET /producthunt/health       # ProductHunt health
```

### API Information
```bash
GET /                         # Main API info
GET /gmaps/                   # Google Maps info
GET /chrome-webstore/         # Chrome Web Store info
GET /twitter/                 # Twitter info
GET /producthunt/             # ProductHunt info
GET /amazon-search/           # Amazon info
GET /youtube/                 # YouTube info
GET /facebook-marketplace/    # Facebook Marketplace info
GET /zillow/                  # Zillow info
```

## 📊 Status Response Format
```json
{
  "task_id": "uuid-string",
  "status": "running|completed|failed|pending",
  "progress": 45,
  "current_stage": "scraping",
  "current_operation": "Processing page 3 of 10",
  "pages_scraped": 2,
  "results_found": 85,
  "elapsed_time_seconds": 12.5,
  "estimated_remaining_seconds": 15.2,
  "message": "Scraping in progress..."
}
```

## 📄 Results Response Format
```json
{
  "success": true,
  "total_results": 500,
  "current_page": 1,
  "total_pages": 10,
  "page_size": 50,
  "results": [...],
  "pagination": {
    "has_next_page": true,
    "has_previous_page": false
  },
  "download_urls": {
    "json": "/api/download/{task_id}/json",
    "csv": "/api/download/{task_id}/csv"
  }
}
```

## 🚀 Quick Start Examples

### Python
```python
import requests
import time

# Start search
response = requests.get("http://localhost:8000/gmaps/search", params={
    "query": "coffee shops in Seattle",
    "max_results": 50
})
task_id = response.json()["task_id"]

# Monitor until complete
while True:
    status = requests.get(f"http://localhost:8000/gmaps/status/{task_id}").json()
    if status["status"] == "completed":
        break
    time.sleep(2)

# Get results
results = requests.get(f"http://localhost:8000/gmaps/results/{task_id}").json()
print(f"Found {results['total_results']} businesses")
```

### JavaScript
```javascript
async function searchAPI(endpoint, params) {
    const baseUrl = 'http://localhost:8000';
    
    // Start search
    const searchResponse = await fetch(`${baseUrl}${endpoint}?${new URLSearchParams(params)}`);
    const { task_id } = await searchResponse.json();
    
    // Monitor status
    let status;
    do {
        const statusResponse = await fetch(`${baseUrl}${endpoint.replace('/search', '/status')}/${task_id}`);
        status = await statusResponse.json();
        await new Promise(resolve => setTimeout(resolve, 2000));
    } while (status.status === 'running');
    
    // Get results
    const resultsResponse = await fetch(`${baseUrl}${endpoint.replace('/search', '/results')}/${task_id}`);
    return await resultsResponse.json();
}

// Usage
searchAPI('/gmaps/search', {query: 'restaurants in Austin', max_results: 50})
    .then(results => console.log(results));
```

### cURL
```bash
# Complete workflow
TASK_ID=$(curl -s "http://localhost:8000/gmaps/search?query=restaurants%20in%20Austin&max_results=50" | jq -r '.task_id')

# Monitor status
curl -s "http://localhost:8000/gmaps/status/$TASK_ID" | jq '.status'

# Get results
curl -s "http://localhost:8000/gmaps/results/$TASK_ID" | jq '.total_results'

# Download CSV
curl -s "http://localhost:8000/gmaps/download/$TASK_ID/csv" -o results.csv
```

## 📋 All Available APIs

| API | Base Path | Main Endpoint | Description |
|-----|-----------|---------------|-------------|
| Google Maps | `/gmaps` | `/search` | Business information scraping |
| Chrome Web Store | `/chrome-webstore` | `/scrape` | Extension data scraping |
| Twitter | `/twitter` | `/scrape` | User and list data scraping |
| ProductHunt | `/producthunt` | `/products/daily` | Rankings and launches |
| Amazon | `/amazon-search` | `/search` | Product search and data |
| YouTube | `/youtube` | `/transcript` | Video transcript extraction |
| Facebook Marketplace | `/facebook-marketplace` | `/search` | Marketplace listings |
| Zillow | `/zillow` | `/sales`, `/rentals`, `/sold` | Real estate data |

## 🎯 Interactive Documentation
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
