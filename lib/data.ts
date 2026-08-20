export type PlatformId = 'instagram' | 'tiktok' | 'youtube' | 'spotify'

export type Platform = {
  id: PlatformId
  name: string
  tagline: string
  unit: string
  handleLabel: string
  handlePlaceholder: string
}

export type Package = {
  id: string
  platform: PlatformId
  service: string
  amount: number
  price: number
  popular?: boolean
  delivery: string
  features: string[]
}

export const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Followers, likes & reach that compound.',
    unit: 'Followers',
    handleLabel: 'Instagram profile URL or @handle',
    handlePlaceholder: 'https://instagram.com/yourbrand',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'Go viral with authentic engagement.',
    unit: 'Followers',
    handleLabel: 'TikTok profile URL or @handle',
    handlePlaceholder: 'https://tiktok.com/@yourbrand',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'Subscribers & watch-time that stick.',
    unit: 'Subscribers',
    handleLabel: 'YouTube channel or video URL',
    handlePlaceholder: 'https://youtube.com/@yourbrand',
  },
  {
    id: 'spotify',
    name: 'Spotify',
    tagline: 'Streams & monthly listeners that chart.',
    unit: 'Streams',
    handleLabel: 'Spotify track or artist URL',
    handlePlaceholder: 'https://open.spotify.com/artist/...',
  },
]

export const packages: Package[] = [
  // Instagram
  {
    id: 'ig-starter',
    platform: 'instagram',
    service: 'Followers',
    amount: 1000,
    price: 19,
    delivery: '1–2 days',
    features: ['Real, active profiles', 'Gradual natural drip', 'No password required'],
  },
  {
    id: 'ig-growth',
    platform: 'instagram',
    service: 'Followers',
    amount: 5000,
    price: 79,
    popular: true,
    delivery: '2–4 days',
    features: ['Premium targeted profiles', 'Retention guarantee', 'Priority support'],
  },
  {
    id: 'ig-scale',
    platform: 'instagram',
    service: 'Followers',
    amount: 25000,
    price: 299,
    delivery: '5–10 days',
    features: ['Dedicated campaign manager', 'Geo & niche targeting', 'Lifetime refill'],
  },
  // TikTok
  {
    id: 'tt-starter',
    platform: 'tiktok',
    service: 'Followers',
    amount: 2000,
    price: 24,
    delivery: '1–2 days',
    features: ['Authentic engagement', 'Natural drip delivery', 'No password required'],
  },
  {
    id: 'tt-growth',
    platform: 'tiktok',
    service: 'Followers',
    amount: 10000,
    price: 99,
    popular: true,
    delivery: '2–4 days',
    features: ['For-you-page boost', 'Retention guarantee', 'Priority support'],
  },
  {
    id: 'tt-scale',
    platform: 'tiktok',
    service: 'Followers',
    amount: 50000,
    price: 349,
    delivery: '5–10 days',
    features: ['Viral campaign strategy', 'Dedicated manager', 'Lifetime refill'],
  },
  // YouTube
  {
    id: 'yt-starter',
    platform: 'youtube',
    service: 'Subscribers',
    amount: 500,
    price: 39,
    delivery: '2–4 days',
    features: ['Real subscribers', 'Safe gradual delivery', 'No password required'],
  },
  {
    id: 'yt-growth',
    platform: 'youtube',
    service: 'Subscribers',
    amount: 2500,
    price: 149,
    popular: true,
    delivery: '5–7 days',
    features: ['Watch-time boost', 'Retention guarantee', 'Priority support'],
  },
  {
    id: 'yt-scale',
    platform: 'youtube',
    service: 'Subscribers',
    amount: 10000,
    price: 499,
    delivery: '10–20 days',
    features: ['Monetization-ready growth', 'Dedicated manager', 'Lifetime refill'],
  },
  // Spotify
  {
    id: 'sp-starter',
    platform: 'spotify',
    service: 'Streams',
    amount: 10000,
    price: 29,
    delivery: '3–5 days',
    features: ['Royalty-eligible streams', 'Organic playlist placement', 'Safe delivery'],
  },
  {
    id: 'sp-growth',
    platform: 'spotify',
    service: 'Streams',
    amount: 50000,
    price: 119,
    popular: true,
    delivery: '7–14 days',
    features: ['Editorial-style playlists', 'Monthly listener lift', 'Priority support'],
  },
  {
    id: 'sp-scale',
    platform: 'spotify',
    service: 'Streams',
    amount: 250000,
    price: 449,
    delivery: '20–30 days',
    features: ['Full campaign strategy', 'Dedicated manager', 'Chart-focused targeting'],
  },
]

export type OrderStatus = 'processing' | 'in-progress' | 'completed'

export type Order = {
  id: string
  platform: PlatformId
  service: string
  amount: number
  target: string
  status: OrderStatus
  progress: number
  date: string
  price: number
}

export const mockOrders: Order[] = [
  {
    id: 'ASC-10428',
    platform: 'instagram',
    service: 'Followers',
    amount: 5000,
    target: '@nova.studio',
    status: 'in-progress',
    progress: 62,
    date: '2026-08-18',
    price: 79,
  },
  {
    id: 'ASC-10391',
    platform: 'tiktok',
    service: 'Followers',
    amount: 10000,
    target: '@nova.studio',
    status: 'completed',
    progress: 100,
    date: '2026-08-11',
    price: 99,
  },
  {
    id: 'ASC-10366',
    platform: 'spotify',
    service: 'Streams',
    amount: 50000,
    target: 'Midnight Drive — Single',
    status: 'completed',
    progress: 100,
    date: '2026-08-04',
    price: 119,
  },
  {
    id: 'ASC-10502',
    platform: 'youtube',
    service: 'Subscribers',
    amount: 2500,
    target: '@novastudio',
    status: 'processing',
    progress: 8,
    date: '2026-08-20',
    price: 149,
  },
]

export function platformName(id: PlatformId) {
  return platforms.find((p) => p.id === id)?.name ?? id
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}
