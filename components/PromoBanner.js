"use client";
import Link from "next/link";
import { useState } from "react";

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div style={{
      background: "var(--orange-600)",
      color: "white",
      padding: "0.5rem 1rem",
      textAlign: "center",
      fontSize: "0.9rem",
      fontWeight: "600",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      position: "relative",
      zIndex: 100
    }}>
      <span>
        🎉 10% off Traditional Snacks & Pickles. Use code: <strong style={{ background: "white", color: "var(--orange-600)", padding: "2px 6px", borderRadius: "4px", marginLeft: "4px" }}>PROMO10</strong>
      </span>
      <Link href="/store" style={{ color: "white", textDecoration: "underline" }}>
        Shop Now
      </Link>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          position: "absolute",
          right: "1rem",
          background: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "1.2rem",
          padding: "0",
          lineHeight: "1"
        }}
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  );
}
