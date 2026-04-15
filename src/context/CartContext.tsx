import { createContext, useContext, useState, useCallback } from 'react'
import type { Product } from '../config/site'

interface CartItem extends Product { qty: number }

interface CartContextValue {
  cart:       CartItem[]
  cartCount:  number
  cartTotal:  number
  isOpen:     boolean
  addToCart:  (product: Product) => void
  removeItem: (id: number) => void
  changeQty:  (id: number, delta: number) => void
  openCart:   () => void
  closeCart:  () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart]   = useState<CartItem[]>([])
  const [isOpen, setOpen] = useState(false)

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
    setOpen(true)
  }, [])

  const removeItem = useCallback((id: number) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const changeQty = useCallback((id: number, delta: number) => {
    setCart(prev => {
      const updated = prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      return updated.filter(i => i.qty > 0)
    })
  }, [])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      cart, cartCount, cartTotal, isOpen,
      addToCart, removeItem, changeQty,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
