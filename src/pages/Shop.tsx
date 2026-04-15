import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../config/site'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'

const cats = ['All', 'Treatments', 'Shampoo & Care', 'Styling']

export default function Shop() {
  const [cat, setCat] = useState('All')
  const { cartCount, openCart } = useCart()

  const filtered = cat === 'All' ? SITE.products : SITE.products.filter(p => p.category === cat)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="The Salon Shop"
        title="Professional products,<br /><em>at home.</em>"
        subtitle="The same brands we use in the salon — available for you to take home."
        image="https://picsum.photos/1920/600?random=62"
      />

      {/* ── INFO STRIP ── */}
      <div className="bg-surface border-b border-stone">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-6">
            {[
              ['Delivery nationwide', '🚚'],
              ['Free collection in-store', '🏪'],
              ['Order via WhatsApp', '💬'],
            ].map(([t, e]) => (
              <span key={t} className="lbl text-muted">{e} {t}</span>
            ))}
          </div>
          <button onClick={openCart} className="lbl text-accent hover:text-accent-dark transition-colors">
            Cart ({cartCount})
          </button>
        </div>
      </div>

      {/* ── PRODUCTS ── */}
      <section className="py-20 md:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Filter + count */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {cats.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`lbl px-5 py-2 rounded-full border transition-all duration-250 ${
                    cat === c
                      ? 'bg-accent border-accent text-white'
                      : 'border-stone text-muted hover:border-accent hover:text-accent'
                  }`}
                >
                  {c}
                </button>
              ))}
            </motion.div>
            <p className="lbl text-muted">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          </div>

          {/* Grid */}
          <motion.div
            key={cat}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHATSAPP ORDER INFO ── */}
      <section className="py-20 bg-ink">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="lbl text-accent mb-5">How ordering works</p>
            <p className="font-display font-light text-white text-2xl md:text-3xl mb-7">
              <em>Simple, personal, fast.</em>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-10">
              {[
                ['01', 'Add to cart', 'Select the products you want and add them to your cart.'],
                ['02', 'Place via WhatsApp', 'Hit "Place Order" and your cart is sent directly to us as a WhatsApp message.'],
                ['03', 'We confirm', 'We confirm availability, sort payment, and arrange delivery or collection.'],
              ].map(([n, t, d]) => (
                <div key={n} className="bg-white/[0.04] rounded-sm p-6">
                  <p className="font-display text-4xl font-light text-white/15 mb-4">{n}</p>
                  <p className="lbl text-accent mb-2">{t}</p>
                  <p className="text-white/40 text-sm font-light leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
            <button
              onClick={openCart}
              className="inline-flex items-center gap-2 lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.02]"
            >
              View Cart ({cartCount})
            </button>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
