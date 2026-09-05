"use client";
import { products, bundles } from "@/data/products";
import ProductCard from "./ProductCard";

export default function BundleSuggestions({ currentSlug, onQuickView }) {
  const bundleSlugs = bundles[currentSlug];
  if (!bundleSlugs || bundleSlugs.length === 0) return null;

  const bundleProducts = bundleSlugs
    .map(slug => products.find(p => p.slug === slug))
    .filter(Boolean);

  if (bundleProducts.length === 0) return null;

  return (
    <div className="bundle-section">
      <div className="container">
        <h2 className="bundle-title">🤝 Frequently Bought Together</h2>
        <div className="bundle-grid">
          {bundleProducts.map(product => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </div>
  );
}
