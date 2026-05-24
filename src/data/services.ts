export type ServiceTeaser = {
  num: string
  title: string
  description: string
  image: string
}

export type ServiceRow = {
  num: string
  label: string
  title: string
  titleEmphasis: string
  lede: string
  body: string
  includes: string[]
  priceLabel: string
  priceValue: string
  priceDetail: string
  cta: string
  ctaPath: string
  ctaExternal?: boolean
}

export type ProcessStep = {
  num: string
  title: string
  description: string
}

export const serviceTeasers: ServiceTeaser[] = [
  {
    num: '— 01 / Strategy',
    title: 'Brand Strategy',
    description:
      'Strategic storytelling designed for growth and market authority. Positioning, tone, and visual direction.',
    image: '/assets/studio/DSC07234.jpg',
  },
  {
    num: '— 02 / Content',
    title: 'Content Creation',
    description:
      'Monthly content systems, campaign drops, and long-form editorial — produced in studio, delivered for every channel.',
    image: '/assets/portfolio/IMG_2407.jpg',
  },
  {
    num: '— 03 / Photography',
    title: 'Photography',
    description:
      'Personal brand portraits, product photography, and campaign work — composed and lit with magazine standards.',
    image: '/assets/studio/DSC07257.jpg',
  },
]

export const serviceRows: ServiceRow[] = [
  {
    num: '01.',
    label: '— Standard Photoshoot',
    title: 'Standard',
    titleEmphasis: 'Photoshoot',
    lede:
      'A full 90-minute studio session for brands, founders, and creatives who need a polished image set with room for range.',
    body: 'This is the stronger choice when the session needs more than a quick headshot. The pace allows for guided direction, one to two outfit changes, and a clean mix of portraits, lifestyle frames, and brand-ready visuals. It is built for website refreshes, launch content, professional profiles, and social assets that need to feel consistent instead of pieced together.',
    includes: [
      '90-minute studio session',
      '15 edited images',
      '1-2 outfit changes',
      'Guided posing and direction',
      'Studio access included',
      'Best for brand updates and founder content',
    ],
    priceLabel: 'Session',
    priceValue: '$550',
    priceDetail: '· 90 minutes',
    cta: 'Book standard session →',
    ctaPath: 'https://lbbrandhaus.nuvoro.net/business/lbbrandhaus/service/standard-photoshoot',
    ctaExternal: true,
  },
  {
    num: '02.',
    label: '— Express Photoshoot',
    title: 'Express',
    titleEmphasis: 'Photoshoot',
    lede:
      'A short, intentional 30-minute session for quick professional visuals without overbuilding the production.',
    body: 'This session is made for simple needs: a refreshed profile image, a clean announcement photo, a small batch of social content, or a fast visual update before a launch. The setup stays streamlined, the direction is clear, and the result is a tight set of edited images that still feels considered.',
    includes: [
      '30-minute studio session',
      '5 edited images',
      'Simple clean setup',
      'Guided posing',
      'Efficient image selection',
      'Best for headshots and quick updates',
    ],
    priceLabel: 'Session',
    priceValue: '$150',
    priceDetail: '· 30 minutes',
    cta: 'Book express session →',
    ctaPath: 'https://lbbrandhaus.nuvoro.net/business/lbbrandhaus/service/professional-headshot-session',
    ctaExternal: true,
  },
  {
    num: '03.',
    label: '— Discovery Call',
    title: 'Business',
    titleEmphasis: 'Discovery',
    lede:
      'A focused call to understand your brand, goals, and the next stage of growth before recommending a creative direction.',
    body: 'Use this call when you are not sure whether you need strategy, content, photography, or a mix of support. The conversation gives space to clarify what is working, where the brand feels unclear, and what kind of creative work would move the business forward. It is a low-pressure first step before a larger engagement.',
    includes: [
      '15-minute business discovery call',
      'Brand and growth context review',
      'Goal and priority clarification',
      'Recommended next step',
      'Best for new business inquiries',
      'No-cost starting point',
    ],
    priceLabel: 'Free',
    priceValue: '',
    priceDetail: '· 15 minutes',
    cta: 'Book discovery call →',
    ctaPath: 'https://lbbrandhaus.nuvoro.net/business/lbbrandhaus/service/discovery-call-for-businesses/book',
    ctaExternal: true,
  },
  {
    num: '04.',
    label: '— Studio Rental',
    title: 'Studio',
    titleEmphasis: 'Rental',
    lede:
      'A clean, versatile studio space for creators, photographers, brands, and entrepreneurs producing high-quality content.',
    body: 'The Haus is designed to make content days easier: a polished environment, flexible shooting corners, and a professional setting that does not need heavy styling before you start. It works for brand sessions, product content, social shoots, portraits, reels, and small creative productions that need a dependable space.',
    includes: [
      '1-hour studio rental',
      'Clean natural-light environment',
      'Flexible content space',
      'Ideal for photo, video, and social content',
      'Useful for creators and small teams',
      'Booking path for hourly sessions',
    ],
    priceLabel: 'Rate',
    priceValue: '$70',
    priceDetail: '· 1 hour',
    cta: 'Reserve studio time →',
    ctaPath: 'https://lbbrandhaus.nuvoro.net/business/lbbrandhaus/service/studio-rental/book',
    ctaExternal: true,
  },
  {
    num: '05.',
    label: '— Content Creation',
    title: 'Content',
    titleEmphasis: 'Creation',
    lede:
      'Built for brands that want to show up consistently with visuals that feel clear, current, and ready to use.',
    body: 'This offer supports the businesses that know content matters but do not want every post, image, or campaign asset to become a last-minute scramble. The work can include photo and video content, creative direction, and social-ready visuals shaped around the way the brand needs to be seen.',
    includes: [
      'Photo and video content direction',
      'Social-ready visuals',
      'Campaign or recurring content support',
      'Creative concept guidance',
      'Studio-based production options',
      'Best for consistent brand presence',
    ],
    priceLabel: 'Custom',
    priceValue: '',
    priceDetail: '· inquiry based',
    cta: 'Make an inquiry →',
    ctaPath: '/contact',
  },
  {
    num: '06.',
    label: '— Brand Strategy',
    title: 'Brand',
    titleEmphasis: 'Strategy',
    lede:
      'Clarity before content: a strategy-led offer for brands that need sharper messaging, positioning, and direction.',
    body: 'Before more visuals are made, this work helps define what the brand is trying to say, who it is speaking to, and how it should show up. It is useful for founders, service providers, and growing businesses that feel their content is active but not focused. The outcome is a clearer foundation for creative decisions.',
    includes: [
      'Messaging and positioning review',
      'Brand direction deep dive',
      'Audience and offer clarity',
      'Content direction guidance',
      'Strategic next-step recommendations',
      'Best before a content or website refresh',
    ],
    priceLabel: 'Custom',
    priceValue: '',
    priceDetail: '· discovery led',
    cta: 'Book a discovery call →',
    ctaPath: 'https://lbbrandhaus.nuvoro.net/business/lbbrandhaus/service/discovery-call-for-businesses',
    ctaExternal: true,
  },
]

export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: 'Vision Session',
    description:
      'We sit down — in person or via video — to uncover your brand\'s core story, aesthetic goals, and the message you need to convey. You leave with a creative roadmap and a date on the calendar.',
  },
  {
    num: '02',
    title: 'Studio Experience',
    description:
      'Step into a curated, natural-light environment built for total focus. We handle lighting, composition, and flow so you can show up as the face of your brand — confident and at ease.',
  },
  {
    num: '03',
    title: 'Final Delivery',
    description:
      'Within communicated timeframes, you receive a gallery of high-resolution, retouched assets optimized for your channels. Visuals built to drive engagement and earn the authority your brand deserves.',
  },
]
