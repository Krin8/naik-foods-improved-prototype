"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Script from "next/script";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, total, clearCart, isLoaded } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Address state (controlled)
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  // Redirect to store if cart is empty and not on success step
  useEffect(() => {
    if (isLoaded && items.length === 0 && step !== 3) {
      router.push("/store");
    }
  }, [isLoaded, items.length, step, router]);

  const handleAddressChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitAddress = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setErrorMsg("");

    const payload = {
      items: items.map(i => ({ id: i.id, slug: i.slug, quantity: i.quantity, variantIndex: i.variantIndex })),
      address,
      paymentMethod,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize checkout");
      }

      // COD orders skip Razorpay
      if (paymentMethod === "COD") {
        setIsProcessing(false);
        setOrderId(data.orderId);
        clearCart();
        setStep(3);
        return;
      }

      // Razorpay flow for UPI / Card
      const options = {
        key: data.key,
        amount: data.amount,
        currency: "INR",
        name: "Naik Foods",
        description: "Authentic Maharashtrian Delicacies",
        order_id: data.razorpayOrderId,
        handler: function () {
          setIsProcessing(false);
          setOrderId(data.orderId);
          clearCart();
          setStep(3);
        },
        prefill: {
          name: `${address.firstName} ${address.lastName}`,
          email: address.email,
          contact: address.phone,
        },
        theme: {
          color: "#22c55e"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function () {
        setIsProcessing(false);
        setErrorMsg("Payment failed. Please try again or choose a different payment method.");
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setIsProcessing(false);
    }
  };

  if (!isLoaded || (items.length === 0 && step !== 3)) {
    return null;
  }

  return (
    <div className="container" style={{ padding: "4rem 0", maxWidth: "1000px" }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      {step < 3 && <h1 style={{ marginBottom: "2rem", fontFamily: "var(--font-display)", fontWeight: "800" }}>Secure Checkout</h1>}
      
      {errorMsg && (
        <div style={{ padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          {errorMsg}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: step === 3 ? "1fr" : "1.5fr 1fr", gap: "3rem" }}>
        
        {/* Main Content Area */}
        <div>
          {step === 1 && (
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "700" }}>1. Shipping Address</h2>
              <form onSubmit={handleSubmitAddress} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input required type="text" placeholder="First Name" value={address.firstName} onChange={e => handleAddressChange("firstName", e.target.value)} style={inputStyle} />
                  <input required type="text" placeholder="Last Name" value={address.lastName} onChange={e => handleAddressChange("lastName", e.target.value)} style={inputStyle} />
                </div>
                <input required type="email" placeholder="Email Address" value={address.email} onChange={e => handleAddressChange("email", e.target.value)} style={inputStyle} />
                <input required type="tel" placeholder="Phone Number" value={address.phone} onChange={e => handleAddressChange("phone", e.target.value)} style={inputStyle} />
                <input required type="text" placeholder="Street Address" value={address.street} onChange={e => handleAddressChange("street", e.target.value)} style={inputStyle} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <input required type="text" placeholder="City" value={address.city} onChange={e => handleAddressChange("city", e.target.value)} style={inputStyle} />
                  <input required type="text" placeholder="Pincode (e.g. 411001)" pattern="[0-9]{6}" title="Enter a valid 6-digit pincode" value={address.pincode} onChange={e => handleAddressChange("pincode", e.target.value)} style={inputStyle} />
                </div>
                <button type="submit" style={btnStyle}>Continue to Payment →</button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ marginBottom: "1.5rem", fontSize: "1.2rem", fontWeight: "700" }}>2. Payment Method</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: `1px solid ${paymentMethod === "UPI" ? "var(--green-400)" : "var(--border-color)"}`, borderRadius: "8px", background: paymentMethod === "UPI" ? "var(--green-50)" : "white", cursor: "pointer" }}
                  onClick={() => setPaymentMethod("UPI")}
                >
                  <input type="radio" name="payment" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>UPI (Google Pay, PhonePe, Paytm)</span>
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: `1px solid ${paymentMethod === "CARD" ? "var(--green-400)" : "var(--border-color)"}`, borderRadius: "8px", background: paymentMethod === "CARD" ? "var(--green-50)" : "white", cursor: "pointer" }}
                  onClick={() => setPaymentMethod("CARD")}
                >
                  <input type="radio" name="payment" checked={paymentMethod === "CARD"} onChange={() => setPaymentMethod("CARD")} style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>Credit / Debit Card</span>
                </label>
                <label
                  style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem", border: `1px solid ${paymentMethod === "COD" ? "var(--green-400)" : "var(--border-color)"}`, borderRadius: "8px", background: paymentMethod === "COD" ? "var(--green-50)" : "white", cursor: "pointer" }}
                  onClick={() => setPaymentMethod("COD")}
                >
                  <input type="radio" name="payment" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} style={{ accentColor: "var(--green-500)", width: "18px", height: "18px" }} />
                  <span style={{ fontWeight: "600" }}>Cash on Delivery (COD)</span>
                </label>
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={() => setStep(1)} style={{ ...btnStyle, background: "var(--gray-200)", color: "var(--text-primary)" }}>← Back</button>
                <button type="button" onClick={handlePlaceOrder} disabled={isProcessing} style={{ ...btnStyle, flex: 1, opacity: isProcessing ? 0.7 : 1 }}>
                  {isProcessing ? "Processing..." : paymentMethod === "COD" ? `Place COD Order (₹${total})` : `Pay ₹${total}`}
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
