export default function ProductCard({ product, onAddToCart }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const badgeClass = product.badge
    ? product.badge.toLowerCase() === 'sale' ? 'product-badge sale'
    : product.badge.toLowerCase() === 'new' ? 'product-badge new'
    : product.badge.toLowerCase() === 'trending' ? 'product-badge trending'
    : 'product-badge'
    : ''

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg key={i} viewBox="0 0 20 20" style={{ opacity: i < Math.floor(rating) ? 1 : 0.3 }}>
          <path d="M10 1l2.39 4.84L17.82 7l-3.91 3.81.92 5.38L10 13.47l-4.83 2.72.92-5.38L2.18 7l5.43-.16z"/>
        </svg>
      )
    }
    return stars
  }

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <div className="product-card-img">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
            <span>Image</span>
          </div>
        )}
        {product.badge && <span className={badgeClass}>{product.badge}</span>}
        <button className="product-wishlist" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        </button>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <div className="product-stars">{renderStars(product.rating)}</div>
          <span>({product.reviews})</span>
        </div>
        <div className="product-price">
          <span className="current">₹{product.price.toLocaleString()}</span>
          <span className="original">₹{product.originalPrice.toLocaleString()}</span>
          <span className="discount">{discount}% OFF</span>
        </div>
        <div className="product-sizes">
          {product.sizes.map(s => <span key={s}>{s}</span>)}
        </div>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
