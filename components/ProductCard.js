"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          width={300}
          height={300}
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card-badges">
          {product.discount > 0 && (
            <span className="badge-discount">{product.discount}% OFF</span>
          )}
          {product.isNew && <span className="badge-new">NEW</span>}
          {product.isBestseller && <span className="badge-bestseller">BESTSELLER</span>}
        </div>

        {/* Hover actions removed per audit recommendations */}

        {/* Quick View button */}
        <div className="product-card-quickview">
          <button
            className="quickview-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
          >
            👁 Quick View
          </button>
        </div>
      </div>

      <div className="product-card-body">
        <div className="product-card-brand">{product.brand}</div>
        <div className="product-card-name">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </div>

        <div className="product-card-rating">
          <div className="stars">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
            ))}
          </div>
          <span className="rating-count">({product.reviews})</span>
        </div>

        <div className="product-card-footer">
          <div>
            <div className="product-card-price">
              <span className="price-current">₹{product.price}</span>
              {product.discount > 0 && (
                <span className="price-original">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="product-card-weight">{product.weight}</span>
          </div>
          <button
            className={`add-to-cart-btn ${added ? "added add-pop" : ""}`}
            onClick={handleAdd}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
