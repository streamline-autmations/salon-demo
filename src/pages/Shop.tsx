import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/site'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

const CATS   = ['All', 'Treatments', 'Shampoo & Care', 'Styling', 'Scalp Care', 'Tools']
const BRANDS = ['All Brands', 'Moroccanoil', 'Olaplex', 'Kérastase', 'Wella Professionals', 'Redken', 'Goldwell', 'Schwarzkopf Professional', 'Sebastian Professional', 'Bumble and Bumble', 'Nioxin', 'Aveda', 'Tangle Teezer', 'Denman']
const SORTS  = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest']

export default function Shop() {
  const [cat, setCat]     = useState('All')
  const [brand, setBrand] = useState('All Brands')
  const [sort, setSort]   = useState('Featured')
  const [mobileFilter, setMobileFilter] = useState(false)
  const { cartCount, openCart } = useCart()

  let filtered = SITE.products
    .filter(p => cat   === 'All'        || p.category === cat)
    .filter(p => brand === 'All Brands' || p.brand    === brand)

  if (sort === 'Price: Low to High')  filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'Price: High to Low')  filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'Newest')              filtered = [...filtered].filter(p => p.badge === 'New').concat(filtered.filter(p => p.badge !== 'New'))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="The Salon Shop"
        title="Professional products,<br /><em>at home.</em>"
        subtitle="The same brands we use in the salon — available for you to take home."
        image="https://images.unsplash.com/photo-1583922606661-5934e74c9a69?auto=format&fit=crop&w=1920&h=600&q=80"
      />

      {/* ── INFO STRIP ── */}
      <div className="bg-surface border-b border-stone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5">
            {[['🚚', 'Nationwide delivery'], ['🏪', 'Free collection'], ['💬', 'Order via WhatsApp']].map(([e, t]) => (
              <span key={t} className="lbl text-muted text-[11px]">{e} {t}</span>
            ))}
          </div>
          <button onClick={openCart} className="lbl text-accent hover:text-accent-dark transition-colors text-[11px]">
            View Cart ({cartCount})
          </button>
        </div>
      </div>

      <div className="bg-warm py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex gap-10 lg:gap-14">

            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="hidden lg:block w-52 shrink-0 pt-1">
              <div className="sticky top-24 space-y-9">

                {/* Category */}
                <div>
                  <p className="lbl text-muted/50 text-[10px] mb-4 tracking-widest uppercase">Category</p>
                  <ul className="space-y-1">
                    {CATS.map(c => (
                      <li key={c}>
                        <button
                          onClick={() => setCat(c)}
                          className={`w-full text-left lbl py-1.5 transition-colors duration-200 ${
                            cat === c ? 'text-accent' : 'text-muted hover:text-ink'
                          }`}
                        >
                          {c}
                          {cat === c && <span className="ml-2 text-accent">·</span>}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Brand */}
                <div>
                  <p className="lbl text-muted/50 text-[10px] mb-4 tracking-widest uppercase">Brand</p>
                  <ul className="space-y-1">
                    {BRANDS.map(b => (
                      <li key={b}>
                        <button
                          onClick={() => setBrand(b)}
                          className={`w-full text-left lbl py-1 text-[11px] transition-colors duration-200 ${
                            brand === b ? 'text-accent' : 'text-muted/70 hover:text-ink'
                          }`}
                        >
                          {b}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reset */}
                {(cat !== 'All' || brand !== 'All Brands') && (
                  <button
                    onClick={() => { setCat('All'); setBrand('All Brands') }}
                    className="lbl text-muted/50 hover:text-rose-400 transition-colors text-[10px]"
                  >
                    Clear filters ×
                  </button>
                )}
              </div>
            </aside>

            {/* ── MAIN ── */}
            <div className="flex-1 min-w-0">

              {/* Mobile filter + sort bar */}
              <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMobileFilter(v => !v)}
                    className="lg:hidden lbl px-4 py-2 border border-stone rounded-full text-muted hover:border-accent hover:text-accent transition-all duration-200 flex items-center gap-2"
                  >
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                    </svg>
                    Filters {(cat !== 'All' || brand !== 'All Brands') ? '•' : ''}
                  </button>
                  <p className="lbl text-muted/50 text-[11px]">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
                </div>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  className="lbl text-muted text-[11px] bg-transparent border border-stone rounded-full px-4 py-2 focus:outline-none focus:border-accent cursor-pointer"
                >
                  {SORTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Mobile filter panel */}
              <AnimatePresence>
                {mobileFilter && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                    className="overflow-hidden lg:hidden mb-8 bg-surface border border-stone rounded-sm p-6 grid grid-cols-2 gap-6"
                  >
                    <div>
                      <p className="lbl text-muted/50 text-[10px] mb-3 tracking-widest uppercase">Category</p>
                      <div className="space-y-1">
                        {CATS.map(c => (
                          <button key={c} onClick={() => { setCat(c); setMobileFilter(false) }}
                            className={`block w-full text-left lbl py-1 text-[12px] ${cat === c ? 'text-accent' : 'text-muted'}`}>
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="lbl text-muted/50 text-[10px] mb-3 tracking-widest uppercase">Brand</p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {BRANDS.map(b => (
                          <button key={b} onClick={() => { setBrand(b); setMobileFilter(false) }}
                            className={`block w-full text-left lbl py-1 text-[11px] ${brand === b ? 'text-accent' : 'text-muted'}`}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Product grid */}
              {filtered.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="font-display text-2xl font-light text-ink mb-3">No products found</p>
                  <button onClick={() => { setCat('All'); setBrand('All Brands') }}
                    className="lbl text-accent hover:underline">Clear filters</button>
                </div>
              ) : (
                <motion.div
                  key={`${cat}-${brand}-${sort}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
                >
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.4) }}
                    >
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-ink">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="lbl text-accent mb-5">How ordering works</p>
            <p className="font-display font-light text-white text-2xl md:text-3xl mb-10">
              <em>Simple, personal, fast.</em>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left mb-10">
              {[
                ['01', 'Add to cart', 'Select the products you want.'],
                ['02', 'Checkout',    'Fill in your details and choose a payment method.'],
                ['03', 'We confirm',  'We sort payment and arrange delivery or collection.'],
              ].map(([n, t, d]) => (
                <div key={n} className="bg-white/[0.04] rounded-sm p-6">
                  <p className="font-display text-4xl font-light text-white/10 mb-4">{n}</p>
                  <p className="lbl text-accent mb-2">{t}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
