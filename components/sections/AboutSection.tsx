'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.25, 0.1, 0.25, 1] as number[] },
  },
}

const facts = ['Mosiądz i srebro próby 925', 'Kamienie naturalne', 'Każda sztuka unikatowa']

export default function AboutSection() {
  return (
    <section id="o-mnie" className="py-32 px-6 bg-stone-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          className="relative h-[520px] md:h-[640px] overflow-hidden"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/img/profile/profile.jpg"
            alt="Twórczyni Maluga Design"
            fill
            className="object-cover [filter:grayscale(0.3)] hover:[filter:grayscale(0)] transition-all duration-700"
          />
        </motion.div>

        <motion.div
          className="flex flex-col gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-light tracking-[0.32em] uppercase text-gold"
          >
            O twórczyni
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-light tracking-[0.15em] uppercase text-ink-900 leading-relaxed"
          >
            Forma rodzi się z ciszy
          </motion.h2>

          <motion.p variants={fadeUp} className="text-sm font-light leading-9 text-stone-500">
            Każdy przedmiot, który tworzę, przechodzi przez moje dłonie wiele razy — nie śpieszę
            się. Pracuję z mosiądzem i kamieniami zebranymi z natury, wierząc, że materiał już
            zawiera formę. Moim zadaniem jest tylko ją znaleźć.
          </motion.p>

          <motion.p variants={fadeUp} className="text-sm font-light leading-9 text-stone-500">
            Biżuteria to dla mnie nie ornament, lecz rytuał: codzienny gest sięgania po coś, co
            nosi w sobie intencję twórcy. Każda sztuka jest unikatowa — bo każda chwila, w której
            powstawała, była unikatowa.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col pt-4">
            {facts.map((fact, i) => (
              <div key={fact}>
                {i > 0 && <div className="h-px bg-gold/30 my-4" />}
                <p className="text-xs font-light tracking-[0.22em] uppercase text-ink-800">{fact}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
