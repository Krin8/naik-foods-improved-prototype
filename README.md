# Naik Foods Improved Prototype

This project is a Next.js prototype demonstrating UX, SEO, and conversion rate optimizations for the Naik Foods e-commerce website. It was built as part of an assignment to analyze and improve the existing user experience.

## Live Demo
**Deploy URL:** [https://naik-foods-improved-demo.surge.sh](https://naik-foods-improved-demo.surge.sh)

## Description of What Was Developed
Based on a comprehensive analysis of the Naik Foods website, I developed a working prototype that addresses several critical UX and conversion friction points. The prototype implements the following key features:
1. **Smart Global Search**: Replaces the hidden sidebar search with a responsive, global search modal featuring autocomplete and "popular products" fallback.
2. **Quick View Modal**: Allows users to preview product details, price, and add to cart directly from the store grid without a full page load.
3. **Bundle Suggestions ("Frequently Bought Together")**: A cross-selling feature on Product Detail Pages (PDP) that suggests complementary items (e.g., Rose Sharbat with Chirote) to increase Average Order Value (AOV).
4. **Free Shipping Progress Bar**: A gamified indicator in the slide-out cart drawer showing exactly how close the user is to unlocking free delivery (₹999 threshold).
5. **Recently Viewed Products**: A `localStorage`-persisted carousel at the bottom of the store and product pages to help users navigate back to items they were considering.
6. **Fixed Discount Display**: Solved the "0% off" bug from the original site by conditionally rendering discount badges only when the discount is greater than zero.

## Technologies Used
- **Framework**: Next.js 14 (App Router)
- **Styling**: Vanilla CSS (Custom Design System in `globals.css`)
- **State Management**: React Context API (`CartContext.js`)
- **Persistence**: `localStorage` (for Cart and Recently Viewed items)
- **Deployment**: Surge (Static Export)

## Setup and Installation Instructions
To run this project locally, ensure you have Node.js installed (v18 or higher recommended).

1. **Clone the repository** (or extract the source code):
   ```bash
   git clone <repository_url>
   cd naik-foods-improved
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## How to Run the Project
Start the Next.js development server:
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

To build for production (static export):
```bash
npm run build
```
The statically generated files will be available in the `out/` directory.

## Brief Explanation of Implementation
- **Data Layer**: Instead of a real backend, a mock product catalog (`data/products.js`) is used, structured to mimic the real Naik Foods inventory with relationships for bundles.
- **Cart Context**: A centralized `CartProvider` manages the cart state and calculations (subtotal, shipping threshold), persisting the state to `localStorage` across page reloads.
- **Styling Strategy**: Following the constraint of avoiding Tailwind CSS unless explicitly requested, I built a robust Vanilla CSS design system utilizing CSS Variables (Custom Properties) for colors, spacing, typography, and shadows. This ensures consistent UI rendering and highly optimized, clean markup.
- **Performance**: Leveraging Next.js Server Components for layouts and Client Components only where interactivity is needed (e.g., Modals, Cart). Images use native lazy loading.
