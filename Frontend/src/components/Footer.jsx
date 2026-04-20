import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 md:py-16 px-4 md:px-8 xl:px-12 pb-6" id="footer">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12">
        <div>
          <Link to="/" className="font-serif text-white text-[1.4rem] font-bold tracking-[2px]">JEUNE</Link>
          <p className="text-[0.85rem] mt-3 leading-[1.7] text-gray-400 max-w-[300px]">Premium fashion for the modern individual. Quality craftsmanship meets contemporary design.</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.8rem] font-semibold uppercase tracking-[1px] text-white mb-4">Shop</h4>
          <Link to="/shirts" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Shirts</Link>
          <Link to="/tshirts" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">T-Shirts</Link>
          <Link to="/jeans" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Jeans</Link>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">New Arrivals</a>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.8rem] font-semibold uppercase tracking-[1px] text-white mb-4">Company</h4>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">About Us</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Careers</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Press</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Blog</a>
        </div>
        <div className="flex flex-col">
          <h4 className="text-[0.8rem] font-semibold uppercase tracking-[1px] text-white mb-4">Support</h4>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Help Center</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Returns</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Shipping</a>
          <a href="#" className="block text-[0.85rem] text-gray-400 py-1 transition-colors hover:text-white">Contact</a>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto mt-10 pt-6 border-t border-gray-800 flex justify-between items-center text-[0.8rem] text-gray-500 flex-wrap gap-4">
        <span>© 2026 JEUNE. All rights reserved.</span>
        <span>Designed with ♥</span>
      </div>
    </footer>
  )
}
