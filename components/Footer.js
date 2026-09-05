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
            <Link href="/">About Us</Link>
            <Link href="/">Blog</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Store Locator</Link>
          </div>

          <div className="footer-col">
            <h4>Help</h4>
            <Link href="/">Shipping Policy</Link>
            <Link href="/">Return Policy</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Naik Foods. All rights reserved.</span>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">📷</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">📘</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube">▶️</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
