import Link from "next/link";

export const metadata = {
  title: "Blog | Naik Foods",
  description: "Maharashtrian recipes, food history, and updates from Naik Foods.",
};

export default function BlogPage() {
  return (
    <div className="container" style={{ padding: "6rem 0", textAlign: "center", maxWidth: "600px" }}>
      <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>📖</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "2rem", marginBottom: "1rem" }}>
        Our Blog is Cooking
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2rem", lineHeight: "1.6" }}>
        We are preparing traditional Maharashtrian recipes, tips on how to use our masalas, and stories behind our pickles. Check back soon!
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
        Shop Our Ingredients
      </Link>
    </div>
  );
}
