import { useState } from 'react'

export default function CheckoutModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    city: '',
    address: '',
    pinCode: ''
  })
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate address character count (minimum 8 characters)
    if (formData.address.trim().length < 8) {
      setError('Address must be at least 8 characters long.')
      return
    }

    setError('')
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[500] flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-[scaleUp_0.3s_ease-out]">
        <div className="p-6 border-b border-border-main flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-serif font-bold text-text-main">Shipping Details</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text-main transition-colors">
            <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-2 fill-none"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted">City</label>
            <input
              required
              type="text"
              placeholder="e.g. Mumbai"
              className="w-full px-4 py-3 rounded-xl border-2 border-border-main focus:border-accent focus:outline-none transition-all"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Full Address (Min 8 characters)</label>
            <textarea
              required
              rows="4"
              placeholder="e.g. Flat No 402, Building Name"
              className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${error ? 'border-red-400 focus:border-red-500' : 'border-border-main focus:border-accent'}`}
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value })
                if (error) setError('')
              }}
            />
            {error && <p className="text-red-500 text-xs mt-1 font-medium italic">{error}</p>}
            <p className="text-[10px] text-text-muted mt-1 uppercase tracking-tighter">
              Current length: <span className={formData.address.trim().length < 8 ? 'text-orange-500 font-bold' : 'text-green-600 font-bold'}>
                {formData.address.trim().length}
              </span> / 8
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-text-muted">Pin Code</label>
            <input
              required
              type="text"
              pattern="[0-9]{6}"
              placeholder="e.g. 400001"
              className="w-full px-4 py-3 rounded-xl border-2 border-border-main focus:border-accent focus:outline-none transition-all"
              value={formData.pinCode}
              onChange={(e) => setFormData({ ...formData, pinCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent text-white py-4 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-accent-dark transition-all transform active:scale-95 shadow-lg shadow-accent/20 mt-4"
          >
            Confirm & Proceed
          </button>
        </form>
      </div>
    </div>
  )
}
