import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { SITE } from '../config/site'

/* ── localStorage helpers ── */
const LS_KEY = 'noir_user'

interface User {
  name: string
  email: string
  phone: string
}

function getUser(): User | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

function saveUser(u: User) {
  localStorage.setItem(LS_KEY, JSON.stringify(u))
}

function logout() {
  localStorage.removeItem(LS_KEY)
}

/* ── Fake order history ── */
const FAKE_ORDERS = [
  {
    id: 'NS-00291',
    date: '12 Mar 2026',
    status: 'Delivered',
    total: 1210,
    items: [
      { name: 'Moroccanoil Treatment Original', qty: 1, price: 590 },
      { name: 'Olaplex No. 3 Hair Perfector',    qty: 1, price: 620 },
    ],
  },
  {
    id: 'NS-00284',
    date: '28 Feb 2026',
    status: 'Delivered',
    total: 550,
    items: [
      { name: 'Olaplex No. 6 Bond Smoother', qty: 1, price: 550 },
    ],
  },
  {
    id: 'NS-00261',
    date: '14 Jan 2026',
    status: 'Delivered',
    total: 860,
    items: [
      { name: 'Kérastase Nutritive Masquintense', qty: 1, price: 680 },
      { name: 'Redken All Soft Shampoo',           qty: 1, price: 280 },
    ],
  },
]

type AuthView  = 'login' | 'register'
type Tab       = 'profile' | 'orders' | 'saved'

const inputCls = 'w-full bg-transparent border-b border-stone py-3 text-ink text-[14px] font-light placeholder:text-muted/40 focus:outline-none focus:border-accent transition-colors duration-300'

