'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  X,
  CreditCard,
  Bitcoin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Loader2,
} from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'
import {
  packages,
  platforms,
  formatNumber,
  type Package,
} from '@/lib/data'
import { cn } from '@/lib/utils'

type PayMethod = 'card' | 'crypto'

export function CheckoutModal({
  pkg,
  onClose,
}: {
  pkg: Package | null
  onClose: () => void
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [target, setTarget] = useState('')
  const [email, setEmail] = useState('')
  const [method, setMethod] = useState<PayMethod>('card')
  const [state, setState] = useState<'form' | 'processing' | 'done'>('form')

  useEffect(() => {
    if (pkg) {
      setSelectedId(pkg.id)
      setTarget('')
      setEmail('')
      setMethod('card')
      setState('form')
    }
  }, [pkg])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (pkg) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [pkg, onClose])

  const platform = pkg ? platforms.find((p) => p.id === pkg.platform)! : null

  const tiers = useMemo(
    () => (pkg ? packages.filter((p) => p.platform === pkg.platform) : []),
    [pkg],
  )
  const selected = tiers.find((t) => t.id === selectedId) ?? pkg

  if (!pkg || !platform || !selected) return null

  const canSubmit = target.trim().length > 3 && /.+@.+\..+/.test(email)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    setState('processing')
    setTimeout(() => setState('done'), 1600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Checkout for ${platform.name} ${selected.service}`}
        className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-popover shadow-2xl sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <PlatformIcon platform={platform.id} colored className="size-5" />
            <h2 className="font-display text-lg font-semibold">
              {platform.name} {selected.service}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close checkout"
          >
            <X className="size-5" />
          </button>
        </div>

        {state === 'done' ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <CheckCircle2 className="size-14 text-primary" />
            <h3 className="font-display text-2xl font-bold">Order confirmed</h3>
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
              Your {formatNumber(selected.amount)} {platform.name.toLowerCase()}{' '}
              {selected.service.toLowerCase()} campaign is queued. Track live progress from your
              client portal — a receipt is on its way to {email}.
            </p>
            <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row">
              <a
                href="/portal"
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Go to portal
              </a>
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 overflow-y-auto px-5 py-5">
            {/* Package size */}
            <div>
              <label className="text-sm font-semibold">Package size</label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {tiers.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      'rounded-xl border px-2 py-2.5 text-center transition-colors',
                      t.id === selectedId
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/40',
                    )}
                  >
                    <span className="block font-display text-sm font-bold">
                      {formatNumber(t.amount)}
                    </span>
                    <span className="block text-xs text-muted-foreground">${t.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Target */}
            <div>
              <label htmlFor="target" className="text-sm font-semibold">
                {platform.handleLabel}
              </label>
              <input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder={platform.handlePlaceholder}
                className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3" />
                We never ask for your password.
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                Email for receipt &amp; updates
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                className="mt-2 w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>

            {/* Payment method */}
            <div>
              <label className="text-sm font-semibold">Payment method</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('card')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors',
                    method === 'card'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <CreditCard className="size-4" />
                  Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('crypto')}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition-colors',
                    method === 'crypto'
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:border-primary/40',
                  )}
                >
                  <Bitcoin className="size-4" />
                  Crypto
                </button>
              </div>

              {method === 'card' ? (
                <div className="mt-3 flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-3">
                  <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                    Card number •••• •••• •••• ••••
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                      MM / YY
                    </div>
                    <div className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-muted-foreground">
                      CVC
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Stripe secure card field — placeholder for demo.
                  </p>
                </div>
              ) : (
                <div className="mt-3 flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-3">
                  <p className="text-sm font-medium">Pay with USDT / BTC / ETH</p>
                  <div className="rounded-lg border border-dashed border-border bg-background px-3 py-4 text-center text-sm text-muted-foreground">
                    Crypto wallet address &amp; QR appear here at checkout.
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Coinbase Commerce — placeholder for demo.
                  </p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-border bg-card/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {formatNumber(selected.amount)} {selected.service} · {selected.delivery}
                </span>
                <span className="font-display text-xl font-bold">${selected.price}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit || state === 'processing'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {state === 'processing' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <ShieldCheck className="size-4" />
                  Pay ${selected.price} securely
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
