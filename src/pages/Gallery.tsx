import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '../config/site'
import type { GalleryItem } from '../config/site'
import PageHeader from '../components/PageHeader'

const cats = ['All', 'Colour', 'Cuts', 'Bridal', 'Treatments']

export default function Gallery() {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const [cat, setCat]       = useState('All')

  const filtered = cat === 'All' ? SITE.gallery : SITE.gallery.filter(g => g.category === cat)

  // Close lightbox on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="Our Work"
        title="Gallery"
        subtitle="A curated look at some of our favourite transformations."
        image="https://picsum.photos/1920/600?random=61"
      />

      {/* ── FILTER + GRID ── */}
      <section className="py-20 md:py-28 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* Underline tab filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-0 border-b border-stone mb-12 overflow-x-auto"
          >
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`lbl px-5 py-4 border-b-2 -mb-px whitespace-nowrap transition-all duration-200 ${
                  cat === c
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </motion.div>

          {/* Uniform 3-col grid */}
          <motion.div
            key={cat}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: Math.min(i * 0.06, 0.35) }}
                onClick={() => setActive(img)}
                className="aspect-square overflow-hidden rounded-sm cursor-pointer group relative bg-stone"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-600"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/35 transition-colors duration-300 flex items-end p-4">
                  <span className="lbl text-white/0 group-hover:text-white/80 transition-all duration-300 bg-black/40 px-2.5 py-1 rounded-full text-[10px]">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ── */}
      <section className="py-20 bg-ink">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="lbl text-accent mb-5">Follow Along</p>
            <p className="font-display font-light text-white text-3xl md:text-4xl mb-7"><em>@noirstudioza</em></p>
            <a
              href={SITE.business.instagram} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 lbl px-7 py-3 border border-white/25 text-white rounded-full hover:border-accent hover:text-accent transition-all duration-300"
            >
              <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Follow on Instagram
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[80] bg-black/92 flex items-center justify-center p-4 md:p-12"
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
              className="relative max-h-[90vh]"
            >
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-sm"
              />
              <div className="flex items-center justify-between mt-4">
                <p className="lbl text-white/40">{active.alt}</p>
                <span className="lbl text-white/30 bg-white/10 px-3 py-1 rounded-full">{active.category}</span>
              </div>
              <button
                onClick={() => setActive(null)}
                className="absolute -top-3 -right-3 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
