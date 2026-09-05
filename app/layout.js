import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Naik Foods | Authentic Maharashtrian Delicacies & Masalas",
  description: "Order traditional Maharashtrian masalas, pickles, and food specialties from Vidarbha, Marathwada, Konkan & Pune. Hand-pounded, authentic, delivered fresh.",
  keywords: "Naik Foods, Maharashtrian food, Vidarbha masalas, authentic pickles, Indian spices, Pune food store",
  openGraph: {
    title: "Naik Foods | Authentic Maharashtrian Delicacies",
    description: "Hand-pounded masalas, traditional pickles, and farm-fresh staples.",
    url: "https://naikfoods-improved.netlify.app",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <CartProvider>
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
