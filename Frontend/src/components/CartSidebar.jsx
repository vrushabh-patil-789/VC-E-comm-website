export default function CartSidebar({ isOpen, onClose, cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-[200] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <aside className={`fixed top-0 right-0 bottom-0 w-[min(420px,90vw)] bg-white z-[201] transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} id="cart-sidebar">
        <div className="flex justify-between items-center p-6 border-b border-border-main">
          <h2 className="font-serif text-xl">Your Cart ({cart.length})</h2>
          <button className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100" onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-text-main stroke-2 fill-none"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-text-muted gap-4">
              <svg viewBox="0 0 24 24" className="w-16 h-16 opacity-30 stroke-current stroke-1 fill-none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="flex gap-4 py-4 border-b border-border-main" key={`${item.id}-${item.selectedSize}`}>
                <div className="w-20 h-[100px] rounded-md bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center text-[#ccc] text-[0.65rem]">
                  {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : '📦'}
                </div>
                <div className="flex-1">
                  <h4 className="text-[0.9rem] font-medium mb-1">{item.name}</h4>
                  <span className="text-[0.75rem] text-text-muted">Size: {item.selectedSize}</span>
                  <div className="font-semibold mt-2">₹{(item.price * item.qty).toLocaleString()}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="w-7 h-7 rounded-full border border-border-main flex items-center justify-center text-[0.9rem] transition-all hover:bg-accent hover:text-white hover:border-accent" onClick={() => onUpdateQty(item.id, item.selectedSize, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="w-7 h-7 rounded-full border border-border-main flex items-center justify-center text-[0.9rem] transition-all hover:bg-accent hover:text-white hover:border-accent" onClick={() => onUpdateQty(item.id, item.selectedSize, 1)}>+</button>
                    <button className="ml-auto text-[0.75rem] text-red-600 font-medium transition-opacity hover:opacity-70" onClick={() => onRemove(item.id, item.selectedSize)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-border-main">
            <div className="flex justify-between text-[1.1rem] font-semibold mb-4">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full p-4 rounded-full bg-accent text-white font-semibold text-[0.95rem] transition-all hover:-translate-y-[1px] shadow-sm hover:shadow-md" id="checkout-btn"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
