"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!product) return null;

  return (
    <div className="quickview-overlay" onClick={onClose} role="presentation">
      <div 
        className="quickview-modal" 
        onClick={(e) => e.stopPropagation()} 
        style={{ position: "relative" }}
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view for ${product.name}`}
      >
        <button className="quickview-close" onClick={onClose}>✕</button>

        <div className="quickview-image">
          <img src={product.image} alt={product.name} width={400} height={400} />
        </div>

        <div className="quickview-info">
          <span className="quickview-brand">{product.brand}</span>
          <h2 className="quickview-name">{product.name}</h2>

          <div className="quickview-rating">
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="rating-count">({product.reviews} reviews)</span>
          </div>

          <div className="quickview-price-row">
            <span className="quickview-price">₹{product.price}</span>
            {product.discount > 0 && (
              <>
                <span className="quickview-original">₹{product.originalPrice}</span>
                <span className="quickview-discount">{product.discount}% off</span>
              </>
            )}
          </div>

          <p className="quickview-desc">{product.description}</p>

          <ul className="quickview-highlights">
            {product.highlights?.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>

          <div className="quickview-actions">
            <button
              className="quickview-add-btn"
              onClick={() => {
                addItem(product);
                onClose();
              }}
            >
              🛒 Add to Cart — ₹{product.price}
            </button>
            <Link href={`/products/${product.slug}`} className="quickview-view-btn" onClick={onClose}>
              View Full Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
