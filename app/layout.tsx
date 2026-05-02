import type { Metadata } from 'next'
import { Quicksand } from 'next/font/google'
import ClientProviders from '@/components/ClientProviders'
import './globals.css'

const quicksand = Quicksand({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-quicksand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Maluga Design — Biżuteria Handmade',
  description:
    'Biżuteria handmade w stylu minimalistycznym. Każdy element opowieść. Każdy metal — naturą.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={quicksand.variable}>
      <body className="font-sans antialiased bg-stone-50 text-ink-900">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
