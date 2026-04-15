import { motion } from 'framer-motion'
import { SITE } from '../config/site'
import PageHeader from '../components/PageHeader'

const waLink = `https://wa.me/${SITE.business.whatsapp}`

const values = [
  {
    title: 'Craftsmanship',
    desc: 'We take our time. Every cut, colour and treatment is done with the attention it deserves. We don\'t rush, and we don\'t compromise.',
    icon: '✂',
  },
  {
    title: 'Personalisation',
    desc: 'There\'s no one-size-fits-all here. Your hair is unique. Your treatment plan should be too — built around your specific needs and goals.',
    icon: '◈',
  },
  {
    title: 'Integrity',
    desc: 'We\'ll always tell you what your hair actually needs — not what costs more. Honest advice, fair pricing, and consistent results.',
    icon: '◇',
  },
]

const certs = ['Olaplex Certified Salon', 'Kérastase Authorised', 'Schwarzkopf Professional Partner', 'Moroccanoil Stockist', 'Kevin Murphy Stockist']

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="About Us"
        title="More than a salon.<br /><em>A sanctuary.</em>"
        subtitle="Vanderbijlpark's premier hair atelier, built on craft, honesty and a genuine love for the work."
        image="https://picsum.photos/1920/600?random=63"
      />

      {/* ── OWNER STORY ── */}
      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85 }}
              className="overflow-hidden rounded-sm"
            >
              <img
                src="https://picsum.photos/700/840?random=56"
                alt="Adéle Möller — Founder of Noir Studio"
                className="w-full h-[440px] lg:h-[600px] object-cover hover:scale-[1.02] transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12 }}
            >
              <p className="lbl text-accent mb-6">The Founder</p>
              <h2 className="font-display font-light text-ink leading-tight mb-7" style={{ fontSize: 'clamp(2rem, 3.8vw, 42px)' }}>
                Adéle Möller
              </h2>
              <div className="space-y-4 text-muted text-[15px] leading-relaxed font-light">
                <p>Adéle started cutting hair at 17 and never looked back. After completing her training in Johannesburg, she spent nine years working at some of Cape Town's most regarded hair ateliers — absorbing technique, building discipline, and developing an eye for what actually works.</p>
                <p>In 2016, she moved back to the Vaal to start something of her own. Not a high-volume commercial salon, but something smaller and more intentional — a space where every client gets the same quality that was previously only available in big-city studios.</p>
                <p>Today, Noir Studio has a loyal following of clients across the Vaal Triangle who trust Adéle with their hair, often travelling from Johannesburg and Pretoria specifically for appointments.</p>
              </div>

              {/* Pull quote */}
              <blockquote className="mt-9 pl-5 border-l-2 border-accent">
                <p className="font-display text-xl font-light italic text-ink/70 leading-snug">
                  "I started Noir because I wanted to prove that you don't have to go to the city to get a truly great haircut."
                </p>
                <footer className="mt-3 lbl text-muted">— Adéle Möller, Founder</footer>
              </blockquote>

              <div className="mt-12 grid grid-cols-3 gap-4 pt-10 border-t border-stone">
                {SITE.stats.map(s => (
                  <div key={s.label}>
                    <p className="font-display text-5xl font-light text-ink">{s.value}</p>
                    <p className="lbl text-muted mt-1.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp()} className="mb-16">
            <p className="lbl text-accent mb-4">How We Work</p>
            <h2 className="font-display font-light text-ink leading-tight" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 48px)' }}>
              Our values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stone">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeUp(i * 0.1)}
                className="bg-surface p-9 md:p-11"
              >
                <p className="text-4xl mb-7 text-ink/20">{v.icon}</p>
                <h3 className="font-display text-2xl font-light text-ink mb-4">{v.title}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="py-20 bg-ink">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="lbl text-accent mb-4">Our Partners</p>
            <h2 className="font-display font-light text-white text-3xl md:text-4xl">
              We work with the<br /><em>best in the industry.</em>
            </h2>
          </motion.div>
          <div className="flex flex-wrap gap-3">
            {certs.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="lbl text-white/45 border border-white/12 px-5 py-2.5 rounded-full hover:border-accent/40 hover:text-white/70 transition-all duration-300"
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-warm">
        <div className="max-w-lg mx-auto px-6 text-center">
          <motion.div {...fadeUp()}>
            <p className="lbl text-accent mb-6">Come and see us</p>
            <h2 className="font-display font-light text-ink text-4xl md:text-5xl mb-7">
              <em>We'd love to meet you.</em>
            </h2>
            <p className="text-muted text-[15px] font-light mb-9 leading-relaxed">
              Book a consultation — we'll assess your hair and chat through what's possible, with no pressure.
            </p>
            <a
              href={waLink} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 lbl px-8 py-3.5 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.03]"
            >
              Book via WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

    </motion.div>
  )
}
