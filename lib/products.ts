import { sanityClient, productsQuery, productBySlugQuery } from './sanity'

export interface Product {
  name: string
  slug: string
  price: string
  description: string
  material: string
  images: string[]
}

export const staticProducts: Product[] = [
  {
    name: 'Mosiężny Duet',
    slug: 'mosiezny-duet',
    price: '320 PLN',
    description:
      'Mosiądz nosi w sobie ciepło ziemi i pamięć dawnych form — metal, który nie udaje srebra ani złota, lecz jest sobą całkowicie. Ten zestaw powstał jako para: bransoletka i pierścionek kute w tym samym rytmie, tą samą ręką. Noszone razem tworzą dialog formy i skóry; osobno — każde z nich pozostaje kompletne. Rzemiosło, które nie spieszyło się ku efektowi, lecz pozwoliło materiałowi samemu znaleźć kształt.',
    material: 'Mosiądz',
    images: [
      '/img/products/mosiezny-duet/1.jpg',
      '/img/products/mosiezny-duet/2.jpg',
      '/img/products/mosiezny-duet/3.jpg',
    ],
  },
  {
    name: 'Kuty Rytm',
    slug: 'kuty-rytm',
    price: '185 PLN',
    description:
      'Każde uderzenie młotka zostawia ślad — nie błąd, lecz dowód obecności. Ta bransoletka jest zapisem gestu: mosiężna wstęga szerokości pięciu milimetrów, ręcznie kuta, nosi na sobie mapę własnego powstawania. Faktura młotkowania łamie światło inaczej każdego dnia, zależnie od kąta i pory roku. Noszona przy skórze, staje się jej przedłużeniem — warstwą między ciałem a światem.',
    material: 'Mosiądz młotkowany',
    images: ['/img/products/kuty-rytm/1.jpg', '/img/products/kuty-rytm/2.jpg'],
  },
  {
    name: 'Omega',
    slug: 'naszyjnik-omega',
    price: '245 PLN',
    description:
      'Forma Omega od tysiącleci znaczy granicę — ostatnią literę, która jest jednocześnie powrotem do pierwszej. Ten naszyjnik z mosiądzu interpretuje ją jako gest ciągłości: łuk, który nie szuka zapięcia, lecz spoczywa na obojczyku własnym ciężarem. Metal lany i polerowany odbija otoczenie w subtelnym, ciepłym blasku. Jest to biżuteria dla tych, którzy wiedzą, że ozdoba może milczeć i mówić jednocześnie.',
    material: 'Mosiądz',
    images: ['/img/products/naszyjnik-omega/1.jpg'],
  },
  {
    name: 'Bogini',
    slug: 'naszyjnik-bogini',
    price: '295 PLN',
    description:
      'Istnieją kształty, które ludzkość powtarza od wieków — bo dotykają czegoś głębszego niż moda. Ten naszyjnik czerpie z archetypów: forma kobieca, mosiądz jako metal ziemi, kamień naturalny jako świadek czasu geologicznego. Każdy element dobierany z intencją, nie z przypadku. Noszony blisko serca, działa jak amulet — nie magiczny, lecz memoryczny: przypomnienie, że piękno jest stare i należy do nas.',
    material: 'Mosiądz, kamień naturalny',
    images: ['/img/products/naszyjnik-bogini/1.jpg'],
  },
  {
    name: 'Perłowe Milczenie',
    slug: 'pierscionki-perla',
    price: '265 PLN',
    description:
      'Perła potrzebuje lat, by stać się sobą — warstwy czasu nanoszone wokół jednego ziarnka. Mosiężna oprawa nie stara się jej zagłuszyć: jest raczej ramą, która podkreśla odrębność kamienia. Pierścionek ten łączy dwa czasy: geologiczny rytm perły i gest rzemieślnika, który jednym ruchem zamknął ją w obiciu. Na palcu — subtelny; na dłoni — wyraźny; potrafi milczeć i przyciągać wzrok w tej samej chwili.',
    material: 'Mosiądz, perła naturalna',
    images: [
      '/img/products/pierscionki-perla/1.jpg',
      '/img/products/pierscionki-perla/2.jpg',
      '/img/products/pierscionki-perla/3.jpg',
    ],
  },
]

export async function getProducts(): Promise<Product[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return staticProducts
  try {
    const data = await sanityClient.fetch<Product[]>(productsQuery)
    return data && data.length > 0 ? data : staticProducts
  } catch {
    return staticProducts
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return staticProducts.find((p) => p.slug === slug)
  }
  try {
    const data = await sanityClient.fetch<Product | null>(productBySlugQuery, { slug })
    return data ?? staticProducts.find((p) => p.slug === slug)
  } catch {
    return staticProducts.find((p) => p.slug === slug)
  }
}
