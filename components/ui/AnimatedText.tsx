'use client'

import { motion } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3'
}

const MotionP = motion.p
const MotionSpan = motion.span
const MotionH1 = motion.h1
const MotionH2 = motion.h2
const MotionH3 = motion.h3

const componentMap = { p: MotionP, span: MotionSpan, h1: MotionH1, h2: MotionH2, h3: MotionH3 }

const baseVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as number[], delay },
  }),
}

export default function AnimatedText({ text, className = '', delay = 0, as = 'p' }: AnimatedTextProps) {
  const Component = componentMap[as]
  return (
    <Component
      className={className}
      variants={baseVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
    >
      {text}
    </Component>
  )
}
