'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import type { Product } from '@/lib/products'

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as number[] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as number[] } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
}

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-ink-900/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            className="relative bg-stone-50 max-w-lg w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 text-ink-800 hover:text-gold transition-colors duration-300"
              onClick={onClose}
              aria-label="Zamknij"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
            <div className="relative aspect-[4/3]">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="p-8 flex flex-col gap-4">
              <h2 className="text-xl font-light tracking-[0.2em] uppercase text-ink-900">
                {product.name}
              </h2>
              <p className="text-base font-light text-gold">{product.price}</p>
              <p className="text-sm font-light leading-8 text-stone-500">
                {product.description.split('.')[0]}.
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-2 inline-block text-xs font-light tracking-[0.22em] uppercase text-ink-900 border-b border-ink-900 pb-px hover:text-gold hover:border-gold transition-colors duration-300"
                onClick={onClose}
              >
                Zobacz więcej
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
