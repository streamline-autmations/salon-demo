import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home     from './pages/Home'
import Services from './pages/Services'
import Gallery  from './pages/Gallery'
import Shop     from './pages/Shop'
import About    from './pages/About'
import Contact  from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()

  // Scroll to top on route change
  window.scrollTo({ top: 0, behavior: 'instant' })

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<Home />}     />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery"  element={<Gallery />}  />
        <Route path="/shop"     element={<Shop />}     />
        <Route path="/about"    element={<About />}    />
        <Route path="/contact"  element={<Contact />}  />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <CartSidebar />
        <WhatsAppFloat />
      </CartProvider>
    </BrowserRouter>
  )
}
