import { useState, useMemo, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import api from '../utils/api'

const categoryMeta = {
  shirts: {
    title: 'Shirts',
    subtitle: 'From crisp formals to relaxed casuals — find your perfect shirt.',
  },
  tshirts: {
    title: 'T-Shirts',
    subtitle: 'Everyday essentials crafted for comfort and style.',
  },
  jeans: {
    title: 'Jeans',
    subtitle: 'Premium denim in every fit and wash you need.',
  },
}

export default function CategoryPage({ category, onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const meta = categoryMeta[category]
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products')
        setProducts(response.data.filter(p => p.category === category))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [category])

  const [sortBy, setSortBy] = useState('featured')

  const sorted = useMemo(() => {
    const copy = [...products]
    switch (sortBy) {
      case 'low': return copy.sort((a, b) => a.price - b.price)
      case 'high': return copy.sort((a, b) => b.price - a.price)
      case 'rating': return copy.sort((a, b) => b.rating - a.rating)
      default: return copy
    }
  }, [products, sortBy])

  return (
    <main>
      <section className="text-center py-10 md:py-16 px-4 md:px-8 xl:px-12 bg-gradient-to-br from-gray-50 to-gray-200 border-b border-border-main" id={`${category}-hero`}>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold mb-2">{meta.title}</h1>
        <p className="text-text-muted text-[1.05rem] max-w-[520px] mx-auto">{meta.subtitle}</p>
        <div className="flex gap-3 justify-center mt-6 flex-wrap">
          {[
            { key: 'featured', label: 'Featured' },
            { key: 'low', label: 'Price: Low to High' },
            { key: 'high', label: 'Price: High to Low' },
            { key: 'rating', label: 'Top Rated' },
          ].map(f => (
            <button
              key={f.key}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-all duration-[250ms] ${sortBy === f.key ? 'bg-accent text-white border-accent' : 'border-border-main text-text-muted hover:bg-accent hover:text-white hover:border-accent'}`}
              onClick={() => setSortBy(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 md:px-8 xl:px-12 py-12 md:py-20" id={`${category}-products`}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <p className="text-text-muted text-[0.95rem] mt-1">{sorted.length} products</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            sorted.map(p => (
              <ProductCard key={p._id} product={p} onAddToCart={onAddToCart} />
            ))
          )}
        </div>
      </section>
    </main>
  )
}
