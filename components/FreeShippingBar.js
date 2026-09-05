"use client";
import { useCart } from "@/context/CartContext";
import { FREE_SHIPPING_THRESHOLD } from "@/data/products";

export default function FreeShippingBar() {
  const { subtotal, amountToFreeShipping, freeShippingProgress } = useCart();

  const achieved = amountToFreeShipping === 0;

  return (
    <div className={`free-shipping-bar ${achieved ? "achieved" : ""}`}>
      <div className="free-shipping-text">
        {achieved ? (
          <>🎉 You&apos;ve unlocked FREE delivery!</>
        ) : (
          <>🚚 Add ₹{Math.ceil(amountToFreeShipping)} more for <strong>FREE delivery</strong></>
        )}
      </div>
      <div className="free-shipping-track">
        <div
          className="free-shipping-fill"
          style={{ width: `${freeShippingProgress}%` }}
        />
      </div>
    </div>
  );
}
