"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Redirect to store if cart is empty and not on success step
  useEffect(() => {
    if (items.length === 0 && step !== 3) {
      window.location.href = "/store";
    }
  }, [items.length, step]);

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderId(`NF-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
      setStep(3);
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    return null; // Prevents flashing before redirect
  }

  return (
    <div className="container" style={{ padding: "4rem 0", maxWidth: "1000px" }}>
      {step < 3 && <h1 style={{ marginBottom: "2rem", fontFamily: "var(--font-display)", fontWeight: "800" }}>Secure Checkout</h1>}
      
      <div style={{ display: "grid", gridTemplateColumns: step === 3 ? "1fr" : "1.5fr 1fr", gap: "3rem" }}>
        
        {/* Main Content Area */}
        <div>
          {step === 1 && (
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "700" }}>1. Shipping Address</h2>
              <form onSubmit={handleSubmitAddress} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input required type="text" placeholder="First Name" style={inputStyle} />
                  <input required type="text" placeholder="Last Name" style={inputStyle} />
                </div>
                <input required type="email" placeholder="Email Address" style={inputStyle} />
                <input required type="text" placeholder="Phone Number" style={inputStyle} />
                <input required type="text" placeholder="Street Address" style={inputStyle} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input required type="text" placeholder="City" style={inputStyle} />
                  <input required type="text" placeholder="Pincode (e.g. 411001)" style={inputStyle} />
                </div>
                <button type="submit" style={btnStyle}>Continue to Payment →</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "700" }}>2. Payment Method</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid var(--green-400)", borderRadius: "8px", background: "var(--green-50)", cursor: "pointer" }}>
                  <input type="radio" name="payment" defaultChecked style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>UPI (Google Pay, PhonePe, Paytm)</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "8px", cursor: "pointer" }}>
                  <input type="radio" name="payment" style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>Credit / Debit Card</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: "1px solid var(--border-color)", borderRadius: "8px", cursor: "pointer" }}>
                  <input type="radio" name="payment" style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>Cash on Delivery (COD)</span>
                </label>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={() => setStep(1)} style={{ ...btnStyle, background: "var(--gray-200)", color: "var(--text-primary)" }}>← Back</button>
                <button type="button" onClick={handlePlaceOrder} disabled={isProcessing} style={{ ...btnStyle, flex: 1, opacity: isProcessing ? 0.7 : 1 }}>
                  {isProcessing ? "Processing..." : `Place Order (₹${total})`}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--green-50)", borderRadius: "16px", border: "1px solid var(--green-200)" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", color: "var(--green-700)", marginBottom: "1rem" }}>Order Confirmed!</h1>
              <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2rem" }}>
                Thank you for your order. We are preparing your authentic Maharashtrian delicacies.
              </p>
              <div style={{ display: "inline-block", background: "white", padding: "1rem 2rem", borderRadius: "8px", marginBottom: "2rem", boxShadow: "var(--shadow-sm)" }}>
                <span style={{ display: "block", fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Order Number</span>
                <strong style={{ fontSize: "1.2rem" }}>{orderId}</strong>
              </div>
              <div>
                <Link href="/store" style={{ ...btnStyle, display: "inline-block", textDecoration: "none" }}>Continue Shopping</Link>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {step < 3 && (
          <div style={{ background: "var(--gray-50)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-light)", alignSelf: "start", position: "sticky", top: "100px" }}>
            <h3 style={{ marginBottom: "1.5rem", fontWeight: "700" }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-color)" }}>
              {items.map(item => (
                <div key={item.id} style={{ display: "flex", gap: "1rem" }}>
                  <img src={item.image} alt={item.name} style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.9rem", fontWeight: "600", lineHeight: "1.3", marginBottom: "0.25rem" }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Qty: {item.quantity} {item.variant ? `| ${item.variant.weight}` : ""}</div>
                  </div>
                  <div style={{ fontWeight: "700", fontSize: "0.9rem" }}>₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.95rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem", fontSize: "0.95rem" }}>
              <span style={{ color: "var(--text-secondary)" }}>Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: "var(--green-600)", fontWeight: "600" }}>FREE</span> : `₹${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid var(--border-color)", fontSize: "1.2rem", fontWeight: "800" }}>
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid var(--border-color)",
  borderRadius: "8px",
  fontSize: "1rem",
  outline: "none",
};

const btnStyle = {
  width: "100%",
  padding: "16px",
  background: "var(--green-500)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "700",
  cursor: "pointer",
  marginTop: "1rem",
};
