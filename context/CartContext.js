"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { FREE_SHIPPING_THRESHOLD } from "@/data/products";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("naik-cart");
      if (saved) setItems(JSON.parse(saved));
      const viewed = localStorage.getItem("naik-recently-viewed");
      if (viewed) setRecentlyViewed(JSON.parse(viewed));
    } catch (e) { /* ignore */ }
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("naik-cart", JSON.stringify(items));
  }, [items]);

  // Persist recently viewed
  useEffect(() => {
    localStorage.setItem("naik-recently-viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems(prev => prev.filter(i => i.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== productId));
      return;
    }
    setItems(prev =>
      prev.map(i => (i.id === productId ? { ...i, quantity: qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const addToRecentlyViewed = useCallback((product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 50;
  const total = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      subtotal, totalItems, shipping, total,
      amountToFreeShipping, freeShippingProgress,
      isCartOpen, setIsCartOpen,
      recentlyViewed, addToRecentlyViewed,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
