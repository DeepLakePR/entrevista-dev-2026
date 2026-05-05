# Uncode Commerce

Functional mini e-commerce built as a frontend technical challenge, focused on clean component architecture, practical state management, responsive UI, and clear delivery documentation.

Production: [https://entrevista-dev-2026.vercel.app/](https://entrevista-dev-2026.vercel.app/)

## Key Highlights

- Product listing with search, category filtering, and sorting.
- Product details page with stock information and purchase actions.
- Cart drawer with quantity controls, item removal, and real-time total calculation.
- Favorites flow persisted in the browser.
- Internal API routes serving local product data.
- Responsive interface with loading skeletons and accessible UI primitives.
- Technical SEO with metadata, `sitemap.xml`, and `robots.txt`.
- E2E validation with Cypress.
- External chatbot integration.

## The Challenge

The goal was to deliver a small but complete e-commerce experience within a short technical-test timeline. The project needed to demonstrate frontend fundamentals beyond static UI: data loading, reusable components, client-side state, persistence, filters, product navigation, and a reliable user flow from browsing to cart interaction.

The main constraints were time, scope control, and keeping the implementation simple enough for a technical challenge while still showing production-oriented decisions.

## The Solution

Uncode Commerce uses Next.js App Router as a full-stack frontend solution. Product data is stored locally in `src/data/products.json` and exposed through Next.js API Routes, avoiding unnecessary backend complexity for the challenge scope.

The shopping cart and favorites are handled with React Context API and persisted with `localStorage`, keeping the experience functional across reloads without requiring authentication or a database. Business rules for cart, favorites, and product filtering are separated into `src/features/*/utils`, which keeps UI components focused on presentation and interaction.

The interface is built with Tailwind CSS, shadcn/ui, Radix UI primitives, and Lucide icons. Cypress covers the main end-to-end flows, while the app also includes basic SEO and accessibility improvements.

## Technologies

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **shadcn/ui**
- **Radix UI**
- **Lucide React**
- **Context API**
- **localStorage**
- **Next.js API Routes**
- **Cypress**
- **ESLint**

## How to Run

### Requirements

- Node.js 20+
- Yarn

### Installation

```bash
git clone https://github.com/guifm-dev/entrevista-dev-2026.git
cd entrevista-dev-2026
yarn
yarn dev
```

The application will be available at:

```bash
http://localhost:3000
```

### Available Scripts

```bash
# Start the development server
yarn dev

# Build the production version
yarn build

# Start the production server after building
yarn start

# Run linting
yarn lint

# Run Cypress E2E tests
yarn test:e2e

# Open Cypress in interactive mode
yarn cypress:open
```

Note: Cypress is configured to use `http://localhost:3000` as its base URL, so keep the development server running before executing the E2E suite.

## Project Structure

```text
cypress/                      # E2E tests and custom Cypress commands
public/                       # Static assets and external chatbot script
src/
  app/
    (shop)/                   # Shop routes: home, product details, favorites
    api/                      # API routes for products and categories
    layout.tsx                # Root layout, providers, and metadata
    robots.ts                 # Search engine crawling rules
    sitemap.ts                # Indexable URL map
  components/
    cart/                     # Cart drawer and cart item components
    category/                 # Category filter components
    favorites/                # Favorites page helpers
    pages/                    # Client-side page containers
    product/                  # Product card, listing, and filter components
    shared/                   # Header and Footer
    skeletons/                # Loading skeleton components
    ui/                       # Base UI components
  context/                    # CartContext and FavoritesContext
  data/                       # Local products dataset
  features/                   # Business rules for cart, favorites, and products
  hooks/                      # Data fetching and localStorage hooks
  lib/                        # API helpers, SEO, utilities, and storage helpers
  types/                      # Shared TypeScript types
DECISIONS.md                  # Detailed technical decisions and trade-offs
README.md                     # Project overview and setup guide
```

## Notes

The full technical decision log is available in [`DECISIONS.md`](DECISIONS.md). It documents the main trade-offs, implementation history, assumptions, known limitations, and possible future improvements.
