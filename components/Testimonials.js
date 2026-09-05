export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Sneha P.",
      location: "Mumbai",
      text: "The Kolhapuri Masala is exactly like what my Aaji used to make. The aroma is incredible and the spice level is perfect for our misal. Will definitely reorder!",
      rating: 5,
    },
    {
      id: 2,
      name: "Rahul D.",
      location: "Pune",
      text: "Best Chirote I have had outside of a halwai! Crisp, not too sweet, and perfectly packaged. Naik Foods really knows their traditional recipes.",
      rating: 5,
    },
    {
      id: 3,
      name: "Meera K.",
      location: "Bangalore",
      text: "I was missing home food, and the Konkan Prawns Pickle was a savior. Absolutely authentic taste and very fast delivery. Highly recommended.",
      rating: 5,
    },
  ];

  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "center", justifyContent: "center" }}>
          <div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from lovers of Maharashtrian cuisine</p>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ display: "flex", color: "var(--yellow-400)", marginBottom: "1rem", gap: "4px" }}>
                {"★".repeat(review.rating)}
              </div>
              <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--text-primary)", marginBottom: "1.5rem", fontStyle: "italic" }}>
                "{review.text}"
              </p>
              <div>
                <div style={{ fontWeight: "700", fontSize: "1rem" }}>{review.name}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{review.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
