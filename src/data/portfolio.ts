export type PortfolioSize = 'l' | 'm' | 's' | 't'

export type PortfolioFrameType =
  | 'image'
  | 'type-orange'
  | 'type'
  | 'type-teal'
  | 'type-light'

export type PortfolioMediaItem = {
  type: 'image' | 'video'
  src: string
  poster?: string
}

export type PortfolioProject = {
  id: string
  name: string
  meta: string
  headline: string
  description?: string
  categories: string[]
  size: PortfolioSize
  image?: string
  frameType?: PortfolioFrameType
  typeLabel?: string
  typeAccent?: string
  media?: PortfolioMediaItem[]
}

export type HomeWorkProject = {
  id: string
  name: string
  category: string
  size: 'large' | 'medium' | 'small' | 'fill'
  image: string
}

export const portfolioFilters = [
  'All',
  'Brand Identity',
  'Photography',
  'Editorial',
  'Content System',
  'Campaign',
] as const

export type PortfolioFilter = (typeof portfolioFilters)[number]

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'maison-belmont',
    name: 'Maison Belmont',
    meta: 'Brand · 2026',
    headline: 'A heritage Calgary patisserie, refreshed for a new generation.',
    description: 'Full brand refresh covering wordmark, colour system, packaging, and in-store environment. The challenge was honouring 40 years of history while making the brand feel genuinely current — not nostalgic, not trendy.',
    categories: ['Brand Identity'],
    size: 'l',
    image: '/assets/studio/DSC07225.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/studio/DSC07225.jpg' },
      { type: 'image', src: '/assets/portfolio/2I1A0562.jpg' },
    ],
  },
  {
    id: 'north-forty-coffee',
    name: 'North Forty Coffee',
    meta: 'Identity · 2025',
    headline: 'From farmer\'s market table to four-location chain.',
    description: 'Identity system built to scale — from a single cup sleeve to a full retail environment. Typography, colour, and packaging architecture designed for consistency across four Calgary locations.',
    categories: ['Brand Identity'],
    size: 'm',
    frameType: 'type-orange',
    typeLabel: 'North Forty',
    typeAccent: 'Coffee',
    media: [
      { type: 'image', src: '/assets/portfolio/IMG_2407.jpg' },
    ],
  },
  {
    id: 'the-veneration-co',
    name: 'The Veneration Co.',
    meta: 'Content · 2025',
    headline: 'Quarterly content system for a wellness studio.',
    description: 'A repeatable content engine: shoot days, caption frameworks, platform calendars, and asset libraries. Built so their team could execute independently between sessions.',
    categories: ['Content System'],
    size: 's',
    image: '/assets/studio/DSC07234.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/studio/DSC07234.jpg' },
    ],
  },
  {
    id: 'studio-mira',
    name: 'Studio Mira',
    meta: 'Editorial · 2025',
    headline: 'Editorial campaign for spring \'25 collection.',
    description: 'A six-look editorial shot in-studio over two days. Natural window light, minimal intervention. Published across print lookbook and digital campaign simultaneously.',
    categories: ['Editorial'],
    size: 's',
    frameType: 'type',
    typeLabel: 'Studio',
    typeAccent: 'Mira',
    media: [
      { type: 'image', src: '/assets/portfolio/IMG_4940.jpg' },
    ],
  },
  {
    id: 'holt-renfrew',
    name: 'Holt Renfrew Calgary',
    meta: 'Campaign · 2024',
    headline: 'Window display photography series for Q4.',
    description: 'Twelve hero images documenting the Q4 window installation series. Shot to align with the national campaign while giving the Calgary location its own distinct visual identity.',
    categories: ['Campaign'],
    size: 's',
    image: '/assets/portfolio/IMG_2407.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/portfolio/IMG_2407.jpg' },
      { type: 'image', src: '/assets/portfolio/hs-3.jpg' },
    ],
  },
  {
    id: 'atelier-foltz',
    name: 'Atelier Foltz',
    meta: 'Brand · Photography · 2024',
    headline: 'Personal brand visuals for a Calgary architect.',
    description: 'Brand identity and portrait series for an independent architect. The brief: authoritative without being corporate, approachable without being casual. Shot in the studio and on-site at two of her builds.',
    categories: ['Brand Identity', 'Photography'],
    size: 't',
    image: '/assets/studio/DSC07257.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/studio/DSC07257.jpg' },
      { type: 'image', src: '/assets/studio/DSC07225.jpg' },
    ],
  },
  {
    id: 'bowness-botanicals',
    name: 'Bowness Botanicals',
    meta: 'Identity · 2024',
    headline: 'Identity system for a small-batch herbalist.',
    description: 'Wordmark, label system, and brand voice for a Calgary herbalist selling at farmers\' markets and online. Designed to feel handcrafted and specific — not apothecary-cliché.',
    categories: ['Brand Identity'],
    size: 's',
    frameType: 'type-teal',
    typeLabel: 'Bowness',
    typeAccent: 'Botanicals',
    media: [
      { type: 'image', src: '/assets/studio/DSC07234.jpg' },
    ],
  },
  {
    id: 'brunch-club-yyc',
    name: 'The Brunch Club YYC',
    meta: 'Content · 2024',
    headline: 'Monthly content engine for a 3-location restaurant group.',
    description: 'Monthly shoot days producing 60+ assets per session across food, atmosphere, and team. Structured around a platform-specific delivery system — cut for Instagram, Stories, and Google Business simultaneously.',
    categories: ['Content System'],
    size: 's',
    image: '/assets/studio/DSC07234.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/studio/DSC07234.jpg' },
    ],
  },
  {
    id: 'lumina-skin-co',
    name: 'Lumina Skin Co.',
    meta: 'Photography · 2024',
    headline: 'Product photography for a Canadian skincare launch.',
    description: 'Launch photography for a 12-SKU skincare line — product flats, lifestyle stills, and detail shots. All shot in-studio with controlled warm light to match the brand\'s clean, human aesthetic.',
    categories: ['Photography'],
    size: 's',
    image: '/assets/studio/DSC07225.jpg',
    frameType: 'image',
    media: [
      { type: 'image', src: '/assets/studio/DSC07225.jpg' },
    ],
  },
  {
    id: 'hotel-verdure',
    name: 'Hôtel Verdure',
    meta: 'Brand · 2023',
    headline: 'Brand identity for a boutique hotel in Banff.',
    description: 'Full identity for a 22-room boutique hotel opening in Banff. Wordmark, environmental signage system, in-room collateral, and digital presence. The visual language draws from alpine modernism — not the usual rustic lodge palette.',
    categories: ['Brand Identity'],
    size: 's',
    frameType: 'type-light',
    typeLabel: 'Hôtel',
    typeAccent: 'Verdure',
    media: [
      { type: 'image', src: '/assets/portfolio/IMG_4940.jpg' },
    ],
  },
]

export const homeWorkProjects: HomeWorkProject[] = [
  {
    id: 'maison-belmont',
    name: 'Maison Belmont',
    category: 'Brand · Photography · 2026',
    size: 'large',
    image: '/assets/portfolio/2I1A0562.jpg',
  },
  {
    id: 'north-forty-coffee',
    name: 'North Forty Coffee',
    category: 'Identity · 2025',
    size: 'medium',
    image: '/assets/portfolio/IMG_2407.jpg',
  },
  {
    id: 'the-veneration-co',
    name: 'The Veneration Co.',
    category: 'Content · 2025',
    size: 'small',
    image: '/assets/portfolio/IMG_3583.jpg',
  },
  {
    id: 'studio-mira',
    name: 'Studio Mira',
    category: 'Editorial · 2025',
    size: 'fill',
    image: '/assets/portfolio/IMG_4940.jpg',
  },
]

export function filterPortfolioProjects(
  filter: PortfolioFilter,
): PortfolioProject[] {
  if (filter === 'All') return portfolioProjects
  return portfolioProjects.filter((p) => p.categories.includes(filter))
}

export function getPortfolioProject(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.id === id)
}
