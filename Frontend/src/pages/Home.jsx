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
          <p className="text-text-muted text-[1.1rem] mb-8 max-w-[440px] mx-auto md:mx-0">Shop <span className='text-orange-500'>Vare Collection's</span> latest arrival of premium essentials designed for the man who values effortless style.</p>
          <div className="flex gap-4 flex-wrap justify-center md:justify-start">
            <Link to="/shirts" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.875rem] font-semibold tracking-[0.3px] transition-all duration-[250ms] bg-accent text-white shadow-[0_4px_14px_rgba(26,26,46,.25)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(26,26,46,.35)]">Shop Now →</Link>
            <Link to="/tshirts" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[0.875rem] font-semibold tracking-[0.3px] transition-all duration-[250ms] border-[1.5px] border-border-main text-text-main hover:border-accent hover:bg-accent hover:text-white">Explore Collection</Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 relative animate-[fadeInUp_0.5s_ease_forwards] max-w-[400px] md:max-w-none mx-auto w-full" style={{ animationDelay: '0.2s' }}>
          <Link to="/shirts" className="rounded-xl aspect-[3/4] overflow-hidden transition-transform duration-[250ms] hover:-translate-y-1.5 block relative group cursor-pointer">
            <img
              src="/Shirts/shirt-hero.jpg"
              alt="Shirts Collection"
              className="w-full h-full object-cover scale-105 blur-[1px] group-hover:blur-0 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-white/10 transition-colors duration-300 flex items-end p-5">
              <div>
                <p className="text-white/70 text-[0.7rem] uppercase tracking-[2px] mb-1">Collection</p>
                <h3 className="text-white font-serif text-[1.2rem] font-semibold leading-tight">Shirts</h3>
                <span className="text-white/80 text-[0.75rem] mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">Shop now →</span>
              </div>
            </div>
          </Link>
          <Link to="/jeans" className="rounded-xl aspect-[3/4] overflow-hidden transition-transform duration-[250ms] hover:-translate-y-1.5 mt-8 block relative group cursor-pointer">
            <img
              src="/Jeans/jeans-hero.jpg"
              alt="Jeans Collection"
              className="w-full h-full object-cover scale-105 blur-[1px] group-hover:blur-0 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-white/10 transition-colors duration-300 flex items-end p-5">
              <div>
                <p className="text-white/70 text-[0.7rem] uppercase tracking-[2px] mb-1">Collection</p>
                <h3 className="text-white font-serif text-[1.2rem] font-semibold leading-tight">Jeans</h3>
                <span className="text-white/80 text-[0.75rem] mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200">Shop now →</span>
              </div>
            </div>
          </Link>
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
            { name: 'Shirts', desc: 'Formal & casual shirts', to: '/shirts', image: '/Shirts/shirt-pattern-2.jpg', count: products.filter(p => p.category === 'shirts').length },
            { name: 'T-Shirts', desc: 'Everyday essentials', to: '/tshirts', image: '/T-Shirts/tshirt-blue-addidas.jpg', count: products.filter(p => p.category === 'tshirts').length },
            { name: 'Jeans', desc: 'Denim for every occasion', to: '/jeans', image: '/Jeans/jeans-black-casual.jpg', count: products.filter(p => p.category === 'jeans').length },
          ].map(cat => (
            <Link to={cat.to} key={cat.name} className="bg-bg-card rounded-xl overflow-hidden border border-border-main transition-all duration-[250ms] group hover:-translate-y-1 hover:shadow-xl hover:border-transparent block">
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
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


    </main>
  )
}