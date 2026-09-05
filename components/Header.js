"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import SearchModal from "./SearchModal";
import CartDrawer from "./CartDrawer";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="header-logo" aria-label="Naik Foods Home">
            <div className="header-logo-icon">NF</div>
            Naik Foods
          </Link>

          <nav className="header-nav">
            <Link href="/">Home</Link>
            <Link href="/store">Shop</Link>
            <Link href="/store?category=pickles-and-condiments">Pickles</Link>
            <Link href="/store?category=sweets-and-bakery">Sweets</Link>
          </nav>

          <div className="header-actions">
            <button
              className="search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
            >
              🔍
            </button>

            <button
              className="header-action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
            >
              🛒
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </button>

            <button className="mobile-menu-btn" aria-label="Open menu">
              ☰
            </button>
          </div>
        </div>
      </header>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
      {isCartOpen && <CartDrawer />}
    </>
  );
}
