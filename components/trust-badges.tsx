import { ShieldCheck, Zap, RefreshCw, Headset, Lock, BadgeCheck } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, label: 'SSL Secure Checkout' },
  { icon: Zap, label: 'Fast Delivery' },
  { icon: RefreshCw, label: 'Refill Guarantee' },
  { icon: Headset, label: '24/7 Support' },
  { icon: Lock, label: 'No Password Needed' },
  { icon: BadgeCheck, label: 'Real Engagement' },
]

export function TrustBadges() {
  return (
    <section className="border-y border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground"
            >
              <b.icon className="size-5 shrink-0 text-primary" />
              <span className="text-pretty">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
