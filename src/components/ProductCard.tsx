import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import type { Product } from '../config/site'

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const hasSale = product.originalPrice > 0

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-400"
    >
      <Link to={`/shop/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-stone">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-600"
          loading="lazy"
        />
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 lbl px-2.5 py-1 rounded-full text-white ${
            product.badge === 'Sale'        ? 'bg-rose-500' :
            product.badge === 'New'         ? 'bg-accent'   :
            product.badge === 'Best Seller' ? 'bg-ink/75'   : 'bg-stone'
          }`}>
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-4">
        <p className="lbl text-muted mb-1">{product.brand}</p>
        <Link to={`/shop/product/${product.id}`}>
          <p className="text-[13px] font-medium text-ink leading-snug mb-3 hover:text-accent transition-colors duration-200">
            {product.name}
          </p>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-light text-ink">R{product.price.toLocaleString()}</span>
            {hasSale && (
              <span className="lbl text-muted line-through">R{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product)}
            aria-label={`Add ${product.name} to cart`}
            className="w-8 h-8 rounded-full bg-stone hover:bg-accent group-hover:bg-accent text-muted hover:text-white group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
