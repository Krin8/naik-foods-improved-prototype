"use client";
import { useEffect } from "react";
import Link from "next/link";

export default function MobileMenu({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose} />
      <div className="cart-drawer" style={{ right: "auto", left: 0, transform: "none" }}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">Menu</div>
          <button className="cart-drawer-close" onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }}>
          <Link href="/" onClick={onClose} style={{ fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: "500" }}>Home</Link>
          <Link href="/store" onClick={onClose} style={{ fontSize: "1.1rem", color: "var(--text-primary)", fontWeight: "500" }}>Shop All</Link>
          <div style={{ height: "1px", background: "var(--border-color)", margin: "8px 0" }} />
          <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: "600" }}>Categories</div>
          <Link href="/store?category=pickles-and-condiments" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>Pickles & Condiments</Link>
          <Link href="/store?category=sweets-and-bakery" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>Sweets & Bakery</Link>
          <Link href="/store?category=snacks-and-namkeen" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>Snacks & Namkeen</Link>
          <Link href="/store?category=spices-and-masalas" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>Spices & Masalas</Link>
          <div style={{ height: "1px", background: "var(--border-color)", margin: "8px 0" }} />
          <Link href="/about" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>About Us</Link>
          <Link href="/contact" onClick={onClose} style={{ fontSize: "1rem", color: "var(--text-primary)" }}>Contact</Link>
        </nav>
      </div>
    </>
  );
}
