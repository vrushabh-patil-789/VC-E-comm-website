import { useState, useCallback } from 'react'

import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'


export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} added to cart!`)
  }, [])

  const updateQty = useCallback((id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    )
  }, [])

  const removeItem = useCallback((id) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />

      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/shirts" element={<CategoryPage category="shirts" onAddToCart={addToCart} />} />
        <Route path="/tshirts" element={<CategoryPage category="tshirts" onAddToCart={addToCart} />} />
        <Route path="/jeans" element={<CategoryPage category="jeans" onAddToCart={addToCart} />} />
      </Routes>

      <Footer />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      <div className={`fixed bottom-8 right-8 bg-accent text-white px-6 py-4 rounded-md text-sm font-medium shadow-xl transition-all duration-300 z-[300] ${toast ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}>
        {toast}
      </div>
    </>
  )
}
