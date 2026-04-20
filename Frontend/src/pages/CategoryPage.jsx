import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

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
  const meta = categoryMeta[category]
  const categoryProducts = useMemo(() => products.filter(p => p.category === category), [category])
  const [sortBy, setSortBy] = useState('featured')

  const sorted = useMemo(() => {
    const copy = [...categoryProducts]
    switch (sortBy) {
      case 'low': return copy.sort((a, b) => a.price - b.price)
      case 'high': return copy.sort((a, b) => b.price - a.price)
      case 'rating': return copy.sort((a, b) => b.rating - a.rating)
      default: return copy
    }
  }, [categoryProducts, sortBy])

  return (
    <main>
      <section className="category-hero" id={`${category}-hero`}>
        <h1>{meta.title}</h1>
        <p>{meta.subtitle}</p>
        <div className="category-filters">
          {[
            { key: 'featured', label: 'Featured' },
            { key: 'low', label: 'Price: Low to High' },
            { key: 'high', label: 'Price: High to Low' },
            { key: 'rating', label: 'Top Rated' },
          ].map(f => (
            <button
              key={f.key}
              className={`filter-btn ${sortBy === f.key ? 'active' : ''}`}
              onClick={() => setSortBy(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="section" id={`${category}-products`}>
        <div className="section-header">
          <p className="section-subtitle">{sorted.length} products</p>
        </div>
        <div className="product-grid">
          {sorted.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </main>
  )
}
