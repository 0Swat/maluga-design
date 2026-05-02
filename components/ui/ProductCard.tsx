'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article variants={cardVariants}>
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
            <p className="text-sm font-light tracking-[0.2em] uppercase text-stone-100 mb-1">
              {product.name}
            </p>
            <p className="text-xs font-light text-stone-300 mb-4">{product.price}</p>
            <span className="text-xs font-light tracking-[0.2em] uppercase text-gold border-b border-gold/70 pb-px">
              Zobacz więcej
            </span>
          </div>
        </div>
        <div className="pt-5 pb-2">
          <p className="text-sm font-light tracking-[0.15em] uppercase text-ink-900 mb-1.5">
            {product.name}
          </p>
          <p className="text-xs font-light text-stone-500">{product.price}</p>
        </div>
      </Link>
    </motion.article>
  )
}
