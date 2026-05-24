export type NavLink = {
  label: string
  path: string
}

export type FooterLinkGroup = {
  title: string
  links: { label: string; path?: string; external?: string }[]
}

export const logo = '/assets/logos/logo-light.png'

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Studio', path: '/studio' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
]

export const bookSessionPath = '/studio'

export const locationMeta = {
  coords: '51.1° N · Calgary, AB',
}

export const tickerItems = [
  'Studio rental open · $70 / hour',
  'Editorial photography',
  'Brand strategy',
  'Content creation',
  'Mon — Sun by appointment',
  'New Horizon Mall · H38',
]

export const contactInfo = {
  email: 'connect@lbbrandhaus.com',
  phone: '(368) 599-0012',
  phoneHours: 'Mon — Sun, 9am — 7pm MT.',
  address: {
    line1: 'Unit H38, New Horizon Mall',
    line2: '260300 Writing Creek Cres',
    line3: 'Balzac, AB T4A 0X8',
  },
  mapLabel: 'Map · Balzac, Alberta',
  mapPlace: 'New Horizon Mall',
  appointmentNote: 'By appointment only',
  responseNote: 'Reply within one business day, usually faster.',
}

export const footerLinks: FooterLinkGroup[] = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', path: '/services' },
      { label: 'The Space', path: '/studio' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Booking', path: '/studio' },
      { label: 'Journal' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Instagram ↗', external: 'https://instagram.com' },
      { label: 'LinkedIn ↗', external: 'https://linkedin.com' },
      { label: 'Pinterest ↗', external: 'https://pinterest.com' },
    ],
  },
]

export const footerTagline = {
  index: 'Index — 05 / Contact',
  headline: 'vision',
  sub: 'Open Mon — Sun · By appointment',
}

export const siteCredit = 'Site by Gridhouse Digital'
export const copyright = '© 2026 LB Brand Haus'
