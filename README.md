# Naik Foods Improved Prototype

This project is a Next.js prototype demonstrating UX, SEO, and conversion rate optimizations for the Naik Foods e-commerce website. It was built as part of an assignment to analyze and improve the existing user experience.

## Live Demo
**Deploy URL:** [https://naikfoods.co.in](https://naikfoods.co.in)

## Description of What Was Developed
Based on a comprehensive analysis of the Naik Foods website, I developed a working prototype that addresses several critical UX and conversion friction points, now fully hardened for production. The prototype implements the following key features:
1. **Server-Side Rendered Catalog**: Products are loaded from a Postgres database using Prisma ORM.
2. **Secure Checkout**: Server-side price validation, Razorpay signature verification, and COD support.
3. **Email Confirmations**: Automated order confirmation emails sent via Resend API.
4. **Growth Engine & SEO**: Blog with Recipe JSON-LD, BreadcrumbList schema, and referral tracking (`?ref=`) that awards flat discounts.
5. **Admin Dashboard**: Secure `/admin/orders` view protected by an admin secret to manage order statuses.
6. **Smart Global Search & Modals**: Responsive search, quick view modals, and cross-selling bundles.
7. **Pincode Delivery Check**: Dynamic validation of serviceability (mocked via Shiprocket fallback).
8. **Real-time Filters**: URL-synced price and region filters on the store page.

## Technologies Used
- **Framework**: Next.js (App Router, Server Components)
- **Database**: PostgreSQL (via Prisma ORM)
- **Styling**: Vanilla CSS (Custom Design System in `globals.css`)
- **Payments**: Razorpay API
- **Emails**: Resend API
- **Deployment**: Vercel

## Setup and Installation Instructions
To run this project locally, ensure you have Node.js installed (v18 or higher recommended).

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd naik-foods-improved
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Copy `.env.example` to `.env` and configure your Postgres database URL and API keys.
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database (Postgres) & Seed**:
   ```bash
   npx prisma generate
   npx prisma db push
   node prisma/seed.mjs
   ```

## How to Run the Project
Start the Next.js development server:
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

To build and run for production:
```bash
npm run build
npm start
```

## Brief Explanation of Implementation
- **Data Layer**: Powered by **Prisma + Postgres**. Products, referrals, and orders are stored securely.
- **Cart Context**: A centralized `CartProvider` manages the cart state and calculations (subtotal, shipping threshold), persisting the state to `localStorage` across page reloads.
- **Secure Checkout**: API routes recalculate prices server-side from the database to prevent client tampering, supporting both COD and Razorpay paths with HMAC signature verification.
- **Styling Strategy**: Built a robust Vanilla CSS design system utilizing CSS Variables for colors, spacing, typography, and shadows.
- **Performance**: Leveraging Next.js Server Components for layouts/product queries and Client Components only where interactivity is needed (e.g., Modals, Cart). Images use native lazy loading.

## Deployment to Vercel
1. Push your repository to GitHub.
2. Import the project in Vercel.
3. In Vercel Environment Variables, set:
   - `DATABASE_URL` (Points to a Postgres instance like Neon/Supabase)
   - `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`
   - `RESEND_API_KEY` & `EMAIL_FROM`
   - `ADMIN_SECRET`
4. Update the Build Command (if necessary) to ensure Prisma generates the client:
   `npx prisma generate && next build`
5. Deploy! Your admin dashboard will be available at `/admin/orders`.
