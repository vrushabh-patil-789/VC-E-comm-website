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
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-[clamp(3rem,8vw,6rem)] grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[70vh] text-center md:text-left" id="hero">
        <div className="animate-[fadeInUp_0.5s_ease_forwards]">
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.15] mb-5">
            Look Better <span className="bg-gradient-to-br from-[#1a1a2e] to-[#4a5568] bg-clip-text text-transparent">Feel Better, Every Day</span>
          </h1>
          <p className="text-text-muted text-[1.1rem] mb-8 max-w-[440px] mx-auto md:mx-0">Shop <span className='text-orange-500'>Vare Collection’s</span> latest arrival of premium essentials designed for the man who values effortless style.</p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link to="/shirts" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.875rem] font-semibold tracking-[0.3px] transition-all duration-[250ms] bg-accent text-white shadow-[0_4px_14px_rgba(26,26,46,.25)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(26,26,46,.35)]">Shop Now →</Link>
            <Link to="/tshirts" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.875rem] font-semibold tracking-[0.3px] transition-all duration-[250ms] border-[1.5px] border-border-main text-text-main hover:border-accent hover:bg-accent hover:text-white">Explore Collection</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 relative animate-[fadeInUp_0.5s_ease_forwards] max-w-[400px] md:max-w-none mx-auto w-full" style={{ animationDelay: '0.2s' }}>
          <div className="bg-[#f0f0f0] rounded-xl aspect-[3/4] overflow-hidden transition-transform duration-[250ms] hover:-translate-y-1.5">
            <div className="w-full h-full flex items-center justify-center text-[0.85rem] text-text-muted bg-gradient-to-br from-gray-100 to-gray-200">Shirts Collection</div>
          </div>
          <div className="bg-[#f0f0f0] rounded-xl aspect-[3/4] overflow-hidden transition-transform duration-[250ms] hover:-translate-y-1.5 mt-8">
            <div className="w-full h-full flex items-center justify-center text-[0.85rem] text-text-muted bg-gradient-to-br from-gray-100 to-gray-200">Jeans Collection</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-20" id="categories-section">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold">Shop by Category</h2>
            <p className="text-text-muted text-[0.95rem] mt-1">Find your perfect fit across our collections</p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {[
            { name: 'Shirts', desc: 'Formal & casual shirts', to: '/shirts', count: products.filter(p => p.category === 'shirts').length },
            { name: 'T-Shirts', desc: 'Everyday essentials', to: '/tshirts', count: products.filter(p => p.category === 'tshirts').length },
            { name: 'Jeans', desc: 'Denim for every occasion', to: '/jeans', count: products.filter(p => p.category === 'jeans').length },
          ].map(cat => (
            <Link to={cat.to} key={cat.name} className="bg-bg-card rounded-xl overflow-hidden border border-border-main transition-all duration-[250ms] group hover:-translate-y-1 hover:shadow-xl hover:border-transparent block">
              <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#f8f8f8] to-[#ececec] relative">
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#b0b0b0]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 opacity-40">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                  <span className="uppercase tracking-[1px] text-[0.75rem]">{cat.name}</span>
                </div>
              </div>
              <div className="text-center p-6">
                <h3 className="text-[1.15rem] font-medium whitespace-normal">{cat.name}</h3>
                <p className="text-text-muted text-[0.875rem] mt-1">{cat.desc} • {cat.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-20" id="featured-section">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-semibold">Featured Products</h2>
            <p className="text-text-muted text-[0.95rem] mt-1">Handpicked styles you'll love</p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 py-12 border-t border-border-main mt-8" id="features">
          {[
            { icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2', circle: { cx: 12, cy: 7, r: 4 }, title: 'Premium Quality', desc: 'Crafted from finest materials' },
            { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Secure Payments', desc: '100% secure checkout' },
            { icon: 'M5 12h14M12 5l7 7-7 7', title: 'Free Shipping', desc: 'On orders above ₹999' },
            { icon: 'M4 4h16v16H4zM9 9h6v6H9z', title: 'Easy Returns', desc: '30-day hassle-free returns' },
          ].map((f, i) => (
            <div className="text-center p-8 px-6 rounded-xl transition-colors duration-[250ms] hover:bg-gray-50" key={i}>
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-accent stroke-[1.8px] fill-none">
                  <path d={f.icon} />
                  {f.circle && <circle cx={f.circle.cx} cy={f.circle.cy} r={f.circle.r} />}
                </svg>
              </div>
              <h3 className="text-[0.95rem] font-semibold mb-1.5">{f.title}</h3>
              <p className="text-[0.82rem] text-text-muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 pb-12 md:pb-20">
        <div className="bg-accent text-white rounded-xl p-[clamp(2.5rem,5vw,4rem)] text-center my-12" id="newsletter">
          <h2 className="font-serif text-[1.75rem] font-semibold mb-2">Stay in Style</h2>
          <p className="opacity-80 mb-6 text-[0.95rem]">Subscribe for exclusive offers, new arrivals, and style tips.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" id="newsletter-email" className="flex-1 px-5 py-3.5 rounded-full border-none text-[0.9rem] bg-white/15 text-white outline-none placeholder:text-white/60" />
            <button type="submit" className="px-7 py-3.5 rounded-full bg-white text-accent font-semibold text-[0.85rem] transition-transform duration-[250ms] hover:scale-105">Subscribe</button>
          </form>
        </div>
      </section>
    </main>
  )
}
