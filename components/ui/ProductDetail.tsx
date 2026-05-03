'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Gem } from 'lucide-react'
import type { Product } from '@/lib/products'
import { useCart } from '@/lib/cart'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as number[] },
  }),
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [direction, setDirection] = useState(0)
  const { addItem } = useCart()

  function changeImage(index: number) {
    if (index === activeImage) return
    setDirection(index > activeImage ? 1 : -1)
    setActiveImage(index)
  }

  function handleDragEnd(_: never, info: { offset: { x: number }; velocity: { x: number } }) {
    const swipePower = Math.abs(info.offset.x) * Math.abs(info.velocity.x)
    if (swipePower < 5000) return
    if (info.offset.x < 0 && activeImage < product.images.length - 1) {
      changeImage(activeImage + 1)
    } else if (info.offset.x > 0 && activeImage > 0) {
      changeImage(activeImage - 1)
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28">
        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={fadeIn}
            className={`relative aspect-[3/4] overflow-hidden ${product.images.length > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
            drag={product.images.length > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeImage}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 pointer-events-none"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {product.images.length > 1 && (
            <motion.div variants={fadeUp} className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => changeImage(i)}
                  aria-label={`Zdjęcie ${i + 1}`}
                  className="relative flex-1 flex flex-col gap-2"
                >
                  <div
                    className={`relative aspect-square overflow-hidden transition-opacity duration-400 ${
                      i === activeImage ? 'opacity-100' : 'opacity-45 hover:opacity-75'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-px w-full bg-stone-200 overflow-hidden">
                    {i === activeImage && (
                      <motion.div
                        layoutId="active-thumb"
                        className="absolute inset-0 bg-gold"
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="flex flex-col gap-7 md:py-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={fadeUp}>
            <Link
              href="/#kolekcja"
              className="text-sm font-normal tracking-[0.22em] uppercase text-stone-600 hover:text-gold transition-colors duration-300"
            >
              ← Kolekcja
            </Link>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-4xl font-light tracking-[0.2em] uppercase text-ink-900 leading-snug"
          >
            {product.name}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-xl font-light text-gold tracking-wide">
            {product.price}
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3 text-stone-600">
            <Gem size={14} strokeWidth={1.5} />
            <p className="text-sm font-normal tracking-[0.18em] uppercase">{product.material}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="w-10 h-px bg-stone-200" />

          <motion.p variants={fadeUp} className="text-base font-normal leading-9 text-stone-500">
            {product.description}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-4 pt-4">
            <button
              onClick={() => addItem(product)}
              className="w-full py-4 px-8 bg-ink-900 text-stone-100 text-xs font-light tracking-[0.28em] uppercase hover:-translate-y-0.5 hover:bg-ink-800 transition-all duration-300"
            >
              Dodaj do koszyka
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
