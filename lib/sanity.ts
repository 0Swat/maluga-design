import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const apiVersion = '2024-01-01'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
})

export const productsQuery = `
  *[_type == "product"] | order(orderRank asc, _createdAt asc) {
    name,
    "slug": slug.current,
    price,
    description,
    material,
    "images": images[].asset->url
  }
`

export const productBySlugQuery = `
  *[_type == "product" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    price,
    description,
    material,
    "images": images[].asset->url
  }
`
