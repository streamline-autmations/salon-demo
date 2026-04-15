import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SITE } from '../config/site'
import MarqueeStrip from '../components/MarqueeStrip'
import ProductCard from '../components/ProductCard'

const waLink = `https://wa.me/${SITE.business.whatsapp}`

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

function WaIcon() {
  return (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}

export default function Home() {
  const dragRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 900], [0, 130])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-ink">
        <motion.div style={{ y: imgY }} className="absolute inset-[-12%] will-change-transform">
          <img
            src={SITE.hero.image}
            alt=""
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/80" />

        <motion.div
          className="relative z-10 px-6 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } } }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="lbl text-white/45 mb-8 tracking-[0.28em]"
          >
            {SITE.hero.label}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.25, 0.46, 0.45, 0.94] } } }}
            className="font-display font-light text-white leading-[0.92] mb-7"
            style={{ fontSize: 'clamp(3.4rem, 10.5vw, 100px)' }}
          >
            {SITE.hero.line1}<br /><em>{SITE.hero.line2}</em>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="text-white/60 text-base md:text-[17px] max-w-xs mx-auto mb-10 font-light leading-relaxed"
          >
            {SITE.hero.subheadline}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}
            className="flex flex-col xs:flex-row gap-3 justify-center"
          >
            <a
              href={waLink} target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white lbl rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.03]"
            >
              <WaIcon /> {SITE.hero.cta1}
            </a>
            <Link
              to="/services"
              className="px-8 py-3.5 border border-white/28 text-white lbl rounded-full hover:bg-white/10 transition-all duration-300"
            >
              {SITE.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 border-t border-white/[0.08]"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-3 divide-x divide-white/[0.08]">
            {SITE.stats.map(s => (
              <div key={s.label} className="py-5 md:py-6 text-center">
                <p className="font-display text-2xl md:text-3xl font-light text-white">{s.value}</p>
                <p className="lbl text-white/30 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 scroll-bounce opacity-35 pointer-events-none">
          <svg width="17" height="27" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 17 27">
            <rect x="1" y="1" width="15" height="25" rx="7.5"/>
            <line x1="8.5" y1="6" x2="8.5" y2="12"/>
          </svg>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────── */}
      <MarqueeStrip />

      {/* ── SERVICES PREVIEW ─────────────────────── */}
      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14 md:mb-16">
            <motion.div {...fadeUp()}>
              <p className="lbl text-accent mb-4">Our Services</p>
              <h2 className="font-display font-light text-ink leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 52px)' }}>
                Crafted for you,<br /><em>every time.</em>
              </h2>
            </motion.div>
            <motion.div {...fadeUp(0.15)}>
              <Link to="/services" className="lbl text-muted hover:text-accent transition-colors pb-1 border-b border-stone hover:border-accent">
                All Services →
              </Link>
            </motion.div>
          </div>

          <div className="divide-y divide-stone border-t border-stone">
            {SITE.services.slice(0, 4).map((s, i) => (
              <motion.div key={s.id} {...fadeUp(i * 0.07)}>
                <Link
                  to="/services"
                  className="group py-6 md:py-7 grid grid-cols-[44px_1fr_20px] md:grid-cols-[56px_1fr_auto_20px] items-center gap-4 md:gap-8 hover:pl-1.5 transition-all duration-300 block"
                >
                  <span className="font-display text-[42px] md:text-5xl font-light leading-none text-stone/60 group-hover:text-accent/25 transition-colors">
                    {s.num}
                  </span>
                  <div>
                    <p className="font-display text-xl md:text-[22px] font-light text-ink group-hover:text-accent transition-colors">{s.name}</p>
                    <p className="text-muted text-sm font-light mt-0.5 hidden sm:block leading-snug">{s.short}</p>
                  </div>
                  <span className="lbl text-muted hidden md:block">{s.price}</span>
                  <svg className="text-stone/60 group-hover:text-accent transition-colors" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ────────────────────────── */}
      <section className="py-24 md:py-32 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 mb-10 md:mb-12">
          <div className="flex items-end justify-between">
            <motion.div {...fadeUp()}>
              <p className="lbl text-accent mb-4">Gallery</p>
              <h2 className="font-display font-light text-ink leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 52px)' }}>
                Our work speaks<br /><em>for itself.</em>
              </h2>
            </motion.div>
            <Link to="/gallery" className="lbl text-muted hover:text-accent transition-colors pb-1 border-b border-stone hover:border-accent hidden sm:block">
              View All →
            </Link>
          </div>
        </div>

        <div ref={dragRef} className="overflow-hidden pl-5 sm:pl-8 lg:pl-12">
          <motion.div
            drag="x"
            dragConstraints={dragRef}
            dragElastic={0.08}
            className="flex gap-3 cursor-grab active:cursor-grabbing select-none w-max pb-2"
          >
            {SITE.gallery.slice(0, 7).map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="shrink-0 overflow-hidden rounded-sm"
                style={{ width: i % 3 === 0 ? 250 : 200, height: 320 }}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover pointer-events-none"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.45 }}
                  draggable={false}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link to="/gallery" className="lbl text-accent border-b border-accent/30 pb-1">View All →</Link>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ────────────────────────── */}
      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="overflow-hidden rounded-sm"
            >
              <img
                src="https://picsum.photos/700/840?random=55"
                alt="About Noir Studio"
                className="w-full h-[420px] lg:h-[580px] object-cover hover:scale-[1.025] transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12 }}
            >
              <p className="lbl text-accent mb-6">Our Story</p>
              <h2 className="font-display font-light text-ink leading-tight mb-7" style={{ fontSize: 'clamp(2.2rem, 4vw, 46px)' }}>
                More than a salon.<br /><em>A sanctuary.</em>
              </h2>
              <div className="space-y-4 text-muted text-[15px] leading-relaxed font-light max-w-md">
                <p>Noir Studio was founded in 2016 by Adéle Möller after nearly a decade working in Cape Town's most prestigious salons. She returned to the Vaal with one vision: to bring genuine craftsmanship home.</p>
                <p>We don't chase trends. We study your hair — its texture, history and potential — and build something that genuinely suits you.</p>
              </div>
              <div className="mt-11 grid grid-cols-3 gap-4 pt-10 border-t border-stone">
                {SITE.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-display text-4xl md:text-5xl font-light text-ink">{s.value}</p>
                    <p className="lbl text-muted mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link to="/about" className="mt-10 inline-flex lbl text-accent pb-1 border-b border-accent/30 hover:border-accent transition-colors">
                Our Full Story →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────── */}
      <section className="py-24 md:py-36 bg-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="lbl text-accent mb-4">What Clients Say</p>
            <h2 className="font-display font-light text-white leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 52px)' }}>
              Real results.<br /><em>Real people.</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {SITE.testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
                className="bg-[#1b1916] rounded-sm p-7 md:p-8 flex flex-col"
              >
                <div className="flex gap-0.5 mb-6">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <svg key={j} width="12" height="12" fill="#b8935a" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-white/50 text-[14.5px] font-light leading-relaxed flex-1 mb-7">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                    <span className="font-display text-accent text-lg font-light">{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="lbl text-white/65">{t.name}</p>
                    <p className="lbl text-white/28">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SHOP TEASER ──────────────────────────── */}
      <section className="py-24 md:py-36 bg-surface">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <motion.div {...fadeUp()}>
              <p className="lbl text-accent mb-4">The Salon Shop</p>
              <h2 className="font-display font-light text-ink leading-tight" style={{ fontSize: 'clamp(2.4rem, 5vw, 52px)' }}>
                Professional products,<br /><em>at home.</em>
              </h2>
            </motion.div>
            <Link to="/shop" className="lbl text-muted hover:text-accent transition-colors pb-1 border-b border-stone hover:border-accent hidden sm:block">
              Visit Shop →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {SITE.products.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.65, delay: i * 0.09 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link to="/shop" className="lbl text-accent border-b border-accent/30 pb-1">Visit Shop →</Link>
          </div>
        </div>
      </section>

      {/* ── BOOK CTA ─────────────────────────────── */}
      <section className="py-32 md:py-48 bg-warm relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-display font-light text-stone/35 leading-none" style={{ fontSize: 'clamp(14rem, 38vw, 32rem)' }}>N</span>
        </div>
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.85 }}
          >
            <p className="lbl text-accent mb-7">Book Your Visit</p>
            <h2 className="font-display font-light text-ink leading-tight mb-8" style={{ fontSize: 'clamp(2.8rem, 6vw, 66px)' }}>
              Ready for your<br /><em>best hair?</em>
            </h2>
            <p className="text-muted text-[15px] mb-10 font-light max-w-[260px] mx-auto leading-relaxed">
              Drop us a WhatsApp and we'll confirm your slot within the hour.
            </p>
            <a
              href={waLink} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-9 py-4 bg-[#25D366] text-white lbl rounded-full hover:bg-[#1fba5a] transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#25D366]/20"
            >
              <WaIcon /> Book on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
