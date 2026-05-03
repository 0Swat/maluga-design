import Link from 'next/link'
import { Phone, Mail, Instagram, Facebook } from 'lucide-react'

const navLinks = [
  { label: 'Kolekcja', href: '/#kolekcja' },
  { label: 'O Mnie', href: '/#o-mnie' },
  { label: 'Kontakt', href: '/#kontakt' },
]

const contactItems = [
  { icon: Phone, label: '+48 123 456 789', href: 'tel:+48123456789' },
  { icon: Mail, label: 'kontakt@malugadesign.pl', href: 'mailto:kontakt@malugadesign.pl' },
  { icon: Instagram, label: '@maluga_design', href: 'https://www.instagram.com/maluga_design/' },
  { icon: Facebook, label: 'Maluga Design', href: 'https://www.facebook.com/profile.php?id=100066912185283' },
]

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-ink-900 text-stone-300 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-10">
        <p className="text-sm font-light tracking-widest uppercase text-stone-300">
          MALUGA DESIGN
        </p>
        <p className="text-xs font-light italic text-stone-400">
          Tworzone z intencją. Noszone z miłością.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {contactItems.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2.5 text-xs font-light text-stone-400 hover:text-gold transition-colors duration-300"
            >
              <Icon size={13} strokeWidth={1.5} />
              {label}
            </a>
          ))}
        </div>

        <div className="w-20 h-px bg-stone-800" />

        <nav className="flex items-center gap-8" aria-label="Nawigacja stopki">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs font-light tracking-wider uppercase text-stone-500 hover:text-gold transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs font-light text-stone-600 tracking-wider">
          © {new Date().getFullYear()} Maluga Design. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
