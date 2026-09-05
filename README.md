# Naik Foods Improved Prototype

This project is a Next.js prototype demonstrating UX, SEO, and conversion rate optimizations for the Naik Foods e-commerce website. It was built as part of an assignment to analyze and improve the existing user experience.

## Live Demo
**Deploy URL:** [https://naik-foods-improved-demo.surge.sh](https://naik-foods-improved-demo.surge.sh)

## Description of What Was Developed
Based on a comprehensive analysis of the Naik Foods website, I developed a working prototype that addresses several critical UX and conversion friction points. The prototype implements the following key features:
1. **Smart Global Search**: Replaces the hidden sidebar search with a responsive, global search modal featuring autocomplete and "popular products" fallback.
2. **Quick View Modal**: Allows users to preview product details, price, and add to cart directly from the store grid without a full page load.
3. **Regional Bundle Suggestions**: A cross-selling feature on Product Detail Pages (PDP) titled "Complete your Maharashtrian snack box" that suggests complementary items to increase Average Order Value (AOV).
4. **Pincode Delivery Check**: A lookup simulation on the PDP that validates shipping availability and displays estimated delivery times based on origin regions.
5. **Product Variants**: Size toggles (e.g., 200g vs 500g) that dynamically update pricing and weight info on the PDP.
6. **Mock Checkout Flow**: A multi-step checkout simulation leading to an "Order Confirmed" success page, completing the funnel demonstration.
7. **Free Shipping Progress Bar**: A gamified indicator in the slide-out cart drawer showing exactly how close the user is to unlocking free delivery (₹999 threshold).
8. **Recently Viewed Products**: A `localStorage`-persisted carousel at the bottom of the store and product pages.
9. **Fixed Discount Display**: Solved the "0% off" bug from the original site by conditionally rendering discount badges only when the discount is greater than zero.

## Technologies Used
- **Framework**: Next.js 16 (App Router)
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

## Production Readiness Checklist
While this prototype is functional, several placeholder behaviors should be replaced before a real production launch:
- **Backend / Database**: Replace the `data/products.js` mock catalog with a real CMS/database (e.g., Sanity, Shopify, Medusa).
- **Payment Gateway**: Replace the mock checkout timeout simulation with a real Razorpay or PayU integration that verifies payments server-side.
- **Pincode Validation**: Replace the mock simulation (which accepts any 6-digit number) with an actual API call to a shipping provider (e.g., Delhivery, Shiprocket) to determine real serviceability.
- **Cart Persistence**: Consider persisting the cart to a database for logged-in users instead of only `localStorage`.
