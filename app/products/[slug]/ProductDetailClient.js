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

  const [selectedVariant, setSelectedVariant] = useState(product.variants ? product.variants[0] : null);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);

  const activePrice = selectedVariant ? selectedVariant.price : product.price;
  const activeOriginalPrice = selectedVariant ? selectedVariant.originalPrice : product.originalPrice;
  const activeDiscount = selectedVariant ? selectedVariant.discount : product.discount;
  const activeWeight = selectedVariant ? selectedVariant.weight : product.weight;

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  const handleAdd = () => {
    addItem({ ...product, price: activePrice, weight: activeWeight, id: selectedVariant ? `${product.id}-${activeWeight}` : product.id }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handlePincodeCheck = () => {
    if (pincode.length !== 6) {
      setPincodeStatus("error");
      return;
    }
    // Simulate check
    setPincodeStatus("checking");
    setTimeout(() => {
      setPincodeStatus("success");
    }, 800);
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
              <span className="pdp-price">₹{activePrice}</span>
              {activeDiscount > 0 && (
                <>
                  <span className="pdp-original">₹{activeOriginalPrice}</span>
                  <span className="pdp-discount-badge">{activeDiscount}% OFF</span>
                </>
              )}
            </div>

            <div className="pdp-weight">Net Weight: {activeWeight} | Region: {product.region}</div>

            {product.variants && (
              <div style={{ marginBottom: "24px" }}>
                <strong style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>Select Size:</strong>
                <div style={{ display: "flex", gap: "12px" }}>
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        padding: "8px 16px",
                        border: selectedVariant === v ? "2px solid var(--green-500)" : "1px solid var(--border-color)",
                        borderRadius: "8px",
                        background: selectedVariant === v ? "var(--green-50)" : "white",
                        fontWeight: selectedVariant === v ? "700" : "500",
                        color: selectedVariant === v ? "var(--green-600)" : "var(--text-primary)",
                      }}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
              <strong style={{ color: "var(--green-700)", fontSize: "0.9rem", display: "block", marginBottom: "8px" }}>
                Check Delivery & ETA
              </strong>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--green-300)", borderRadius: "6px", fontSize: "0.9rem" }}
                />
                <button
                  onClick={handlePincodeCheck}
                  style={{ padding: "8px 16px", background: "var(--green-600)", color: "white", borderRadius: "6px", fontSize: "0.9rem", fontWeight: "600" }}
                >
                  Check
                </button>
              </div>
              
              {pincodeStatus === "error" && <div style={{ fontSize: "0.85rem", color: "var(--red-500)" }}>Please enter a valid 6-digit pincode.</div>}
              {pincodeStatus === "checking" && <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Checking availability...</div>}
              {pincodeStatus === "success" && (
                <div style={{ fontSize: "0.85rem", color: "var(--green-700)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>✅</span> Delivery available to <strong>{pincode}</strong>. Estimated delivery: 3-5 days. Ships from {product.region}.
                </div>
              )}
              {!pincodeStatus && (
                <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  Please enter your pincode to check delivery time and availability.
                </span>
              )}
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
