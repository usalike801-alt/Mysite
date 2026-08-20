import { MousePointerClick, Link2, Rocket, LineChart, Target, Globe2, Clock } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    title: 'Choose a package',
    body: 'Pick your platform and the growth tier that fits your goals and budget.',
  },
  {
    icon: Link2,
    title: 'Paste your link',
    body: 'Drop in your profile, video, or track URL. No passwords, ever.',
  },
  {
    icon: Rocket,
    title: 'We launch it',
    body: 'Your campaign goes live within minutes with a natural delivery drip.',
  },
  {
    icon: LineChart,
    title: 'Track results',
    body: 'Watch progress in real time from your private client portal.',
  },
]

const highlights = [
  {
    icon: Target,
    title: 'Niche & geo targeting',
    body: 'Reach the right audience by country, interest, and demographic for US & UK campaigns.',
  },
  {
    icon: Globe2,
    title: 'Real, active profiles',
    body: 'We prioritize authentic engagement that survives platform sweeps and looks organic.',
  },
  {
    icon: Clock,
    title: 'Retention & refills',
    body: 'Every premium plan includes drop protection and free refills for peace of mind.',
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">How it works</p>
        <h2 className="mt-3 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
          From link to lift-off in four steps
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          A frictionless flow designed for busy founders and marketing teams. No dashboards to
          learn, no risky logins to share.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <span className="font-display text-sm font-bold text-primary">
              {String(i + 1).padStart(2, '0')}
            </span>
            <s.icon className="mt-4 size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>

      <div id="results" className="mt-6 grid gap-4 sm:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="rounded-2xl border border-border bg-card/60 p-6">
            <h.icon className="size-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-semibold">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
