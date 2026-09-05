import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "6rem 0", textAlign: "center", maxWidth: "600px" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🍽️</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "2rem", marginBottom: "1rem" }}>
        Page Not Found
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or the URL might be incorrect.
      </p>
      <Link
        href="/store"
        style={{
          display: "inline-block",
          padding: "14px 32px",
          background: "var(--green-500)",
          color: "white",
          borderRadius: "8px",
          fontWeight: "700",
          textDecoration: "none",
          fontSize: "1rem",
        }}
      >
        Browse Our Store
      </Link>
    </div>
  );
}
