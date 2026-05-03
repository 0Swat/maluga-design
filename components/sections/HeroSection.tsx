'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.3 },
  },
}

const lineVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src="/img/profile/banner.jpg"
          alt="Maluga Design — atelier"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-ink-900/35" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-6 flex flex-col items-center gap-7"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={lineVariants} className="w-16 h-px bg-gold origin-left" />

        <motion.p
          variants={fadeUp}
          className="text-sm font-normal tracking-[0.22em] uppercase text-stone-100"
        >
          Ręcznie tworzona biżuteria w stylu minimalistycznym
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.3em] uppercase text-stone-50 leading-none"
        >
          MALUGA DESIGN
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-base font-normal italic text-stone-100 max-w-sm leading-8"
        >
          Tworzone wolno. Noszone długo.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-3">
          <Link
            href="/#kolekcja"
            className="group relative inline-block px-12 py-4 text-sm font-normal tracking-[0.22em] uppercase text-stone-100 border border-stone-200/80 overflow-hidden hover:text-ink-900 transition-colors duration-700"
          >
            <span className="absolute inset-0 bg-stone-100 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
            <span className="relative">Odkryj kolekcję</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
