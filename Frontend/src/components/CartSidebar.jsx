export default function CartSidebar({ isOpen, onClose, cart, onUpdateQty, onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} id="cart-sidebar">
        <div className="cart-header">
          <h2>Your Cart ({cart.length})</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/></svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  {item.image ? <img src={item.image} alt={item.name} /> : '📦'}
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="cart-item-size">Size: {item.sizes[0]}</span>
                  <div className="cart-item-price">₹{(item.price * item.qty).toLocaleString()}</div>
                  <div className="cart-item-actions">
                    <button className="cart-qty-btn" onClick={() => onUpdateQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="cart-qty-btn" onClick={() => onUpdateQty(item.id, 1)}>+</button>
                    <button className="cart-item-remove" onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <button className="cart-checkout" id="checkout-btn">Checkout</button>
          </div>
        )}
      </aside>
    </>
  )
}
