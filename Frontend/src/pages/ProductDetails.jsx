import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../utils/api'

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`)
        setProduct(response.data)
        if (response.data.sizes && response.data.sizes.length > 0) {
          setSelectedSize(response.data.sizes[0])
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching product:', error)
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-text-muted mb-6">The product you are looking for does not exist or has been removed.</p>
        <a href="/" className="px-6 py-3 bg-accent text-white rounded-md font-medium">Return Home</a>
      </div>
    )
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <main className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-20 animate-[fadeInUp_0.3s_ease_forwards]">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-text-muted mb-8 gap-2 items-center flex-wrap">
        <Link to="/" className="hover:text-accent transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/${product.category}`} className="hover:text-accent transition-colors capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-text-main font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        {/* Product Image Section */}
        <div className="bg-[#f8f8f8] rounded-2xl overflow-hidden aspect-[3/4] relative border border-border-main md:self-start md:sticky md:top-24">
          {product.badge && <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-[0.75rem] font-semibold tracking-[0.5px] uppercase text-white z-10 ${product.badge.toLowerCase() === 'sale' ? 'bg-red-600' : product.badge.toLowerCase() === 'new' ? 'bg-emerald-600' : product.badge.toLowerCase() === 'trending' ? 'bg-violet-600' : 'bg-accent'}`}>{product.badge}</span>}
          
          <div className="absolute top-4 right-4 z-10">
            <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center transition-transform hover:scale-110 text-text-main hover:text-accent" aria-label="Add to wishlist">
                <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] stroke-currentColor stroke-2 fill-none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
            </button>
          </div>

          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 origin-center" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#b0b0b0]">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-16 h-16 opacity-40"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
               <span>No Image</span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col py-4">
          <h1 className="text-3xl lg:text-4xl font-serif font-bold text-text-main mb-3 leading-tight">{product.name}</h1>
          
          {/* Reviews/Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 20 20" className="w-[18px] h-[18px] fill-amber-500" style={{ opacity: i < Math.floor(product.rating) ? 1 : 0.3 }}>
                  <path d="M10 1l2.39 4.84L17.82 7l-3.91 3.81.92 5.38L10 13.47l-4.83 2.72.92-5.38L2.18 7l5.43-.16z" />
                </svg>
              ))}
            </div>
            <span className="text-[0.9rem] text-text-muted hover:text-accent hover:underline cursor-pointer transition-colors font-medium">{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-3 mb-8 pb-8 border-b border-border-main">
            <span className="text-[2rem] font-bold text-accent leading-none">₹{product.price.toLocaleString()}</span>
            <span className="text-[1.15rem] text-text-muted line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-[0.8rem] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full mb-1 border border-emerald-100">{discount}% OFF</span>
          </div>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-[0.95rem] text-text-main">Select Size</h3>
                <button className="text-[0.85rem] text-text-muted underline hover:text-accent transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setSelectedSize(s)}
                    className={`w-14 h-14 rounded-md flex justify-center items-center text-[0.95rem] font-medium border transition-all duration-200 shadow-sm ${selectedSize === s ? 'border-accent bg-accent text-white shadow-accent/20' : 'border-border-main text-text-main bg-white hover:border-text-main'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button 
            className="w-full py-[1.1rem] bg-accent text-white rounded-md font-bold text-[1.05rem] transition-all hover:bg-accent-light mb-8 shadow-[0_8px_20px_rgba(26,26,46,0.15)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(26,26,46,0.25)] flex items-center justify-center gap-3"
            onClick={() => onAddToCart({ ...product, selectedSize })}
          >
            <svg viewBox="0 0 24 24" className="w-[20px] h-[20px] fill-none stroke-current stroke-2"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            Add to Cart
          </button>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-10 bg-[#fbfbfb] p-5 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent stroke-[1.8px] fill-none"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
              <span className="text-[0.85rem] font-medium text-text-main leading-tight">Free Express <br/>Delivery</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent stroke-[1.8px] fill-none"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </div>
              <span className="text-[0.85rem] font-medium text-text-main leading-tight">Secure <br/>Payments</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent stroke-[1.8px] fill-none"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4zM9 9h6v6H9z" /></svg>
              </div>
              <span className="text-[0.85rem] font-medium text-text-main leading-tight">30-Day <br/>Returns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-50">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent stroke-[1.8px] fill-none"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </div>
              <span className="text-[0.85rem] font-medium text-text-main leading-tight">100% Genuine <br/>Products</span>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="font-semibold text-[1.05rem] text-text-main mb-3">Product Information</h3>
            <p className="text-text-muted text-[0.95rem] leading-[1.7]">
              Experience the perfect blend of style and comfort with our {product.name}. Carefully crafted with premium materials ensuring durability and a soft touch. Perfect for casual outings and everyday wear, this piece offers a tailored fit that complements your silhouette seamlessly while keeping you comfortable all day long.
            </p>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-text-muted list-disc list-inside">
              <li>Premium quality fabric</li>
              <li>Classic comfortable fit</li>
              <li>Machine washable</li>
              <li>Designed for everyday wear</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
