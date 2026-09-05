"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function RecentlyViewed() {
  const { recentlyViewed } = useCart();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="recently-viewed">
      <div className="container">
        <h2 className="recently-viewed-title">Recently Viewed</h2>
        <div className="recently-viewed-grid">
          {recentlyViewed.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="recently-viewed-item"
            >
              <img
                src={product.image}
                alt={product.name}
                className="recently-viewed-img"
                width={160}
                height={160}
                loading="lazy"
              />
              <div className="recently-viewed-name">{product.name}</div>
              <div className="recently-viewed-price">₹{product.price}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
