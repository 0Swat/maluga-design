'use client'

import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="kolekcja" className="py-32 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center gap-5 mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-2xl font-light tracking-[0.38em] uppercase text-ink-900">
            Kolekcja
          </h2>
          <div className="w-10 h-px bg-gold" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
