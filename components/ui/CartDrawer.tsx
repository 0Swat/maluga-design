'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/lib/cart'

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as number[] } },
  exit: { x: '100%', transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as number[] } },
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as number[] } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
}

export default function CartDrawer() {
  const { items, isOpen, itemCount, total, removeItem, updateQuantity, closeCart } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60] bg-ink-900/30 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.aside
            key="drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-stone-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-stone-200">
              <p className="text-xs font-light tracking-[0.28em] uppercase text-ink-900">
                Koszyk {itemCount > 0 && <span className="text-gold">({itemCount})</span>}
              </p>
              <button
                onClick={closeCart}
                aria-label="Zamknij koszyk"
                className="text-stone-400 hover:text-gold transition-colors duration-300"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-5 text-center">
                  <ShoppingBag size={32} strokeWidth={1} className="text-stone-300" />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-light tracking-wider text-stone-400">
                      Koszyk jest pusty
                    </p>
                    <p className="text-xs font-light text-stone-300">
                      Odkryj kolekcję i dodaj coś wyjątkowego
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-xs font-light tracking-[0.22em] uppercase text-ink-900 border-b border-ink-900 pb-px hover:text-gold hover:border-gold transition-colors duration-300"
                  >
                    Przeglądaj kolekcję
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-stone-100">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.li
                        key={item.slug}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        layout
                        className="flex gap-5 py-6"
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-xs font-light tracking-[0.15em] uppercase text-ink-900">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs font-light text-stone-400">
                                {item.priceValue * item.quantity} PLN
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.slug)}
                              aria-label={`Usuń ${item.name}`}
                              className="text-stone-300 hover:text-gold transition-colors duration-300 flex-shrink-0"
                            >
                              <Trash2 size={13} strokeWidth={1.5} />
                            </button>
                          </div>

                          <div className="flex items-center gap-3 mt-3">
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                              aria-label="Zmniejsz ilość"
                              className="w-7 h-7 flex items-center justify-center border border-stone-200 text-stone-400 hover:border-gold hover:text-gold transition-colors duration-300"
                            >
                              <Minus size={11} strokeWidth={1.5} />
                            </button>
                            <span className="w-5 text-center text-xs font-light text-ink-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                              aria-label="Zwiększ ilość"
                              className="w-7 h-7 flex items-center justify-center border border-stone-200 text-stone-400 hover:border-gold hover:text-gold transition-colors duration-300"
                            >
                              <Plus size={11} strokeWidth={1.5} />
                            </button>
                            <span className="ml-1 text-xs font-light text-stone-300">
                              × {item.price}
                            </span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-stone-200 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-light tracking-[0.2em] uppercase text-stone-500">
                    Razem
                  </p>
                  <p className="text-base font-light text-ink-900">{total} PLN</p>
                </div>
                <button className="w-full py-4 bg-ink-900 text-stone-100 text-xs font-light tracking-[0.25em] uppercase hover:bg-ink-800 hover:-translate-y-0.5 transition-all duration-300">
                  Przejdź do płatności
                </button>
                <p className="text-xs font-light text-center text-stone-300 italic">
                  Handcrafted. Each piece is unique.
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
