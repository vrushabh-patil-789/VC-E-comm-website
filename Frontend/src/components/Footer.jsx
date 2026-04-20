import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="nav-logo" style={{ color: '#fff', fontSize: '1.4rem' }}>JEUNE</Link>
          <p>Premium fashion for the modern individual. Quality craftsmanship meets contemporary design.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/shirts">Shirts</Link>
          <Link to="/tshirts">T-Shirts</Link>
          <Link to="/jeans">Jeans</Link>
          <a href="#">New Arrivals</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Press</a>
          <a href="#">Blog</a>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">Help Center</a>
          <a href="#">Returns</a>
          <a href="#">Shipping</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 JEUNE. All rights reserved.</span>
        <span>Designed with ♥</span>
      </div>
    </footer>
  )
}
