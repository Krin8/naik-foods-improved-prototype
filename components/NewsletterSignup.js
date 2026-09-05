"use client";
import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("idle");
        alert("Failed to subscribe. Please try again.");
      }
    } catch (err) {
      setStatus("idle");
      alert("Network error. Please try again.");
    }
  };

  return (
    <section className="section" style={{ background: "var(--green-50)" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "600px" }}>
        <h2 className="section-title" style={{ color: "var(--green-800)" }}>Join the Naik Foods Family</h2>
        <p className="section-subtitle" style={{ color: "var(--green-700)" }}>
          Subscribe to our newsletter to get updates on new authentic recipes, festive offers, and exclusive regional delicacies.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginTop: "2rem" }}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--green-200)",
              fontSize: "1rem",
              outline: "none"
            }}
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            style={{
              padding: "1rem 2rem",
              background: "var(--green-600)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: status === "loading" || status === "success" ? "default" : "pointer",
              opacity: status === "loading" ? 0.7 : 1
            }}
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "..." : status === "success" ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
        {status === "success" && (
          <p style={{ color: "var(--green-700)", marginTop: "1rem", fontSize: "0.9rem", fontWeight: "500" }}>
            Thank you for subscribing! We'll be in touch soon.
          </p>
        )}
      </div>
    </section>
  );
}
