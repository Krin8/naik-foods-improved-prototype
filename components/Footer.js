import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>🍊 Naik Foods</h3>
            <p>
              Authentic Maharashtrian delicacies — hand-pounded masalas, traditional pickles,
              and farm-fresh staples delivered from Vidarbha, Marathwada, Konkan & Pune.
              Rooted in a legacy that began in 1938.
            </p>
          </div>

          <div className="footer-col">
            <h4>Shop</h4>
            <Link href="/store">All Products</Link>
            <Link href="/store?category=snacks-and-namkeen">Snacks & Namkeen</Link>
            <Link href="/store?category=pickles-and-condiments">Pickles & Condiments</Link>
            <Link href="/store?category=sweets-and-bakery">Sweets & Bakery</Link>
            <Link href="/store?category=spices-and-masalas">Spices & Masalas</Link>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/contact">Store Locator</Link>
          </div>

          <div className="footer-col">
            <h4>Support</h4>
            <Link href="/contact">FAQs</Link>
            <Link href="/policies">Shipping & Returns</Link>
            <Link href="/orders/track">Track Order</Link>
            <Link href="/policies#privacy">Privacy Policy</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Naik Foods. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://www.instagram.com/naikfoods/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">📷</a>
            <a href="https://www.facebook.com/naikfoods" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">📘</a>
            <a href="https://www.youtube.com/@naikfoods" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">▶️</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
