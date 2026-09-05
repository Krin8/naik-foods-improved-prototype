"use client";
import { useState } from "react";
import Link from "next/link";
import { categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import Testimonials from "@/components/Testimonials";
import NewsletterSignup from "@/components/NewsletterSignup";
import InstagramGrid from "@/components/InstagramGrid";

export default function HomeClient({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const bestsellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNew);
  const displayCategories = categories.filter(c => c.id !== "all" && c.count > 0);
  const totalProducts = products.length;
  const totalCategories = displayCategories.length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Naik Foods",
            url: "https://www.naikfoods.co.in",
            logo: "https://www.naikfoods.co.in/logo/logo.png",
            description: "Authentic Maharashtrian food delicacies — masalas, pickles, snacks & more",
            foundingDate: "1938",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pune",
              addressRegion: "Maharashtra",
              addressCountry: "IN",
            },
          }),
        }}
      />

      <section className="hero" style={{ margin: "24px" }}>
        <div className="hero-pattern" />
        <div className="hero-content">
          <div className="hero-badge">🌿 Naik Foods Original</div>
          <h1>Authentic Maharashtrian Flavors, Delivered Fresh</h1>
          <p>
            From hand-pounded masalas to Konkan pickles — discover {totalProducts} traditional delicacies
            from Vidarbha, Marathwada, Konkan & Pune.
          </p>
          <Link href="/store" className="hero-cta">
            Shop All Products
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-value">{totalProducts}</div>
              <div className="hero-stat-label">Products</div>
            </div>
            <div>
              <div className="hero-stat-value">{totalCategories}</div>
              <div className="hero-stat-label">Categories</div>
            </div>
            <div>
              <div className="hero-stat-value">86+</div>
              <div className="hero-stat-label">Years Legacy</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="trust-bar">
          <div className="trust-item">
            <div className="trust-icon">🚚</div>
            <div>
              <div className="trust-title">Free Delivery</div>
              <div className="trust-desc">Orders above ₹999</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🕐</div>
            <div>
              <div className="trust-title">24/7 Support</div>
              <div className="trust-desc">WhatsApp & Call</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🔒</div>
            <div>
              <div className="trust-title">Secure Payment</div>
              <div className="trust-desc">100% Safe & Encrypted</div>
            </div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">↩️</div>
            <div>
              <div className="trust-title">Easy Returns</div>
              <div className="trust-desc">Within 30 days</div>
            </div>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Categories</h2>
              <p className="section-subtitle">Explore our curated selection of regional Maharashtrian delights</p>
            </div>
            <Link href="/store" className="section-link">
              View All →
            </Link>
          </div>
          <div className="categories-grid">
            {displayCategories.slice(0, 6).map(cat => (
              <Link key={cat.id} href={`/store?category=${cat.id}`} className="category-card">
                {cat.image && (
                  <img src={cat.image} alt={cat.name} className="category-card-img" width={300} height={300} loading="lazy" />
                )}
                <div className="category-card-overlay">
                  <div className="category-card-name">{cat.name}</div>
                  <div className="category-card-count">{cat.count} Items</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">🔥 Bestsellers</h2>
              <p className="section-subtitle">The most loved products by our customers</p>
            </div>
            <Link href="/store" className="section-link">View All →</Link>
          </div>
          <div className="products-grid">
            {bestsellers.slice(0, 4).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {newArrivals.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">✨ New Arrivals</h2>
                <p className="section-subtitle">Fresh additions to our store</p>
              </div>
            </div>
            <div className="products-grid">
              {newArrivals.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <Testimonials />

      {/* Instagram Grid */}
      <InstagramGrid />

      {/* Newsletter */}
      <NewsletterSignup />

      <RecentlyViewed />

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
