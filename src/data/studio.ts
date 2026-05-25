export type StudioAmenity = {
  num: string
  name: string
  detail: string
}

export type CalendarDay = {
  day: number
  muted?: boolean
  dot?: boolean
}

export const studioHero = {
  title: 'The Haus.',
  titleEmphasis: 'Haus',
  meta: 'Studio rental · 1,200 sqft',
  rate: '$70',
  rateUnit: '/hr',
}

export const galleryImages = [
  '/assets/studio/DSC07225.jpg',
  '/assets/studio/DSC07257.jpg',
  '/assets/studio/DSC07234.jpg',
  '/assets/portfolio/IMG_2407.jpg',
  '/assets/studio/DSC07225.jpg',
]

export const amenities: StudioAmenity[] = [
  {
    num: '01',
    name: 'Natural-light shooting bay',
    detail: 'East-facing wall, 11ft of glass, sheer curtain control',
  },
  {
    num: '02',
    name: 'Profoto B10 lighting kit',
    detail: '2 strobes, softboxes, modifiers',
  },
  {
    num: '03',
    name: 'Backdrop wall',
    detail: 'Cream, charcoal, and sage in-rotation',
  },
  {
    num: '04',
    name: 'Styled props library',
    detail: 'Glassware, linens, plinths, foliage',
  },
  {
    num: '05',
    name: 'Private changing area',
    detail: 'Steamer, full-length mirror, vanity',
  },
  {
    num: '06',
    name: 'High-speed wifi & tethering',
    detail: 'Capture One ready · live preview to TV',
  },
]

export const includesIntro = {
  label: '— Index 04 / What\'s included',
  headline: 'Pre-styled, plug-and-play.',
  body: 'Everything you need is in the room. Bring talent, bring vision — leave the lighting kit at home.',
}

export const bookingCopy = {
  index: '— Index 05 / Reserve a slot',
  headline: 'Book the Haus.',
  body: 'Pick a date, choose your hours, and you\'re booked. Cancellations free up to 48 hours before. Same-day rates available for urgent shoots — get in touch.',
  primaryCta: 'Book a session →',
  secondaryCta: 'Email us instead',
}

/** May 2026 calendar grid from artboard — row-major, 7 columns (Mon–Sun) */
export const calendarWeekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const

export const calendarInitialMonth = {
  month: 4,
  year: 2026,
  label: 'May',
  yearLabel: '2026',
}

export const calendarDays: CalendarDay[] = [
  { day: 28, muted: true },
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 1 },
  { day: 2, dot: true },
  { day: 3, dot: true },
  { day: 4 },
  { day: 5 },
  { day: 6, dot: true },
  { day: 7 },
  { day: 8 },
  { day: 9, dot: true },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14, dot: true },
  { day: 15 },
  { day: 16 },
  { day: 17, dot: true },
  { day: 18 },
  { day: 19 },
  { day: 20, dot: true },
  { day: 21 },
  { day: 22 },
  { day: 23, dot: true },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29, dot: true },
  { day: 30 },
  { day: 31 },
  { day: 1, muted: true },
]

export const calendarInitialSelectedDay = 8

export function buildCalendarGrid(
  month: number,
  year: number,
): CalendarDay[] {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startOffset = (firstDay.getDay() + 6) % 7
  const days: CalendarDay[] = []

  const prevMonthLast = new Date(year, month, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i -= 1) {
    days.push({ day: prevMonthLast - i, muted: true })
  }

  for (let d = 1; d <= lastDay.getDate(); d += 1) {
    const dot = [2, 3, 6, 9, 14, 17, 20, 23, 29].includes(d) && month === 4 && year === 2026
    days.push({ day: d, dot })
  }

  let nextDay = 1
  while (days.length % 7 !== 0) {
    days.push({ day: nextDay, muted: true })
    nextDay += 1
  }

  return days
}

export function formatMonthYear(month: number, year: number): { month: string; year: string } {
  const date = new Date(year, month, 1)
  return {
    month: date.toLocaleString('en-US', { month: 'long' }),
    year: String(year),
  }
}
