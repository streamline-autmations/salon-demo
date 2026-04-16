import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE, SALON_IMAGES } from '../config/site'
import PageHeader from '../components/PageHeader'

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`

const waLink = `https://wa.me/${SITE.business.whatsapp}`

const steps = [
  { n: '01', title: 'Consultation',  desc: 'Every visit starts with a proper conversation. We talk about your hair history, goals, lifestyle and what "good hair" means to you.' },
  { n: '02', title: 'The Treatment', desc: 'Once we\'re aligned, we get to work — methodically, carefully, with no shortcuts. We use only professional-grade products.' },
  { n: '03', title: 'The Finish',    desc: 'Every service ends with a full blowout and style, plus advice on how to maintain your results at home.' },
]

export default function Services() {
  const [open, setOpen] = useState<number | null>(1)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="What We Offer"
        title="Our Services"
        subtitle="Every service is a conversation. We study your hair before we touch it — and we finish when it's right."
        image={U(SALON_IMAGES.services, 1920, 600)}
      />

      {/* ── VIDEO PLACEHOLDER ── */}
      <section className="bg-ink relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 md:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <p className="lbl text-accent mb-5">The Craft</p>
            <h2 className="font-display font-light text-white leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 3.8vw, 44px)' }}>
              Hair is personal.<br /><em>We treat it that way.</em>
            </h2>
            <p className="text-white/50 text-[15px] font-light leading-relaxed">
              Eight years of refining our technique. Every cut is considered, every colour is crafted, every treatment is personalised — because your hair deserves nothing less.
            </p>
          </motion.div>

          {/* Video placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="relative aspect-video bg-white/5 rounded-sm overflow-hidden border border-white/10 flex items-center justify-center group cursor-pointer"
          >
            <img
              src={U(SALON_IMAGES.videoStill, 800, 450)}
              alt="Noir Studio in action"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
            />
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/15 border border-white/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                <svg width="20" height="20" fill="white" viewBox="0 0 24 24" className="ml-1">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>
              <p className="lbl text-white/60">Watch us work</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE ACCORDION ── */}
      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

            {/* Sticky label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start"
            >
              <p className="lbl text-accent mb-5">Our Menu</p>
              <h2 className="font-display font-light text-ink leading-tight mb-6" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 44px)' }}>
                Six services.<br />All done right.
              </h2>
              <p className="text-muted text-[14px] font-light leading-relaxed mb-9">
                From a clean cut to a full transformation — every service is built around you. Click any service to see what's included.
              </p>
              <a
                href={waLink} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.02]"
              >
                Book via WhatsApp
              </a>
            </motion.div>

            {/* Accordion */}
            <div className="lg:col-span-3 divide-y divide-stone">
              {SITE.services.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                >
                  <button
                    onClick={() => setOpen(open === s.id ? null : s.id)}
                    className="w-full flex items-center justify-between py-7 text-left group"
                  >
                    <div className="flex items-center gap-5">
                      <span className="font-display text-2xl font-light text-stone group-hover:text-accent/30 transition-colors duration-300 w-10 shrink-0">
                        {s.num}
                      </span>
                      <div>
                        <h3 className="font-display text-xl md:text-2xl font-light text-ink group-hover:text-accent transition-colors duration-300">
                          {s.name}
                        </h3>
                        <p className="lbl text-muted/50 mt-1">{s.price} · {s.duration}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: open === s.id ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-8 h-8 rounded-full border border-stone flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-colors duration-300 shrink-0"
                    >
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === s.id && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-14 pr-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="sm:col-span-2">
                            <p className="text-muted text-[14px] font-light leading-relaxed">{s.description}</p>
                          </div>
                          <img
                            src={U(['1522337360788-8b13dee7a37e','1560869713-7d0a29430803','1519699047748-de8e457a634e','1595152772835-6e75b60e9a2c','1503951914875-452162b0f3f1','1527799820374-dcf8d9d4a388'][s.id - 1], 500, 340)}
                            alt={s.name}
                            className="w-full h-40 object-cover rounded-sm"
                            loading="lazy"
                          />
                          <div className="flex flex-col justify-between">
                            <div className="space-y-2">
                              <p className="lbl text-muted/50 text-[10px]">Duration</p>
                              <p className="lbl text-ink">{s.duration}</p>
                              <div className="pt-3">
                                <p className="lbl text-muted/50 text-[10px]">Starting from</p>
                                <p className="font-display text-3xl font-light text-accent mt-1">{s.price}</p>
                              </div>
                            </div>
                            <a
                              href={`${waLink}?text=${encodeURIComponent(`Hi Noir Studio! I'd like to book a ${s.name}.`)}`}
                              target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-2 lbl text-accent hover:text-accent-dark transition-colors mt-5"
                            >
                              Book This Service →
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-36 bg-surface">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="lbl text-accent mb-4">The Process</p>
            <h2 className="font-display font-light text-ink leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 48px)' }}>
              How a visit works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                className="bg-surface p-10 md:p-12"
              >
                <p className="font-display text-6xl font-light text-ink/8 mb-6">{step.n}</p>
                <h3 className="font-display text-2xl font-light text-ink mb-3">{step.title}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NOTE ── */}
      <section className="py-20 bg-ink">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="lbl text-accent mb-5">A note on pricing</p>
            <p className="text-white/50 text-[15px] font-light leading-relaxed max-w-xl mx-auto mb-8">
              Prices listed are starting rates. Your final quote depends on hair length, condition, and complexity — we'll always confirm before we begin. No surprises.
            </p>
            <a
              href={waLink} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.03]"
            >
              Book a Consultation
            </a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
