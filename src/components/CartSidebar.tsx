import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { SITE } from '../config/site'

export default function CartSidebar() {
  const { cart, cartTotal, isOpen, closeCart, removeItem, changeQty } = useCart()

  function orderViaWhatsApp() {
    if (cart.length === 0) return
    let msg = `Hi ${SITE.business.name}! I'd like to order:\n\n`
    cart.forEach(item => {
      msg += `• ${item.name} x${item.qty} — R${(item.price * item.qty).toLocaleString()}\n`
    })
    msg += `\nTotal: R${cartTotal.toFixed(2)}\n\nPlease confirm availability and delivery options.`
    window.open(`https://wa.me/${SITE.business.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-[360px] bg-warm z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-stone">
              <p className="font-display text-2xl font-light text-ink">Your Cart</p>
              <button onClick={closeCart} className="text-muted hover:text-ink transition-colors">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-stone flex items-center justify-center mb-4">
                    <svg width="22" height="22" fill="none" stroke="#78716c" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
                    </svg>
                  </div>
                  <p className="font-display text-xl font-light text-ink mb-1">Your cart is empty</p>
                  <p className="lbl text-muted">Add something from the shop</p>
                </div>
              ) : (
                <div className="space-y-5">
                  <AnimatePresence initial={false}>
                    {cart.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 items-start"
                      >
                        <img src={item.image} alt={item.name}
                          className="w-16 h-16 object-cover rounded-sm shrink-0 bg-stone" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-ink leading-snug mb-0.5 truncate">{item.name}</p>
                          <p className="lbl text-accent mb-2">R{item.price.toLocaleString()}</p>
                          <div className="flex items-center gap-3">
                            <button onClick={() => changeQty(item.id, -1)}
                              className="w-6 h-6 rounded-full border border-stone text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-sm">
                              −
                            </button>
                            <span className="lbl text-ink w-4 text-center">{item.qty}</span>
                            <button onClick={() => changeQty(item.id, 1)}
                              className="w-6 h-6 rounded-full border border-stone text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center text-sm">
                              +
                            </button>
                            <button onClick={() => removeItem(item.id)}
                              className="ml-auto text-muted/40 hover:text-rose-400 transition-colors">
                              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-stone px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="lbl text-muted">Subtotal</p>
                  <p className="font-display text-2xl font-light text-ink">R{cartTotal.toFixed(2)}</p>
                </div>
                <p className="lbl text-muted/60 text-[10px]">
                  Delivery calculated on WhatsApp · Free collection in-store
                </p>
                <button
                  onClick={orderViaWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white lbl rounded-full hover:bg-[#1fba5a] transition-all duration-300"
                >
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Place Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
