export const metadata = {
  title: "About Us | Naik Foods",
  description: "Learn about the legacy of Naik Foods, bringing authentic Maharashtrian delicacies to your doorstep since 1938.",
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: "60px 16px", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "var(--text-primary)" }}>About Naik Foods</h1>
      
      <div style={{ lineHeight: "1.8", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
        <p style={{ marginBottom: "20px" }}>
          Rooted in a legacy that began in 1938, <strong>Naik Foods</strong> brings you the authentic taste of Maharashtra. 
          What started as a small local endeavour has grown into a beloved brand, trusted for preserving 
          traditional recipes passed down through generations.
        </p>

        <h2 style={{ fontSize: "1.8rem", marginTop: "40px", marginBottom: "16px", color: "var(--text-primary)" }}>Our Mission</h2>
        <p style={{ marginBottom: "20px" }}>
          We are on a mission to deliver the pure, unadulterated flavours of Vidarbha, Marathwada, Konkan, and Pune 
          straight to your kitchen. From our hand-pounded masalas to our stone-ground thecha and sun-dried pickles, 
          every product is crafted with love, hygiene, and the finest locally sourced ingredients.
        </p>

        <h2 style={{ fontSize: "1.8rem", marginTop: "40px", marginBottom: "16px", color: "var(--text-primary)" }}>Quality Promise</h2>
        <ul style={{ listStyle: "disc", paddingLeft: "24px", marginBottom: "20px" }}>
          <li style={{ marginBottom: "10px" }}>No artificial colours or harmful preservatives</li>
          <li style={{ marginBottom: "10px" }}>Traditional preparation methods (stone-ground, hand-pounded)</li>
          <li style={{ marginBottom: "10px" }}>100% vegetarian manufacturing facility</li>
          <li style={{ marginBottom: "10px" }}>FSSAI Licensed & Certified</li>
        </ul>
      </div>
    </div>
  );
}
