'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart'

const navLinks = [
  { label: 'Kolekcja', href: '/#kolekcja' },
  { label: 'O Mnie', href: '/#o-mnie' },
  { label: 'Kontakt', href: '/#kontakt' },
]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as number[] } },
}

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as number[], delay: i * 0.08 },
  }),
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-stone-50/60">
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-stone-200"
          style={{ opacity: borderOpacity }}
        />
        <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-light tracking-widest uppercase text-ink-900 hover:text-gold transition-colors duration-500"
          >
            MALUGA DESIGN
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-xs font-light tracking-wider uppercase text-ink-800 hover:text-gold transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
            <button
              aria-label="Koszyk"
              onClick={openCart}
              className="relative text-ink-800 hover:text-gold transition-colors duration-300"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-stone-50 text-[10px] font-normal rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-5">
            <button
              aria-label="Koszyk"
              onClick={openCart}
              className="relative text-ink-800 hover:text-gold transition-colors duration-300"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-gold text-stone-50 text-[10px] font-normal rounded-full flex items-center justify-center leading-none">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              className="text-ink-800 hover:text-gold transition-colors duration-300"
              onClick={() => setMenuOpen(true)}
              aria-label="Otwórz menu"
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate={menuOpen ? 'visible' : 'hidden'}
        className={`fixed inset-0 z-[60] backdrop-blur-md bg-stone-50/92 flex flex-col items-center justify-center ${
          menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          className="absolute top-5 right-6 text-ink-800 hover:text-gold transition-colors duration-300"
          onClick={() => setMenuOpen(false)}
          aria-label="Zamknij menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
        <div className="flex flex-col items-center gap-10">
          {navLinks.map(({ label, href }, i) => (
            <motion.div key={label} variants={linkVariants} custom={i} initial="hidden" animate={menuOpen ? 'visible' : 'hidden'}>
              <Link
                href={href}
                className="text-xl font-light tracking-[0.3em] uppercase text-ink-900 hover:text-gold transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}
