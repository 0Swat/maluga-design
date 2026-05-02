export const revalidate = 0

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ProductGrid from '@/components/sections/ProductGrid'
import AboutSection from '@/components/sections/AboutSection'
import { getProducts } from '@/lib/products'

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProductGrid products={products} />
      <AboutSection />
      <Footer />
    </main>
  )
}
