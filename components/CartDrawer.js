"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import FreeShippingBar from "./FreeShippingBar";

export default function CartDrawer() {
  const router = useRouter();
  const {
    items, updateQuantity, removeItem,
    subtotal, shipping, total, totalItems,
    setIsCartOpen,
  } = useCart();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <>
      <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-drawer">
        <div className="cart-drawer-header">
          <div>
            <div className="cart-drawer-title">Your Cart</div>
            <div className="cart-drawer-count">{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
          </div>
          <button className="cart-drawer-close" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        <div style={{ padding: "0 16px 0" }}>
          <FreeShippingBar />
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Start adding some delicious items!</p>
          </div>
        ) : (
          <div className="cart-drawer-items">
            {items.map(item => (
              <div key={item.id} className="cart-drawer-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-drawer-item-img"
                  width={72}
                  height={72}
                />
                <div className="cart-drawer-item-info">
                  <div className="cart-drawer-item-name">{item.name}</div>
                  <div className="cart-drawer-item-price">₹{item.price * item.quantity}</div>
                  <div className="cart-drawer-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-drawer-item-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE 🎉" : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-total">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <button 
              className="cart-checkout-btn"
              onClick={() => {
                setIsCartOpen(false);
                router.push("/checkout");
              }}
            >
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}