export default function Account() {
  const [user, setUser]     = useState<User | null>(getUser)
  const [view, setView]     = useState<AuthView>('login')
  const [tab, setTab]       = useState<Tab>('profile')
  const [error, setError]   = useState('')
  const [saved, setSaved]   = useState(false)

  /* Login form */
  const [loginForm, setLoginForm]     = useState({ email: '', password: '' })
  /* Register form */
  const [regForm, setRegForm]         = useState({ name: '', email: '', phone: '', password: '' })
  /* Profile edit form */
  const [profileForm, setProfileForm] = useState({ name: user?.name ?? '', email: user?.email ?? '', phone: user?.phone ?? '' })

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) { setError('Please fill in all fields.'); return }
    // Simulate: accept any credentials, create a session
    const u: User = { name: loginForm.email.split('@')[0], email: loginForm.email, phone: '' }
    saveUser(u)
    setUser(u)
    setProfileForm({ name: u.name, email: u.email, phone: '' })
    setError('')
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!regForm.name || !regForm.email || !regForm.password) { setError('Please fill in all required fields.'); return }
    const u: User = { name: regForm.name, email: regForm.email, phone: regForm.phone }
    saveUser(u)
    setUser(u)
    setProfileForm({ name: u.name, email: u.email, phone: u.phone })
    setError('')
  }

  function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    const u: User = { ...profileForm }
    saveUser(u)
    setUser(u)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleLogout() {
    logout()
    setUser(null)
    setLoginForm({ email: '', password: '' })
    setError('')
  }

  /* ── AUTH SCREEN ── */
  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-warm flex items-center justify-center px-5 py-20"
      >
        <div className="w-full max-w-sm">
          <Link to="/" className="font-display text-xl font-light text-ink tracking-wide block mb-12 text-center">
            Noir Studio
          </Link>

          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.div key="login"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <p className="font-display text-3xl font-light text-ink mb-2">Welcome back</p>
                <p className="text-muted text-sm font-light mb-9">Sign in to your Noir Studio account.</p>

                {error && (
                  <p className="text-rose-500 lbl text-[11px] mb-5 bg-rose-50 px-4 py-3 rounded-sm">{error}</p>
                )}

                <form onSubmit={handleLogin} className="space-y-7">
                  <div>
                    <label className="lbl text-muted/60 block mb-2 text-[11px]">Email Address</label>
                    <input type="email" required placeholder="hello@example.com"
                      value={loginForm.email}
                      onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))}
                      className={inputCls} />
                  </div>
                  <div>
                    <label className="lbl text-muted/60 block mb-2 text-[11px]">Password</label>
                    <input type="password" required placeholder="••••••••"
                      value={loginForm.password}
                      onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))}
                      className={inputCls} />
                  </div>
                  <button type="submit"
                    className="w-full py-3.5 bg-accent text-white lbl rounded-full hover:bg-accent-dark hover:scale-[1.01] transition-all duration-300 mt-2">
                    Sign In
                  </button>
                </form>

                <p className="mt-8 text-center lbl text-muted/60 text-[11px]">
                  Don't have an account?{' '}
                  <button onClick={() => { setView('register'); setError('') }}
                    className="text-accent hover:underline">
                    Create one
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div key="register"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
              >
                <p className="font-display text-3xl font-light text-ink mb-2">Create account</p>
                <p className="text-muted text-sm font-light mb-9">Join Noir Studio for faster checkout.</p>

                {error && (
                  <p className="text-rose-500 lbl text-[11px] mb-5 bg-rose-50 px-4 py-3 rounded-sm">{error}</p>
                )}

                <form onSubmit={handleRegister} className="space-y-7">
                  {[
                    { key: 'name',  label: 'Full Name *',     type: 'text',     placeholder: 'Thandi Mokoena' },
                    { key: 'email', label: 'Email Address *', type: 'email',    placeholder: 'hello@example.com' },
                    { key: 'phone', label: 'WhatsApp Number', type: 'tel',      placeholder: '082 000 0000' },
                    { key: 'password', label: 'Password *',  type: 'password', placeholder: '••••••••' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="lbl text-muted/60 block mb-2 text-[11px]">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={regForm[f.key as keyof typeof regForm]}
                        onChange={e => setRegForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  ))}
                  <button type="submit"
                    className="w-full py-3.5 bg-accent text-white lbl rounded-full hover:bg-accent-dark hover:scale-[1.01] transition-all duration-300 mt-2">
                    Create Account
                  </button>
                </form>

                <p className="mt-8 text-center lbl text-muted/60 text-[11px]">
                  Already have an account?{' '}
                  <button onClick={() => { setView('login'); setError('') }}
                    className="text-accent hover:underline">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    )
  }

  /* ── ACCOUNT DASHBOARD ── */
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="bg-ink pt-20 pb-14 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <p className="lbl text-accent mb-3">My Account</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-white">
            Hello, <em>{user.name}</em>
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-surface border-b border-stone sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="flex gap-1">
            {([
              { key: 'profile', label: 'Profile'     },
              { key: 'orders',  label: 'Order History' },
              { key: 'saved',   label: 'Saved Items'  },
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
        </div>
      </div>

      <div className="bg-warm py-14 min-h-[60vh]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <AnimatePresence mode="wait">

            {/* ── PROFILE TAB ── */}
            {tab === 'profile' && (
              <motion.div key="profile"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-lg"
              >
                <p className="font-display text-2xl font-light text-ink mb-8">Your Information</p>

                {saved && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-green-600 lbl text-[11px] mb-6 bg-green-50 px-4 py-3 rounded-sm"
                  >
                    ✓ Profile saved
                  </motion.p>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-8">
                  {[
                    { key: 'name',  label: 'Full Name',       type: 'text',  placeholder: 'Your name' },
                    { key: 'email', label: 'Email Address',   type: 'email', placeholder: 'hello@example.com' },
                    { key: 'phone', label: 'WhatsApp Number', type: 'tel',   placeholder: '082 000 0000' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="lbl text-muted/60 block mb-2 text-[11px]">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        value={profileForm[f.key as keyof typeof profileForm]}
                        onChange={e => setProfileForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  ))}

                  <div className="flex items-center gap-4 pt-2">
                    <button type="submit"
                      className="lbl px-8 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300">
                      Save Changes
                    </button>
                    <button type="button" onClick={handleLogout}
                      className="lbl px-6 py-3 border border-stone text-muted hover:text-rose-400 hover:border-rose-200 rounded-full transition-all duration-300">
                      Sign Out
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── ORDERS TAB ── */}
            {tab === 'orders' && (
              <motion.div key="orders"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-2xl font-light text-ink mb-8">Order History</p>
                <div className="space-y-5">
                  {FAKE_ORDERS.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="bg-surface border border-stone rounded-sm overflow-hidden"
                    >
                      {/* Order header */}
                      <div className="px-6 py-4 border-b border-stone flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="lbl text-muted/50 text-[10px] mb-0.5">Order</p>
                            <p className="lbl text-ink">{order.id}</p>
                          </div>
                          <div>
                            <p className="lbl text-muted/50 text-[10px] mb-0.5">Date</p>
                            <p className="lbl text-ink">{order.date}</p>
                          </div>
                          <div>
                            <p className="lbl text-muted/50 text-[10px] mb-0.5">Total</p>
                            <p className="font-display text-lg font-light text-ink">R{order.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <span className="lbl text-[10px] px-3 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-200">
                          {order.status}
                        </span>
                      </div>
                      {/* Items */}
                      <div className="px-6 py-4 space-y-2">
                        {order.items.map(item => (
                          <div key={item.name} className="flex justify-between lbl text-muted text-[12px]">
                            <span>{item.name} × {item.qty}</span>
                            <span>R{item.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── SAVED TAB ── */}
            {tab === 'saved' && (
              <motion.div key="saved"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-display text-2xl font-light text-ink mb-8">Saved Items</p>
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-stone flex items-center justify-center mb-5">
                    <svg width="20" height="20" fill="none" stroke="#78716c" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </div>
                  <p className="font-display text-xl font-light text-ink mb-2">Nothing saved yet</p>
                  <p className="text-muted text-sm font-light mb-8">Browse the shop and save your favourites.</p>
                  <Link
                    to="/shop"
                    className="lbl px-7 py-3 bg-accent text-white rounded-full hover:bg-accent-dark transition-all duration-300"
                  >
                    Browse the Shop
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-surface border-t border-stone">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="lbl text-muted mb-5">Need help with an order?</p>
          <a
            href={`https://wa.me/${SITE.business.whatsapp}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 lbl px-7 py-3 bg-[#25D366] text-white rounded-full hover:bg-[#1fba5a] transition-all duration-300"
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
        </div>
      </section>
    </motion.div>
  )
}
