'use client'

import { useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'
import { CheckoutModal } from '@/components/checkout-modal'
import {
  packages,
  platforms,
  formatNumber,
  type Package,
  type PlatformId,
} from '@/lib/data'
import { cn } from '@/lib/utils'

export function Pricing() {
  const [active, setActive] = useState<PlatformId>('instagram')
  const [checkout, setCheckout] = useState<Package | null>(null)

  const platform = platforms.find((p) => p.id === active)!
  const tiers = packages.filter((p) => p.platform === active)

  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Transparent packages for every platform
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          Flat pricing, no subscriptions, no surprises. Choose your platform and scale when
          you&apos;re ready.
        </p>
      </div>

      {/* Platform switcher */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {platforms.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors',
              active === p.id
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-border bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            <PlatformIcon platform={p.id} colored={active === p.id} className="size-4" />
            {p.name}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">{platform.tagline}</p>

      {/* Cards */}
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.id}
            className={cn(
              'relative flex flex-col rounded-2xl border bg-card p-6 transition-all',
              t.popular
                ? 'border-primary shadow-2xl shadow-primary/10 md:-translate-y-2'
                : 'border-border hover:border-primary/40',
            )}
          >
            {t.popular && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                <Zap className="size-3" />
                Most popular
              </span>
            )}
            <p className="text-sm font-medium text-muted-foreground">{t.service}</p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight">
              {formatNumber(t.amount)}
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-display text-3xl font-bold">${t.price}</span>
              <span className="text-sm text-muted-foreground">one-time</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Delivery in {t.delivery}</p>

            <ul className="mt-5 flex flex-col gap-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setCheckout(t)}
              className={cn(
                'mt-6 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5',
                t.popular
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background hover:bg-accent',
              )}
            >
              Choose plan
            </button>
          </div>
        ))}
      </div>

      <CheckoutModal pkg={checkout} onClose={() => setCheckout(null)} />
    </section>
  )
}
