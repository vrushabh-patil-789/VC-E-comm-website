import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

export default function Home({ onAddToCart }) {
  const featured = [
    ...products.filter(p => p.category === 'shirts').slice(0, 2),
    ...products.filter(p => p.category === 'tshirts').slice(0, 2),
    ...products.filter(p => p.category === 'jeans').slice(0, 2),
  ]

  return (
    <main>
      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-content animate-in">
          <h1>Look Better <span>Feel Better, Every Day</span></h1>
          <p>Shop Vare Collection’s latest arrival of premium essentials designed for the man who values effortless style.</p>
          <div className="hero-actions">
            <Link to="/shirts" className="btn btn-primary">Shop Now →</Link>
            <Link to="/tshirts" className="btn btn-outline">Explore Collection</Link>
          </div>
        </div>
        <div className="hero-visual animate-in animate-delay-2">
          <div className="hero-img-card">
            <div className="hero-img-placeholder">Shirts Collection</div>
          </div>
          <div className="hero-img-card">
            <div className="hero-img-placeholder">Jeans Collection</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section" id="categories-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">Find your perfect fit across our collections</p>
          </div>
        </div>
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {[
            { name: 'Shirts', desc: 'Formal & casual shirts', to: '/shirts', count: products.filter(p => p.category === 'shirts').length },
            { name: 'T-Shirts', desc: 'Everyday essentials', to: '/tshirts', count: products.filter(p => p.category === 'tshirts').length },
            { name: 'Jeans', desc: 'Denim for every occasion', to: '/jeans', count: products.filter(p => p.category === 'jeans').length },
          ].map(cat => (
            <Link to={cat.to} key={cat.name} className="product-card" style={{ textDecoration: 'none' }}>
              <div className="product-card-img" style={{ aspectRatio: '16/9' }}>
                <div className="product-placeholder">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span>{cat.name}</span>
                </div>
              </div>
              <div className="product-info" style={{ textAlign: 'center', padding: '1.5rem' }}>
                <h3 className="product-name" style={{ fontSize: '1.15rem', whiteSpace: 'normal' }}>{cat.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '.875rem', marginTop: '.25rem' }}>{cat.desc} • {cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section" id="featured-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Handpicked styles you'll love</p>
          </div>
        </div>
        <div className="product-grid">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="features" id="features">
          {[
            { icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', circle: { cx: 12, cy: 7, r: 4 }, title: 'Premium Quality', desc: 'Crafted from finest materials' },
            { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Secure Payments', desc: '100% secure checkout' },
            { icon: 'M5 12h14M12 5l7 7-7 7', title: 'Free Shipping', desc: 'On orders above ₹999' },
            { icon: 'M4 4h16v16H4zM9 9h6v6H9z', title: 'Easy Returns', desc: '30-day hassle-free returns' },
          ].map((f, i) => (
            <div className="feature" key={i}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24">
                  <path d={f.icon} />
                  {f.circle && <circle cx={f.circle.cx} cy={f.circle.cy} r={f.circle.r} />}
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section">
        <div className="newsletter" id="newsletter">
          <h2>Stay in Style</h2>
          <p>Subscribe for exclusive offers, new arrivals, and style tips.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" id="newsletter-email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  )
}
