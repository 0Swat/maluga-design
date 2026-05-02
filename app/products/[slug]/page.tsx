export const revalidate = 0
export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProducts, getProductBySlug } from '@/lib/products'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductDetail from '@/components/ui/ProductDetail'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}
  return {
    title: `${product.name} — Maluga Design`,
    description: product.description.slice(0, 160),
  }
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-stone-50 pt-24">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  )
}
