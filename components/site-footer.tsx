import Link from 'next/link'
import { TrendingUp } from 'lucide-react'

export function CtaBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'radial-gradient(50% 80% at 50% 0%, oklch(0.83 0.19 150 / 0.16), transparent 70%)',
          }}
          aria-hidden
        />
        <h2 className="relative text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to grow your reach?
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-pretty leading-relaxed text-muted-foreground">
          Join 2,300+ US &amp; UK brands scaling their social presence with Ascend. Launch your
          first campaign in minutes.
        </p>
        <Link
          href="#pricing"
          className="relative mt-8 inline-flex items-center justify-center rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Explore packages
        </Link>
      </div>
    </section>
  )
}

const cols = [
  {
    title: 'Platforms',
    links: ['Instagram', 'TikTok', 'YouTube', 'Spotify'],
  },
  {
    title: 'Company',
    links: ['About', 'Results', 'Reviews', 'Contact'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Refund Policy', 'Support'],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <TrendingUp className="size-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">Ascend</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium social growth for ambitious US &amp; UK brands. Real reach, transparent
              pricing, measurable results.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-display text-sm font-semibold">{c.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Ascend Digital Growth. All rights reserved.</p>
          <p>Made for brands in the US &amp; UK.</p>
        </div>
      </div>
    </footer>
  )
}
