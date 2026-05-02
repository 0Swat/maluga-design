import Link from 'next/link'

const navLinks = [
  { label: 'Kolekcja', href: '/#kolekcja' },
  { label: 'O Mnie', href: '/#o-mnie' },
  { label: 'Kontakt', href: '/#kontakt' },
]

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-ink-900 text-stone-300 py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <p className="text-sm font-light tracking-widest uppercase text-stone-300">
          MALUGA DESIGN
        </p>
        <p className="text-xs font-light italic text-stone-400">
          Tworzone z intencją. Noszone z miłością.
        </p>
        <nav className="flex items-center gap-8" aria-label="Nawigacja stopki">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-xs font-light tracking-wider uppercase text-stone-400 hover:text-gold transition-colors duration-300"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="w-20 h-px bg-stone-800" />
        <p className="text-xs font-light text-stone-500 tracking-wider">
          © {new Date().getFullYear()} Maluga Design. Wszystkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}
