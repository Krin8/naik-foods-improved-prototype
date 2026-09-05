import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PromoBanner from "@/components/PromoBanner";
import ReferralTracker from "@/components/ReferralTracker";
import { Suspense } from "react";

export const metadata = {
  metadataBase: new URL("https://naik-foods-improved-demo.surge.sh"),
  title: "Naik Foods | Authentic Maharashtrian Delicacies & Masalas",
  description: "Order traditional Maharashtrian masalas, pickles, and food specialties from Vidarbha, Marathwada, Konkan & Pune. Hand-pounded, authentic, delivered fresh.",
  keywords: "Naik Foods, Maharashtrian food, Vidarbha masalas, authentic pickles, Indian spices, Pune food store",
  openGraph: {
    title: "Naik Foods | Authentic Maharashtrian Delicacies",
    description: "Hand-pounded masalas, traditional pickles, and farm-fresh staples.",
    url: "https://naik-foods-improved-demo.surge.sh",
    siteName: "Naik Foods",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#70BF4F" />
        <link rel="icon" href="https://www.naikfoods.co.in/cdn/shop/files/NF-Monogram-Light-BG_32x32.png?v=1708492027" type="image/png" sizes="32x32" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body>
        <CartProvider>
          <PromoBanner />
          <Suspense fallback={null}>
            <ReferralTracker />
          </Suspense>
          <Header />
          <main>{children}</main>
          <Footer />
          <a
            href="https://wa.me/919730046247?text=Hi!%20I%20have%20a%20question%20about%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-fab"
            aria-label="Chat on WhatsApp"
          >
            💬
          </a>
        </CartProvider>
      </body>
    </html>
  );
}
