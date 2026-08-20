import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'
import type { PlatformId } from '@/lib/data'

const liveStats: { platform: PlatformId; label: string; value: string; delta: string }[] = [
  { platform: 'instagram', label: 'Instagram followers', value: '+48,120', delta: '+12.4%' },
  { platform: 'tiktok', label: 'TikTok views', value: '+1.2M', delta: '+31.8%' },
  { platform: 'spotify', label: 'Spotify streams', value: '+320K', delta: '+18.2%' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(60% 50% at 50% 0%, oklch(0.83 0.19 150 / 0.14), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-24 lg:pb-28">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Trusted growth partner for US &amp; UK brands
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Elevate Your Brand&apos;s Social Reach
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premium, transparent social growth for Instagram, TikTok, YouTube, and Spotify.
            Real reach, measurable results, and secure checkout — no panels, no gimmicks.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              View packages
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="#how"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              How it works
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              Secure checkout
            </span>
            <span className="inline-flex items-center gap-2">
              <TrendingUp className="size-4 text-primary" />
              4.9/5 from 2,300+ brands
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Campaign performance</p>
                <p className="font-display text-2xl font-bold">Live growth</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary" />
                Active
              </span>
            </div>

            <div className="mt-5 flex items-end gap-1.5">
              {[38, 45, 40, 58, 52, 66, 61, 78, 72, 88, 84, 96].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-primary/70"
                  style={{ height: `${h}px`, opacity: 0.35 + (i / 12) * 0.65 }}
                />
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {liveStats.map((s) => (
                <div
                  key={s.platform}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-background/60 px-3 py-2.5"
                >
                  <span className="flex items-center gap-2.5 text-sm font-medium">
                    <PlatformIcon platform={s.platform} colored className="size-4" />
                    {s.label}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">{s.value}</span>
                    <span className="rounded-md bg-primary/15 px-1.5 py-0.5 text-xs font-semibold text-primary">
                      {s.delta}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
