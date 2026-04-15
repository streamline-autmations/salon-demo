import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { SITE } from '../config/site'

const links = [
  { to: '/services', label: 'Services' },
  { to: '/gallery',  label: 'Gallery'  },
  { to: '/shop',     label: 'Shop'     },
  { to: '/about',    label: 'About'    },
  { to: '/contact',  label: 'Contact'  },
]

export default function Navbar() {
  const location   = useLocation()
  const { cartCount, openCart } = useCart()
  const isHome     = location.pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [mobOpen,  setMobOpen]  = useState(false)

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    setScrolled(false)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Close mob menu on route change
  useEffect(() => { setMobOpen(false) }, [location.pathname])

  const light = !scrolled && isHome

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled ? 'bg-warm/95 backdrop-blur-md shadow-[0_1px_0_#e8e3dc]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-[68px] md:h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className={`font-display text-2xl md:text-[28px] font-light tracking-[0.28em] transition-colors duration-300 ${light ? 'text-white' : 'text-ink'}`}>
            NOIR
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`lbl transition-colors duration-300 ${
                  location.pathname === l.to
                    ? 'text-accent'
                    : light ? 'text-white/70 hover:text-white' : 'text-ink/60 hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Cart */}
            <button onClick={openCart} className={`relative p-1 transition-colors duration-300 ${light ? 'text-white' : 'text-ink'}`}>
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                    className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-sans"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Account */}
            <Link
              to="/account"
              className={`hidden md:flex p-1 transition-colors duration-300 ${light ? 'text-white/70 hover:text-white' : 'text-ink/50 hover:text-ink'}`}
              aria-label="Account"
            >
              <svg width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </Link>

            {/* Book */}
            <a
              href={`https://wa.me/${SITE.business.whatsapp}`}
              target="_blank" rel="noreferrer"
              className={`hidden md:inline-flex lbl px-5 py-2 rounded-full border transition-all duration-300 ${
                light
                  ? 'border-white/35 text-white hover:bg-white/12'
                  : 'border-accent/50 text-accent hover:bg-accent hover:text-white'
              }`}
            >
              Book Now
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMobOpen(v => !v)}
              className={`md:hidden p-1 transition-colors duration-300 ${light ? 'text-white' : 'text-ink'}`}
              aria-label="Menu"
            >
              {mobOpen
                ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
              }
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-10"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.1 }}
              >
                <Link
                  to={l.to}
                  className="font-display text-5xl font-light text-white tracking-wide hover:text-accent transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
              href={`https://wa.me/${SITE.business.whatsapp}`}
              target="_blank" rel="noreferrer"
              className="mt-4 lbl px-8 py-3 border border-white/25 text-white rounded-full hover:border-accent hover:text-accent transition-all"
            >
              Book Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
