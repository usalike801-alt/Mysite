'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Search, TrendingUp } from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'
import { StatusBadge } from '@/components/status-badge'
import { Logo } from '@/components/site-header'
import { mockOrders, formatNumber, type OrderStatus } from '@/lib/data'
import { cn } from '@/lib/utils'

const filters: { id: 'all' | OrderStatus; label: string }[] = [
  { id: 'all', label: 'All orders' },
  { id: 'processing', label: 'Processing' },
  { id: 'in-progress', label: 'In progress' },
  { id: 'completed', label: 'Completed' },
]

export function PortalDashboard() {
  const [filter, setFilter] = useState<'all' | OrderStatus>('all')
  const [query, setQuery] = useState('')

  const orders = useMemo(() => {
    return mockOrders.filter((o) => {
      const matchFilter = filter === 'all' || o.status === filter
      const matchQuery =
        query.trim() === '' ||
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.target.toLowerCase().includes(query.toLowerCase())
      return matchFilter && matchQuery
    })
  }, [filter, query])

  const stats = useMemo(() => {
    const active = mockOrders.filter((o) => o.status !== 'completed').length
    const delivered = mockOrders
      .filter((o) => o.status === 'completed')
      .reduce((sum, o) => sum + o.amount, 0)
    const spent = mockOrders.reduce((sum, o) => sum + o.price, 0)
    return { active, delivered, spent, total: mockOrders.length }
  }, [])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted-foreground sm:block">nova.studio</span>
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              NS
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-3xl font-bold tracking-tight">Welcome back, Nova</h1>
          <p className="text-muted-foreground">
            Track your live campaigns and submitted links in one place.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Active campaigns', value: String(stats.active) },
            { label: 'Total orders', value: String(stats.total) },
            { label: 'Delivered', value: formatNumber(stats.delivered) },
            { label: 'Total spent', value: `$${formatNumber(stats.spent)}` },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-2xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  filter === f.id
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search order ID or link…"
              className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary sm:w-64"
            />
          </div>
        </div>

        {/* Orders */}
        <div className="mt-4 flex flex-col gap-3">
          {orders.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-muted-foreground">
              No orders match your filters.
            </div>
          )}
          {orders.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-background">
                    <PlatformIcon platform={o.platform} colored className="size-5" />
                  </span>
                  <div>
                    <p className="font-display font-semibold">
                      {formatNumber(o.amount)} {o.service}
                    </p>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="font-mono text-xs">{o.id}</span>
                      <span aria-hidden>·</span>
                      <span>{o.date}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={o.status} />
                  <span className="font-display font-semibold">${o.price}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <ExternalLink className="size-3.5" />
                  <span className="truncate">{o.target}</span>
                </a>
                <div className="flex w-full items-center gap-3 sm:w-64">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-background">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${o.progress}%` }}
                    />
                  </div>
                  <span className="w-10 text-right text-sm font-semibold">{o.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            <TrendingUp className="size-4" />
            Start a new campaign
          </Link>
        </div>
      </div>
    </div>
  )
}
