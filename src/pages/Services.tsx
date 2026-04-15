import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../config/site'
import PageHeader from '../components/PageHeader'

const waLink = `https://wa.me/${SITE.business.whatsapp}`

const steps = [
  { n: '01', title: 'Consultation',  desc: 'Every visit starts with a proper conversation. We talk about your hair history, goals, lifestyle and what "good hair" means to you.' },
  { n: '02', title: 'The Treatment', desc: 'Once we\'re aligned, we get to work — methodically, carefully, with no shortcuts. We use only professional-grade products.' },
  { n: '03', title: 'The Finish',    desc: 'Every service ends with a full blowout and style, plus advice on how to maintain your results at home.' },
]

export default function Services() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="What We Offer"
        title="Our Services"
        subtitle="Every service is a conversation. We study your hair before we touch it — and we finish when it's right."
        image="https://picsum.photos/1920/600?random=60"
      />

      {/* ── SERVICE CARDS ── */}
      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stone">
            {SITE.services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.1 }}
                className="bg-warm p-9 md:p-11 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-[72px] font-light leading-none text-stone group-hover:text-accent/20 transition-colors">{s.num}</span>
                  <span className="lbl text-accent mt-3">{s.price}</span>
                </div>
                <h3 className="font-display text-2xl md:text-[27px] font-light text-ink mb-3">{s.name}</h3>
                <p className="text-muted text-sm font-light leading-relaxed mb-6">{s.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-stone">
                  <span className="lbl text-muted/60">{s.duration}</span>
                  <a
                    href={`${waLink}?text=${encodeURIComponent(`Hi Noir Studio! I'd like to book a ${s.name}.`)}`}
                    target="_blank" rel="noreferrer"
                    className="lbl text-muted hover:text-accent transition-colors"
                  >
                    Book This →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-36 bg-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="lbl text-accent mb-4">The Process</p>
            <h2 className="font-display font-light text-white leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 48px)' }}>
              How a visit works
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <p className="font-display text-6xl font-light text-white/10 mb-5">{step.n}</p>
                <h3 className="font-display text-2xl font-light text-white mb-3">{step.title}</h3>
                <p className="text-white/45 text-sm font-light leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING NOTE ── */}
      <section className="py-20 bg-surface">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="lbl text-accent mb-5">A note on pricing</p>
            <p className="text-muted text-[15px] font-light leading-relaxed max-w-xl mx-auto mb-8">
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
