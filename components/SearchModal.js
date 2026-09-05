"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "@/data/products";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const results = query.trim().length > 0
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  const popular = products.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div className="search-overlay" onClick={onClose} role="presentation">
      <div 
        className="search-modal" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Search Products"
      >
        <div className="search-input-wrap">
          <span>🔍</span>
          <label htmlFor="search-input-field" className="visually-hidden" style={{ display: 'none' }}>Search for products</label>
          <input
            id="search-input-field"
            ref={inputRef}
            className="search-input"
            type="text"
            placeholder="Search masalas, pickles, snacks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search masalas, pickles, snacks"
          />
          <button className="search-close-btn" onClick={onClose}>ESC</button>
        </div>

        <div className="search-results">
          {query.trim().length === 0 ? (
            <>
              <div style={{ padding: "12px 16px", fontSize: "0.75rem", fontWeight: 700, color: "#8c9196", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Popular Products
              </div>
              {popular.map(product => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="search-result-item"
                  onClick={onClose}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="search-result-img"
                    width={48}
                    height={48}
                  />
                  <div className="search-result-info">
                    <h4>{product.name}</h4>
                    <p>{product.brand} · {product.weight}</p>
                  </div>
                  <span className="search-result-price">₹{product.price}</span>
                </Link>
              ))}
            </>
          ) : results.length > 0 ? (
            results.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="search-result-item"
                onClick={onClose}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="search-result-img"
                  width={48}
                  height={48}
                />
                <div className="search-result-info">
                  <h4>{product.name}</h4>
                  <p>{product.brand} · {product.weight}</p>
                </div>
                <span className="search-result-price">₹{product.price}</span>
              </Link>
            ))
          ) : (
            <div className="search-empty">
              <span>🔍</span>
              <p>No products found for &ldquo;{query}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
