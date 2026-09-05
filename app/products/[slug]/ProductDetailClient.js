"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import BundleSuggestions from "@/components/BundleSuggestions";
import QuickViewModal from "@/components/QuickViewModal";

export default function ProductDetailClient({ product }) {
  const { addItem, addToRecentlyViewed } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div className="container pdp">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <a href="/">Home</a>
          <span>›</span>
          <a href="/store">Store</a>
          <span>›</span>
          <a href={`/store?category=${product.category}`}>
            {product.category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
          </a>
          <span>›</span>
          <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{product.name}</span>
        </div>

        <div className="pdp-grid">
          {/* Image */}
          <div className="pdp-image-main">
            <img src={product.image} alt={product.name} width={600} height={600} />
          </div>

          {/* Details */}
          <div>
            <div className="pdp-brand">{product.brand}</div>
            <h1 className="pdp-name">{product.name}</h1>

            <div className="pdp-rating">
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                ))}
              </div>
              <span className="pdp-rating-text">{product.rating} ({product.reviews} verified reviews)</span>
            </div>

            <div className="pdp-price-row">
              <span className="pdp-price">₹{product.price}</span>
              {product.discount > 0 && (
                <>
                  <span className="pdp-original">₹{product.originalPrice}</span>
                  <span className="pdp-discount-badge">{product.discount}% OFF</span>
                </>
              )}
            </div>

            <div className="pdp-weight">Net Weight: {product.weight} | Region: {product.region}</div>

            <p className="pdp-short-desc">{product.description}</p>

            <ul className="pdp-highlights">
              {product.highlights?.map((h, i) => (
                <li key={i}><span className="check">✓</span> {h}</li>
              ))}
            </ul>

            <div className="pdp-add-row">
              <div className="pdp-qty">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(qty + 1)}>+</button>
              </div>
              <button
                className={`pdp-add-btn ${added ? "added add-pop" : ""}`}
                onClick={handleAdd}
              >
                {added ? "✓ Added to Cart" : "🛒 Add to Cart"}
              </button>
            </div>

            <div style={{ padding: "16px", background: "var(--green-50)", borderRadius: "12px", border: "1px dashed var(--green-300)" }}>
              <strong style={{ color: "var(--green-700)", fontSize: "0.9rem", display: "block", marginBottom: "4px" }}>
                Delivery Info
              </strong>
              <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                Delivers in 3-5 working days. Ships from {product.region}.
              </span>
            </div>
          </div>
        </div>
      </div>

      <BundleSuggestions currentSlug={product.slug} onQuickView={setQuickViewProduct} />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
