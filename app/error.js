"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="container" style={{ padding: "6rem 0", textAlign: "center", maxWidth: "600px" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>⚠️</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "2rem", marginBottom: "1rem" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
        We encountered an unexpected error. Please try again or contact us on WhatsApp if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "var(--green-500)",
          color: "white",
          borderRadius: "8px",
          fontWeight: "700",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Try Again
      </button>
    </div>
  );
}
