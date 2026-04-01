# 🍎 Food Product Explorer

A modern web application to search, filter, and explore food products with detailed nutritional information, powered by the [OpenFoodFacts API](https://world.openfoodfacts.org/).

## 🚀 Live Demo

https://food-product-explorer-upgrade.vercel.app/


## 📸 Screenshots

> (./public/SS1.png)
> (./public/SS2.png)
> (./public/SS3.png)
> (./public/SS4.png)

## ✨ Features

- **Product Listing** — Browse thousands of real food products with images, categories and nutrition grades
- **Search by Name** — Search food products by name with debounced input for better performance
- **Search by Barcode** — Look up any specific product instantly using its barcode number
- **Category Filter** — Filter products by category (Dairy, Beverages, Snacks, Cereals, Fruits, and more)
- **Sort Functionality** — Sort by product name (A-Z, Z-A) or nutrition grade (best/worst first)
- **Load More** — Paginated product loading with a smooth Load More button
- **Product Detail Page** — Full product details including ingredients, nutritional values table and labels
- **Cart System** — Add products to cart with real-time item count and slide-in drawer
- **Toast Notifications** — Instant feedback when adding products to cart
- **Responsive Design** — Fully responsive across mobile, tablet and desktop
- **Dark Mode** — Full dark mode support
- **Retry Mechanism** — Auto-retries failed API calls up to 3 times for better reliability

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| API | OpenFoodFacts API |
| State Management | React Context API |
| Notifications | Sonner |
| Analytics | Vercel Analytics |

## 📁 Project Structure
```
├── app/
│   ├── api/
│   │   ├── categories/route.ts         # Proxy — fetch all categories
│   │   ├── products/route.ts           # Proxy — search products by name
│   │   ├── category/[name]/route.ts    # Proxy — filter products by category
│   │   └── product/[barcode]/route.ts  # Proxy — get product by barcode
│   ├── product/[id]/
│   │   └── page.tsx                    # Product detail page
│   ├── layout.tsx                      # Root layout with providers
│   └── page.tsx                        # Homepage
├── components/
│   ├── ui/                             # shadcn/ui base components
│   ├── navbar.tsx                      # Navigation bar with cart icon
│   ├── product-card.tsx                # Individual product card
│   ├── product-grid.tsx                # Responsive product grid with skeletons
│   ├── search-bar.tsx                  # Name and barcode search inputs
│   ├── filter-bar.tsx                  # Category dropdown and sort options
│   ├── cart-drawer.tsx                 # Slide-in cart drawer
│   └── nutrition-table.tsx             # Nutritional values table
├── lib/
│   ├── api.ts                          # All OpenFoodFacts API functions
│   └── cart-context.tsx                # Cart state with React Context
└── types/
    └── index.ts                        # TypeScript interfaces
```

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Omkumar9470/Food-Product-Explorer-Upgrade
cd omkumar9470
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API Integration

This project uses the [OpenFoodFacts API](https://world.openfoodfacts.org/) — a free, open-source food products database maintained by a non-profit organization.

### Why API Routes (Proxy)?
The OpenFoodFacts API does not support CORS for browser requests. To solve this, all API calls are routed through **Next.js API Routes** which act as a server-side proxy — the browser calls our local API, and our server calls OpenFoodFacts.

### Reliability
Since OpenFoodFacts is a free community-run API, it occasionally returns 503 errors. The app handles this with an **automatic retry mechanism** — each failed request is retried up to 3 times with a 1 second delay between attempts.

### Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `GET /cgi/search.pl` | Search products by name |
| `GET /cgi/search.pl?tagtype_0=categories` | Filter products by category |
| `GET /api/v0/product/{barcode}.json` | Get product by barcode |
| `GET /categories.json` | Get all categories |

## 📱 Pages

### Homepage (`/`)
- Product grid with skeleton loading states
- Search by name and barcode
- Category filter and sort options
- Load More pagination

### Product Detail (`/product/[barcode]`)
- Full product image
- Complete ingredients list
- Nutritional values table (energy, fat, carbs, protein, salt etc.)
- Label badges (Vegan, Gluten-Free, Organic etc.)
- Nutrition grade badge (A-E)
- Add to Cart button

## ⏱️ Time Taken

> Approximately 2 hours

## 📄 License

This project is built for evaluation purposes only. Product data is sourced from [OpenFoodFacts](https://world.openfoodfacts.org/) under the [Open Database License](https://opendatacommons.org/licenses/odbl/1-0/).
