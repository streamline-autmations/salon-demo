import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { SITE } from '../config/site'

type Step = 1 | 2 | 3 | 4

const DELIVERY_OPTIONS = [
  { id: 'collection', label: 'Collection', desc: 'Free · Pick up in-store', price: 0 },
  { id: 'delivery',   label: 'Delivery',   desc: 'R80 · 3–5 business days',  price: 80 },
]

const PAYMENT_OPTIONS = [
  { id: 'eft',        label: 'EFT / Bank Transfer', icon: '🏦' },
  { id: 'zapper',     label: 'Zapper',               icon: '⚡' },
  { id: 'snapscan',   label: 'SnapScan',             icon: '📲' },
  { id: 'yoco',       label: 'Yoco',                 icon: '💳' },
  { id: 'cash',       label: 'Cash on Collection',   icon: '💵' },
]

const stepLabels = ['Review', 'Details', 'Payment', 'Confirm']

export default function Checkout() {
  const { cart, cartTotal, changeQty, removeItem, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep]       = useState<Step>(1)
  const [delivery, setDelivery] = useState('collection')
  const [payment, setPayment]   = useState('eft')
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', notes: '',
  })

  const deliveryFee  = DELIVERY_OPTIONS.find(d => d.id === delivery)?.price ?? 0
  const orderTotal   = cartTotal + deliveryFee
  const paymentLabel = PAYMENT_OPTIONS.find(p => p.id === payment)?.label ?? ''

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  function sendWhatsApp() {
    let msg = `Hi ${SITE.business.name}! I'd like to place an order.\n\n`
    msg += `*ORDER DETAILS*\n`
    cart.forEach(item => {
      msg += `• ${item.name} × ${item.qty}  —  R${(item.price * item.qty).toLocaleString()}\n`
    })
    msg += `\nDelivery: ${DELIVERY_OPTIONS.find(d => d.id === delivery)?.label}${deliveryFee > 0 ? ` (+R${deliveryFee})` : ' (free)'}`
    msg += `\nPayment: ${paymentLabel}`
    msg += `\nTotal: *R${orderTotal.toFixed(2)}*`
    if (form.name)    msg += `\n\n*MY DETAILS*\nName: ${form.name}`
    if (form.phone)   msg += `\nPhone: ${form.phone}`
    if (form.email)   msg += `\nEmail: ${form.email}`
    if (delivery === 'delivery' && form.address) msg += `\nAddress: ${form.address}, ${form.city}`
    if (form.notes)   msg += `\nNotes: ${form.notes}`
    window.open(`https://wa.me/${SITE.business.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
    clearCart()
    setStep(4)
  }

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center text-center px-6">
        <div>
          <p className="font-display text-5xl font-light text-ink mb-4">Your cart is empty</p>
          <p className="text-muted text-sm mb-8">Add some products before checking out.</p>
          <Link to="/shop" className="lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300">
            Browse the Shop
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-warm"
    >
      {/* Header */}
      <div className="bg-surface border-b border-stone">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-light text-ink tracking-wide">
            Noir Studio
          </Link>
          {step < 4 && (
            <button onClick={() => navigate(-1)} className="lbl text-muted hover:text-ink transition-colors">
              ← Back
            </button>
          )}
        </div>
      </div>

      {/* Step indicator */}
      {step < 4 && (
        <div className="bg-surface border-b border-stone">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4">
            <div className="flex items-center gap-0">
              {stepLabels.map((label, i) => {
                const n = (i + 1) as Step
                const active = n === step
                const done   = n < step
                return (
                  <div key={label} className="flex items-center">
                    <div className={`flex items-center gap-2 ${done ? 'cursor-pointer' : ''}`}
                      onClick={() => done ? setStep(n) : undefined}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center lbl text-[10px] transition-all duration-300 ${
                        done   ? 'bg-accent text-white' :
                        active ? 'bg-ink text-white' :
                                 'bg-stone text-muted'
                      }`}>
                        {done ? '✓' : n}
                      </div>
                      <span className={`lbl hidden sm:block ${active ? 'text-ink' : done ? 'text-accent' : 'text-muted/50'}`}>
                        {label}
                      </span>
                    </div>
                    {i < 3 && <div className="w-8 sm:w-14 h-px bg-stone mx-2" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: CART REVIEW ── */}
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="font-display text-4xl font-light text-ink mb-10">Review Your Cart</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-surface rounded-sm p-4 border border-stone">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-sm bg-stone shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-ink leading-snug mb-1">{item.name}</p>
                        <p className="lbl text-accent mb-3">R{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-stone rounded-full">
                            <button onClick={() => changeQty(item.id, -1)}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink transition-colors">
                              −
                            </button>
                            <span className="lbl text-ink w-6 text-center text-xs">{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)}
                              className="w-7 h-7 flex items-center justify-center text-muted hover:text-ink transition-colors">
                              +
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)}
                            className="lbl text-muted/40 hover:text-rose-400 transition-colors text-[10px]">
                            Remove
                          </button>
                          <span className="ml-auto font-display text-lg font-light text-ink">
                            R{(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="bg-surface border border-stone rounded-sm p-6 h-fit space-y-4">
                  <p className="font-display text-xl font-light text-ink mb-4">Order Summary</p>
                  <div className="flex justify-between lbl text-muted">
                    <span>Subtotal</span>
                    <span>R{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between lbl text-muted">
                    <span>Delivery</span>
                    <span className="text-ink/40">Calculated next</span>
                  </div>
                  <div className="pt-4 border-t border-stone flex justify-between">
                    <span className="font-display text-xl font-light text-ink">Total</span>
                    <span className="font-display text-2xl font-light text-ink">R{cartTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3.5 bg-accent text-white lbl rounded-full hover:bg-accent-dark hover:scale-[1.01] transition-all duration-300"
                  >
                    Continue to Details →
                  </button>
                  <Link to="/shop" className="block text-center lbl text-muted hover:text-ink transition-colors text-[11px] pt-1">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: DELIVERY DETAILS ── */}
          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="font-display text-4xl font-light text-ink mb-10">Your Details</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { key: 'name',  label: 'Full Name *',      type: 'text',  placeholder: 'Thandi Mokoena',       required: true  },
                      { key: 'email', label: 'Email Address',    type: 'email', placeholder: 'hello@example.com',    required: false },
                      { key: 'phone', label: 'WhatsApp Number *', type: 'tel',   placeholder: '082 000 0000',          required: true  },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="lbl text-muted/60 block mb-2 text-[11px]">{f.label}</label>
                        <input
                          type={f.type}
                          required={f.required}
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={set(f.key)}
                          className="w-full bg-transparent border-b border-stone py-3 text-ink text-[14px] font-light placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Delivery method */}
                  <div>
                    <p className="lbl text-muted/60 mb-4 text-[11px]">Delivery Method *</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DELIVERY_OPTIONS.map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDelivery(opt.id)}
                          className={`flex items-center gap-4 p-4 rounded-sm border text-left transition-all duration-200 ${
                            delivery === opt.id
                              ? 'border-accent bg-accent/5'
                              : 'border-stone hover:border-muted'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                            delivery === opt.id ? 'border-accent bg-accent' : 'border-stone'
                          }`} />
                          <div>
                            <p className="lbl text-ink">{opt.label}</p>
                            <p className="text-[11px] text-muted font-light mt-0.5">{opt.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address — only if delivery */}
                  <AnimatePresence>
                    {delivery === 'delivery' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-6"
                      >
                        <div className="sm:col-span-2">
                          <label className="lbl text-muted/60 block mb-2 text-[11px]">Street Address *</label>
                          <input
                            type="text" placeholder="123 Main Road"
                            value={form.address} onChange={set('address')}
                            className="w-full bg-transparent border-b border-stone py-3 text-ink text-[14px] font-light placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300"
                          />
                        </div>
                        <div>
                          <label className="lbl text-muted/60 block mb-2 text-[11px]">City / Town *</label>
                          <input
                            type="text" placeholder="Vanderbijlpark"
                            value={form.city} onChange={set('city')}
                            className="w-full bg-transparent border-b border-stone py-3 text-ink text-[14px] font-light placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Notes */}
                  <div>
                    <label className="lbl text-muted/60 block mb-2 text-[11px]">Order Notes (optional)</label>
                    <textarea
                      rows={3} placeholder="Any special instructions..."
                      value={form.notes} onChange={set('notes')}
                      className="w-full bg-transparent border-b border-stone py-3 text-ink text-[14px] font-light placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Mini summary */}
                <div className="bg-surface border border-stone rounded-sm p-6 h-fit space-y-3">
                  <p className="font-display text-xl font-light text-ink mb-4">Order Summary</p>
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="flex justify-between lbl text-muted text-[11px]">
                      <span className="truncate max-w-[140px]">{item.name} ×{item.qty}</span>
                      <span>R{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <p className="lbl text-muted/40 text-[10px]">+ {cart.length - 3} more items</p>
                  )}
                  <div className="pt-3 border-t border-stone space-y-1.5">
                    <div className="flex justify-between lbl text-muted text-[11px]">
                      <span>Delivery</span>
                      <span>{deliveryFee === 0 ? 'Free' : `R${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-display text-lg font-light text-ink">Total</span>
                      <span className="font-display text-xl font-light text-ink">R{orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => form.name && form.phone ? setStep(3) : alert('Please fill in your name and phone number.')}
                    className="w-full py-3.5 bg-accent text-white lbl rounded-full hover:bg-accent-dark transition-all duration-300 mt-2"
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: PAYMENT ── */}
          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              <h1 className="font-display text-4xl font-light text-ink mb-10">Payment Method</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-3">
                  {PAYMENT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt.id)}
                      className={`w-full flex items-center gap-4 p-5 rounded-sm border text-left transition-all duration-200 ${
                        payment === opt.id
                          ? 'border-accent bg-accent/5'
                          : 'border-stone hover:border-muted bg-surface'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 shrink-0 transition-colors ${
                        payment === opt.id ? 'border-accent bg-accent' : 'border-stone'
                      }`} />
                      <span className="text-xl">{opt.icon}</span>
                      <div>
                        <p className="lbl text-ink">{opt.label}</p>
                        {opt.id === 'eft' && (
                          <p className="text-[11px] text-muted font-light mt-0.5">We'll send banking details via WhatsApp</p>
                        )}
                        {opt.id === 'cash' && (
                          <p className="text-[11px] text-muted font-light mt-0.5">Pay when you collect from the salon</p>
                        )}
                      </div>
                      {payment === opt.id && (
                        <span className="ml-auto lbl text-accent text-[10px]">Selected</span>
                      )}
                    </button>
                  ))}

                  <div className="mt-6 p-4 bg-surface border border-stone rounded-sm">
                    <p className="lbl text-muted text-[11px] leading-relaxed">
                      Clicking "Send Order via WhatsApp" will open WhatsApp with your full order details. We'll confirm availability and send payment instructions within a few hours.
                    </p>
                  </div>
                </div>

                {/* Final summary */}
                <div className="bg-surface border border-stone rounded-sm p-6 h-fit space-y-3">
                  <p className="font-display text-xl font-light text-ink mb-4">Order Summary</p>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between lbl text-muted text-[11px]">
                      <span className="truncate max-w-[140px]">{item.name} ×{item.qty}</span>
                      <span>R{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-stone space-y-1.5">
                    <div className="flex justify-between lbl text-muted text-[11px]">
                      <span>Delivery ({DELIVERY_OPTIONS.find(d => d.id === delivery)?.label})</span>
                      <span>{deliveryFee === 0 ? 'Free' : `R${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between lbl text-muted text-[11px]">
                      <span>Payment</span>
                      <span>{paymentLabel}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone">
                      <span className="font-display text-lg font-light text-ink">Total</span>
                      <span className="font-display text-2xl font-light text-ink">R{orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={sendWhatsApp}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white lbl rounded-full hover:bg-[#1fba5a] transition-all duration-300 mt-2"
                  >
                    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Order via WhatsApp
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full text-center lbl text-muted hover:text-ink transition-colors text-[11px] pt-1"
                  >
                    ← Edit Details
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: CONFIRMATION ── */}
          {step === 4 && (
            <motion.div key="step4"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-[60vh] flex items-center justify-center"
            >
              <div className="max-w-md text-center">
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-[#25D366]/15 flex items-center justify-center mx-auto mb-8"
                >
                  <svg width="32" height="32" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </motion.div>
                <p className="lbl text-accent mb-4">Order Sent</p>
                <h2 className="font-display text-4xl font-light text-ink mb-5">Thank you!</h2>
                <p className="text-muted text-[15px] font-light leading-relaxed mb-8">
                  Your order has been sent to Noir Studio via WhatsApp. We'll confirm availability and payment details within a few hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/shop"
                    className="lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/"
                    className="lbl px-7 py-3 border border-stone text-muted hover:text-ink hover:border-muted rounded-full transition-all duration-300"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
