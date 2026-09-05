"use client";

const MOCK_POSTS = [
  { id: 1, image: "https://res.cloudinary.com/diyfjndsj/image/upload/v1748598684/snacks_category_bthhwe.webp", alt: "Snacks" },
  { id: 2, image: "https://res.cloudinary.com/diyfjndsj/image/upload/v1748598685/pickles_category_o09v7z.webp", alt: "Pickles" },
  { id: 3, image: "https://res.cloudinary.com/diyfjndsj/image/upload/v1748598684/sweets_category_s99dui.webp", alt: "Sweets" },
  { id: 4, image: "https://res.cloudinary.com/diyfjndsj/image/upload/v1748598685/spices_category_q9rtxy.webp", alt: "Spices" }
];

export default function InstagramGrid() {
  return (
    <section style={{ padding: "4rem 0", background: "white", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: "800", fontSize: "2rem", marginBottom: "0.5rem" }}>
            Follow us on Instagram
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
            <a href="https://instagram.com/naikfoods" target="_blank" rel="noopener noreferrer" style={{ color: "var(--orange-600)", textDecoration: "none", fontWeight: "600" }}>
              @naikfoods
            </a>
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "1rem" 
        }}>
          {MOCK_POSTS.map(post => (
            <a 
              key={post.id} 
              href="https://instagram.com/naikfoods" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                position: "relative",
                aspectRatio: "1",
                overflow: "hidden",
                borderRadius: "12px",
                display: "block",
                background: "var(--gray-100)"
              }}
              className="hover-grow"
            >
              <img 
                src={post.image} 
                alt={post.alt} 
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              onMouseOver={e => e.currentTarget.style.opacity = "1"}
              onMouseOut={e => e.currentTarget.style.opacity = "0"}
              >
                <span style={{ color: "white", fontSize: "2rem" }}>📷</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
