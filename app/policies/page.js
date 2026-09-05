export const metadata = {
  title: "Policies | Naik Foods",
  description: "Shipping, Returns, and Privacy policies for Naik Foods.",
};

export default function PoliciesPage() {
  return (
    <div className="container" style={{ padding: "60px 16px", maxWidth: "800px" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "40px", color: "var(--text-primary)" }}>Our Policies</h1>
      
      <section style={{ marginBottom: "40px" }} id="shipping">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px", color: "var(--text-primary)" }}>Shipping Policy</h2>
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "12px" }}>
            We ship pan-India. Orders are typically processed and dispatched within 1-2 business days. 
            Depending on your location (PIN code), delivery takes 3 to 7 business days from the date of dispatch.
          </p>
          <p style={{ marginBottom: "12px" }}>
            <strong>Shipping Charges:</strong> We offer FREE standard shipping on all orders above ₹999. 
            For orders below ₹999, a flat shipping fee of ₹60 applies.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }} id="returns">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px", color: "var(--text-primary)" }}>Return & Refund Policy</h2>
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "12px" }}>
            Since our products are perishable food items, we generally do not accept returns. 
            However, if you receive a damaged product, an incorrect item, or an expired batch, please contact us 
            within 48 hours of delivery at <strong>support@naikfoods.co.in</strong> with photos of the item.
          </p>
          <p style={{ marginBottom: "12px" }}>
            Valid claims will be eligible for a free replacement or a full refund to the original payment method 
            within 5-7 business days.
          </p>
        </div>
      </section>

      <section style={{ marginBottom: "40px" }} id="privacy">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "16px", color: "var(--text-primary)" }}>Privacy Policy</h2>
        <div style={{ lineHeight: "1.6", color: "var(--text-secondary)" }}>
          <p style={{ marginBottom: "12px" }}>
            Your privacy is important to us. We only collect essential information required to process and 
            deliver your orders (Name, Address, Phone, Email). We do not store your credit card or payment details on our servers; 
            all transactions are processed securely via our PCI-DSS compliant payment gateway partners.
          </p>
          <p style={{ marginBottom: "12px" }}>
            We will never sell or rent your personal information to third parties.
          </p>
        </div>
      </section>
    </div>
  );
}
