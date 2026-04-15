import { useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '../config/site'
import PageHeader from '../components/PageHeader'

const services = ['Signature Cut & Style', 'Colour & Balayage', 'Keratin Treatment', 'Bridal Hair', 'Hair Extensions', 'Scalp & Bond Treatment', 'General Enquiry']

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-50px' },
  transition:  { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay },
})

const inputCls = 'w-full bg-transparent border-b border-stone py-3 text-ink text-[15px] font-light placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors duration-300'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      `Hi Noir Studio! I'm reaching out via your website.`,
      ``,
      `Name: ${form.name}`,
      form.email    ? `Email: ${form.email}` : '',
      form.phone    ? `Phone: ${form.phone}` : '',
      form.service  ? `Interested in: ${form.service}` : '',
      form.message  ? `\nMessage:\n${form.message}` : '',
    ].filter(Boolean).join('\n')

    window.open(`https://wa.me/${SITE.business.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

      <PageHeader
        label="Get In Touch"
        title="Contact Us"
        subtitle="We'd love to hear from you. Fill in the form and we'll follow up on WhatsApp."
      />

      <section className="py-24 md:py-36 bg-warm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* ── FORM ── */}
            <motion.div {...fadeUp()}>
              <p className="lbl text-accent mb-8">Send a message</p>
              <form onSubmit={handleSubmit} className="space-y-8">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="lbl text-muted/70 block mb-2">Full Name *</label>
                    <input
                      required type="text" placeholder="Thandi Mokoena"
                      value={form.name} onChange={set('name')}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="lbl text-muted/70 block mb-2">Email Address</label>
                    <input
                      type="email" placeholder="hello@example.com"
                      value={form.email} onChange={set('email')}
                      className={inputCls}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="lbl text-muted/70 block mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel" placeholder="082 000 0000"
                      value={form.phone} onChange={set('phone')}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="lbl text-muted/70 block mb-2">Service Interested In</label>
                    <select value={form.service} onChange={set('service')} className={`${inputCls} bg-warm`}>
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="lbl text-muted/70 block mb-2">Message</label>
                  <textarea
                    rows={4} placeholder="Tell us a bit about your hair and what you're looking to achieve..."
                    value={form.message} onChange={set('message')}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-3 lbl px-8 py-4 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300 hover:scale-[1.03]"
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>

            {/* ── INFO ── */}
            <motion.div {...fadeUp(0.15)} className="space-y-12">

              {/* Hours */}
              <div>
                <p className="lbl text-accent mb-7">Opening Hours</p>
                <div className="space-y-3">
                  {SITE.business.hours.map(h => (
                    <div key={h.day} className="flex items-baseline justify-between gap-4 pb-3 border-b border-stone last:border-0">
                      <p className="lbl text-muted shrink-0">{h.day}</p>
                      <p className={`lbl ${h.time === 'Closed' ? 'text-muted/40' : 'text-ink'}`}>{h.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact details */}
              <div>
                <p className="lbl text-accent mb-7">Contact Details</p>
                <div className="space-y-4">
                  {[
                    { href: `tel:${SITE.business.phone}`, label: SITE.business.phone, icon: 'phone' },
                    { href: `mailto:${SITE.business.email}`, label: SITE.business.email, icon: 'mail' },
                    { href: `https://wa.me/${SITE.business.whatsapp}`, label: 'WhatsApp Us', icon: 'wa', target: '_blank' },
                  ].map(({ href, label, icon, target }) => (
                    <a key={label} href={href} target={target} rel={target ? 'noreferrer' : undefined}
                      className="flex items-center gap-3 group">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${icon === 'wa' ? 'bg-[#25D366]/15' : 'bg-stone'}`}>
                        {icon === 'phone' && (
                          <svg width="13" height="13" fill="none" stroke="#b8935a" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 10.68 19.79 19.79 0 01.67 2.07 2 2 0 012.66 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l.99-.99a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                          </svg>
                        )}
                        {icon === 'mail' && (
                          <svg width="13" height="13" fill="none" stroke="#b8935a" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                          </svg>
                        )}
                        {icon === 'wa' && (
                          <svg width="13" height="13" fill="#25D366" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        )}
                      </span>
                      <span className={`lbl ${icon === 'wa' ? 'text-[#25D366]' : 'text-muted'} group-hover:text-ink transition-colors`}>{label}</span>
                    </a>
                  ))}
                  <div className="flex items-start gap-3 mt-2">
                    <span className="w-8 h-8 rounded-full bg-stone flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="13" height="13" fill="none" stroke="#b8935a" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                    </span>
                    <p className="lbl text-muted leading-relaxed">{SITE.business.address}</p>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div>
                <p className="lbl text-accent mb-5">Find Us</p>
                <div className="h-52 bg-surface rounded-sm border border-stone flex items-center justify-center">
                  <div className="text-center">
                    <svg width="26" height="26" fill="none" stroke="#b8935a" strokeWidth="1.2" viewBox="0 0 24 24" className="mx-auto mb-3 opacity-50">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <p className="lbl text-muted">{SITE.business.address}</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

    </motion.div>
  )
}
