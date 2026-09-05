export const metadata = {
  title: "Contact Us | Naik Foods",
  description: "Get in touch with Naik Foods for support, bulk orders, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: "60px 16px", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "24px", color: "var(--text-primary)" }}>Contact Us</h1>
      
      <div style={{ display: "grid", gap: "40px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", marginTop: "40px" }}>
        
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--text-primary)" }}>Customer Support</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
            Need help with an order? We are here for you 7 days a week.
          </p>
          <ul style={{ listStyle: "none", padding: 0, color: "var(--text-primary)", lineHeight: "2" }}>
            <li>📞 Phone: <a href="tel:+919730046247" style={{ color: "var(--primary)", fontWeight: "500" }}>+91 97300 46247</a></li>
            <li>💬 WhatsApp: <a href="https://wa.me/919730046247" style={{ color: "var(--primary)", fontWeight: "500" }}>+91 97300 46247</a></li>
            <li>✉️ Email: <a href="mailto:support@naikfoods.co.in" style={{ color: "var(--primary)", fontWeight: "500" }}>support@naikfoods.co.in</a></li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "var(--text-primary)" }}>Corporate Office</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "12px", lineHeight: "1.6" }}>
            Naik Foods Pvt. Ltd.<br />
            Shop No 14, Ground Floor, Sai Plaza,<br />
            Kothrud, Pune, Maharashtra 411038<br />
            India
          </p>
          <p style={{ color: "var(--text-secondary)", marginTop: "20px" }}>
            <strong>FSSAI License No:</strong> 11521036000123
          </p>
        </div>

      </div>
    </div>
  );
}
