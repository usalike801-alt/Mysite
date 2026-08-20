import type { PlatformId } from '@/lib/data'
import { cn } from '@/lib/utils'

const tone: Record<PlatformId, string> = {
  instagram: 'text-chart-5',
  tiktok: 'text-chart-2',
  youtube: 'text-destructive',
  spotify: 'text-primary',
}

function Glyph({ platform }: { platform: PlatformId }) {
  switch (platform) {
    case 'instagram':
      return (
        <>
          <rect x="2" y="2" width="20" height="20" rx="5.5" />
          <circle cx="12" cy="12" r="4.2" />
          <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
        </>
      )
    case 'tiktok':
      return (
        <path d="M14 4c.4 2.3 1.9 3.9 4 4.2v3c-1.6 0-3-.5-4-1.3v5.6a5.5 5.5 0 1 1-5.5-5.5c.3 0 .6 0 .9.1v3.1a2.5 2.5 0 1 0 1.6 2.3V4H14Z" />
      )
    case 'youtube':
      return (
        <>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="M10 9.2v5.6l5-2.8-5-2.8Z" fill="currentColor" stroke="none" />
        </>
      )
    case 'spotify':
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M7.5 9.2c3-.8 6.2-.5 8.8 1" />
          <path d="M8 12.4c2.4-.6 4.9-.4 7 .9" />
          <path d="M8.5 15.4c1.9-.5 3.8-.3 5.5.7" />
        </>
      )
  }
}

export function PlatformIcon({
  platform,
  className,
  colored = false,
}: {
  platform: PlatformId
  className?: string
  colored?: boolean
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-4', colored && tone[platform], className)}
      aria-hidden
    >
      <Glyph platform={platform} />
    </svg>
  )
}
