import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/site'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

type Tab = 'desc' | 'benefits' | 'how'

export default function ProductDetail() {
  const { id } = useParams()
  const product = SITE.products.find(p => p.id === Number(id))
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('desc')
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-warm flex items-center justify-center text-center px-6">
        <div>
          <p className="font-display text-7xl font-light text-ink/10 mb-4">404</p>
          <p className="font-display text-2xl font-light text-ink mb-3">Product not found</p>
          <p className="text-muted text-sm mb-8">That product may have been removed or the link is incorrect.</p>
          <Link to="/shop" className="lbl text-accent hover:underline">← Back to Shop</Link>
        </div>
      </div>
    )
  }

  const related = SITE.products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const hasSale = product.originalPrice > 0

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product!)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  function handleBuyNow() {
    for (let i = 0; i < qty; i++) addToCart(product!)
    navigate('/checkout')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-stone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4">
          <nav className="flex items-center gap-2 text-[11px] tracking-widest uppercase font-medium text-muted/50">
            <Link to="/shop" className="hover:text-accent transition-colors duration-200">Shop</Link>
            <span className="text-muted/30">/</span>
            <span>{product.category}</span>
            <span className="text-muted/30">/</span>
            <span className="text-ink truncate max-w-[180px] sm:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── PRODUCT ── */}
      <section className="py-16 md:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* ── IMAGE ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
              className="sticky top-24"
            >
              <div className="relative aspect-square overflow-hidden rounded-sm bg-stone">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full text-white ${
                    product.badge === 'Sale'        ? 'bg-rose-500' :
                    product.badge === 'New'         ? 'bg-accent'   :
                    product.badge === 'Best Seller' ? 'bg-ink/80'   : 'bg-stone'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
            </motion.div>

            {/* ── INFO ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              <p className="lbl text-accent mb-2">{product.brand}</p>
              <h1
                className="font-display font-light text-ink leading-tight mb-2"
                style={{ fontSize: 'clamp(1.9rem, 3.2vw, 40px)' }}
              >
                {product.name}
              </h1>
              <p className="lbl text-muted/50 mb-7">{product.size}</p>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-7">
                <span className="font-display text-5xl font-light text-ink">
                  R{product.price.toLocaleString()}
                </span>
                {hasSale && (
                  <>
                    <span className="lbl text-muted/50 line-through">
                      R{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="lbl text-rose-500">
                      Save R{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted text-[14px] font-light leading-relaxed pb-8 mb-8 border-b border-stone">
                {product.description}
              </p>

              {/* Qty + Add */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center border border-stone rounded-full">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors text-lg"
                  >
                    −
                  </button>
                  <span className="lbl text-ink w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors text-lg"
                  >
                    +
                  </button>
                </div>

                <motion.button
                  onClick={handleAdd}
                  whileTap={{ scale: 0.97 }}
                  className={`flex-1 h-10 rounded-full lbl text-sm transition-all duration-300 ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-accent text-white hover:bg-accent-dark hover:scale-[1.01]'
                  }`}
                >
                  {added ? '✓  Added to Cart' : 'Add to Cart'}
                </motion.button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full h-10 rounded-full lbl text-sm border border-ink text-ink hover:bg-ink hover:text-white transition-all duration-300"
              >
                Buy Now
              </button>

              {/* Trust signals */}
              <div className="mt-9 pt-8 border-t border-stone grid grid-cols-2 gap-3">
                {[
                  ['🏪', 'Free in-store collection'],
                  ['🚚', 'Delivery nationwide'],
                  ['✓', 'Salon-grade formula'],
                  ['💬', 'Order via WhatsApp'],
                ].map(([icon, label]) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="text-sm">{icon}</span>
                    <span className="text-[11px] tracking-wider uppercase font-medium text-muted/60">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── TABS ── */}
          <div className="mt-24 max-w-3xl">
            <div className="flex border-b border-stone mb-10 gap-1">
              {([
                { key: 'desc',     label: 'Description'  },
                { key: 'benefits', label: 'Benefits'     },
                { key: 'how',      label: 'How to Use'   },
              ] as { key: Tab; label: string }[]).map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`lbl px-5 py-4 border-b-2 -mb-px transition-all duration-200 ${
                    tab === t.key
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {tab === 'desc' && (
                  <p className="text-muted text-[15px] font-light leading-relaxed">
                    {product.description}
                  </p>
                )}
                {tab === 'benefits' && (
                  <ul className="space-y-4">
                    {product.benefits.map(b => (
                      <li key={b} className="flex items-start gap-3 text-muted text-[15px] font-light">
                        <span className="text-accent shrink-0 mt-0.5">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {tab === 'how' && (
                  <p className="text-muted text-[15px] font-light leading-relaxed">
                    {product.howToUse}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="mb-10"
            >
              <p className="lbl text-accent mb-3">You might also like</p>
              <h2 className="font-display text-3xl font-light text-ink">
                More from <em>{product.category}</em>
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  )
}
