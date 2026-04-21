import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shirts', label: 'Shirts' },
    { to: '/tshirts', label: 'T-Shirts' },
    { to: '/jeans', label: 'Jeans' },
  ]

  return (
    <nav className={`sticky top-0 z-[100] bg-white/85 backdrop-blur-[16px] border-b border-border-main px-4 md:px-8 xl:px-12 transition-shadow duration-[250ms] ${scrolled ? 'shadow-sm' : ''}`} id="main-nav">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between h-[72px]">
        <Link to="/" className="font-serif text-[1.6rem] font-bold tracking-[2px] text-accent">JEUNE</Link>

        <button className="md:hidden flex flex-col gap-[5px] p-2" onClick={() => setMenuOpen(!menuOpen)} id="nav-toggle" aria-label="Toggle menu">
          <span className="w-[22px] h-[2px] bg-text-main rounded-sm transition-all duration-[250ms]" />
          <span className="w-[22px] h-[2px] bg-text-main rounded-sm transition-all duration-[250ms]" />
          <span className="w-[22px] h-[2px] bg-text-main rounded-sm transition-all duration-[250ms]" />
        </button>

        <ul className={`fixed md:static top-[72px] left-0 right-0 bg-white md:bg-transparent flex flex-col md:flex-row p-8 md:p-0 gap-6 md:gap-8 shadow-md md:shadow-none transition-transform duration-[250ms] ${menuOpen ? 'translate-y-0' : '-translate-y-[150%] md:translate-y-0'}`}>
          {links.map(l => {
            const isActive = location.pathname === l.to;
            return (
              <li key={l.to}>
                <Link to={l.to} className={`group text-sm font-medium tracking-[0.5px] uppercase relative py-2 transition-colors duration-[250ms] ${isActive ? 'text-accent' : 'text-text-muted hover:text-accent'}`}>
                  {l.label}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-[250ms] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-5 items-center">
          <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-[250ms] hover:bg-gray-100 relative" id="cart-icon" aria-label="Cart" onClick={onCartOpen}>
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-text-main stroke-[1.8px] fill-none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" /></svg>
            {cartCount > 0 && <span className="absolute top-[2px] right-[2px] w-[18px] h-[18px] rounded-full bg-accent text-white text-[10px] font-semibold flex items-center justify-center">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  )
}
