"use client";
import { useState } from "react";
import Link from "next/link";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("idle");
  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!email || !orderId) return;
    setStatus("loading");
    setErrorMsg("");
    setOrder(null);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, orderId }),
      });
      const data = await res.json();

      if (res.ok) {
        setOrder(data.order);
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Order not found");
        setStatus("error");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="container" style={{ padding: "4rem 0", maxWidth: "600px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", marginBottom: "1rem" }}>Track Your Order</h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        Enter your order ID and the email address used during checkout to see the current status of your order.
      </p>

      <form onSubmit={handleTrack} style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={btnStyle} disabled={status === "loading"}>
          {status === "loading" ? "Searching..." : "Track Order"}
        </button>
      </form>

      {errorMsg && (
        <div style={{ padding: "1rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", color: "#dc2626", marginBottom: "1.5rem" }}>
          {errorMsg}
        </div>
      )}

      {order && (
        <div style={{ background: "var(--gray-50)", padding: "2rem", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "700", marginBottom: "1rem" }}>Order Details</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            <div>
              <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "0.9rem" }}>Status</span>
              <strong style={{ color: "var(--green-700)" }}>{order.status}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "0.9rem" }}>Total</span>
              <strong>₹{order.totalAmount.toFixed(2)}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "0.9rem" }}>Payment Method</span>
              <strong>{order.paymentMethod}</strong>
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "0.9rem" }}>Date</span>
              <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
            </div>
          </div>
          
          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Shipping Address</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            {order.customerName}<br />
            {order.shippingAddress}
          </p>

          <h3 style={{ fontSize: "1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Items</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {order.items.map(item => (
              <li key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--border-light)" }}>
                <span>{item.quantity}x {item.name}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
};
