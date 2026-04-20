export default function ProductCard({ product, onAddToCart }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div className="bg-bg-card rounded-xl overflow-hidden border border-border-main transition-all duration-[250ms] relative group hover:-translate-y-1 hover:shadow-xl hover:border-transparent" id={`product-${product.id}`}>
      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#f8f8f8] to-[#ececec] relative">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#b0b0b0]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 opacity-40">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <span className="text-[0.75rem] uppercase tracking-[1px]">Image</span>
          </div>
        )}
        {product.badge && <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[0.7rem] font-semibold tracking-[0.5px] uppercase text-white ${product.badge.toLowerCase() === 'sale' ? 'bg-red-600' : product.badge.toLowerCase() === 'new' ? 'bg-emerald-600' : product.badge.toLowerCase() === 'trending' ? 'bg-violet-600' : 'bg-accent'}`}>{product.badge}</span>}
        <button className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-[4px] flex items-center justify-center opacity-0 transition-opacity duration-[250ms] group-hover:opacity-100" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-text-main stroke-2 fill-none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div className="p-[1.15rem]">
        <h3 className="text-[0.95rem] font-medium mb-[0.35rem] truncate">{product.name}</h3>
        <div className="flex items-center gap-[0.35rem] mb-2">
          <div className="flex gap-[1px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" className="w-[14px] h-[14px] fill-amber-500" style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.3 }}>
                <path d="M10 1l2.39 4.84L17.82 7l-3.91 3.81.92 5.38L10 13.47l-4.83 2.72.92-5.38L2.18 7l5.43-.16z"/>
              </svg>
            ))}
          </div>
          <span className="text-[0.75rem] text-text-muted">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[1.1rem] font-bold text-accent">₹{product.price.toLocaleString()}</span>
          <span className="text-[0.85rem] text-text-muted line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-[0.7rem] font-semibold text-emerald-600 bg-emerald-50 px-2 py-[0.15rem] rounded-full">{discount}% OFF</span>
        </div>
        <div className="flex gap-[0.35rem] mt-3 flex-wrap">
          {product.sizes.map(s => <span key={s} className="px-[0.55rem] py-[0.25rem] rounded block text-[0.7rem] font-medium border border-border-main text-text-muted">{s}</span>)}
        </div>
        <button className="w-full p-[0.7rem] mt-3 rounded-sm bg-accent text-white text-[0.82rem] font-semibold transition-all duration-[250ms] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-accent-light" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
