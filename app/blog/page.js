import Link from "next/link";
import { posts } from "@/data/blog";

export const metadata = {
  title: "Blog & Recipes | Naik Foods",
  description: "Authentic Maharashtrian recipes, food stories, and more from the Naik Foods Kitchen.",
};

export default function BlogIndex() {
  return (
    <>
      <div className="store-hero">
        <h1>Blog & Recipes</h1>
        <p>Discover stories and recipes from the heart of Maharashtra</p>
      </div>

      <div className="container" style={{ padding: "4rem 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
          {posts.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "flex", flexDirection: "column", background: "white", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border-color)", textDecoration: "none", color: "inherit", transition: "transform 0.2s" }} className="hover-card">
              <img src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <div style={{ padding: "1.5rem" }}>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{post.title}</h2>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{post.excerpt}</p>
                <div style={{ marginTop: "1rem", color: "var(--green-600)", fontWeight: 500, fontSize: "0.9rem" }}>Read More →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
