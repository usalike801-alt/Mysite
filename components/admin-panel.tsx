'use client'

import { useMemo, useState } from 'react'
import {
  LayoutDashboard,
  Package as PackageIcon,
  Settings2,
  ShoppingCart,
  DollarSign,
  Activity,
  Users,
  Save,
} from 'lucide-react'
import { PlatformIcon } from '@/components/platform-icon'
import { StatusBadge } from '@/components/status-badge'
import { Logo } from '@/components/site-header'
import { packages, mockOrders, platforms, formatNumber } from '@/lib/data'
import { cn } from '@/lib/utils'

type Tab = 'overview' | 'orders' | 'pricing' | 'api'

const nav: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'pricing', label: 'Pricing', icon: PackageIcon },
  { id: 'api', label: 'API Config', icon: Settings2 },
]

export function AdminPanel() {
  const [tab, setTab] = useState<Tab>('overview')
  const [prices, setPrices] = useState<Record<string, number>>(() =>
    Object.fromEntries(packages.map((p) => [p.id, p.price])),
  )
  const [saved, setSaved] = useState(false)

  const revenue = useMemo(() => mockOrders.reduce((s, o) => s + o.price, 0), [])

  function updatePrice(id: string, value: number) {
    setPrices((prev) => ({ ...prev, [id]: value }))
    setSaved(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                tab === item.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <p className="text-xs text-muted-foreground">Signed in as</p>
          <p className="text-sm font-semibold">admin@ascend.io</p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
          <div>
            <h1 className="font-display text-lg font-bold capitalize">{tab}</h1>
            <p className="text-xs text-muted-foreground">Admin control panel</p>
          </div>
          <div className="flex gap-2 md:hidden">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  tab === item.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent',
                )}
                aria-label={item.label}
              >
                <item.icon className="size-4" />
              </button>
            ))}
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {tab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Revenue (30d)', value: `$${formatNumber(revenue)}`, icon: DollarSign },
                  { label: 'Active orders', value: '2', icon: Activity },
                  { label: 'Total orders', value: String(mockOrders.length), icon: ShoppingCart },
                  { label: 'Clients', value: '2,318', icon: Users },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                      <s.icon className="size-4 text-primary" />
                    </div>
                    <p className="mt-3 font-display text-2xl font-bold">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="font-display text-lg font-semibold">Recent orders</h2>
                <div className="mt-4 flex flex-col divide-y divide-border">
                  {mockOrders.map((o) => (
                    <div key={o.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <PlatformIcon platform={o.platform} colored className="size-4" />
                        <div>
                          <p className="text-sm font-medium">
                            {formatNumber(o.amount)} {o.service}
                          </p>
                          <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                        </div>
                      </div>
                      <StatusBadge status={o.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border text-left text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-medium">Order</th>
                      <th className="px-5 py-3 font-medium">Service</th>
                      <th className="px-5 py-3 font-medium">Target</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-accent/40">
                        <td className="px-5 py-3 font-mono text-xs">{o.id}</td>
                        <td className="px-5 py-3">
                          <span className="flex items-center gap-2">
                            <PlatformIcon platform={o.platform} colored className="size-4" />
                            {formatNumber(o.amount)} {o.service}
                          </span>
                        </td>
                        <td className="max-w-[160px] truncate px-5 py-3 text-muted-foreground">
                          {o.target}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={o.status} />
                        </td>
                        <td className="px-5 py-3 text-right font-semibold">${o.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'pricing' && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Adjust package prices across all platforms. Changes are demo-only.
                </p>
                <button
                  onClick={() => setSaved(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Save className="size-4" />
                  {saved ? 'Saved' : 'Save changes'}
                </button>
              </div>
              {platforms.map((pf) => (
                <div key={pf.id} className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2 font-display font-semibold">
                    <PlatformIcon platform={pf.id} colored className="size-4" />
                    {pf.name}
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {packages
                      .filter((p) => p.platform === pf.id)
                      .map((p) => (
                        <div
                          key={p.id}
                          className="rounded-xl border border-border bg-background p-4"
                        >
                          <p className="text-sm font-medium">
                            {formatNumber(p.amount)} {p.service}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <span className="text-muted-foreground">$</span>
                            <input
                              type="number"
                              min={0}
                              value={prices[p.id]}
                              onChange={(e) => updatePrice(p.id, Number(e.target.value))}
                              className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'api' && (
            <div className="flex max-w-2xl flex-col gap-5">
              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display font-semibold">Supplier API</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Connect your upstream provider for automated fulfillment.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <div>
                    <label className="text-sm font-medium">API Endpoint URL</label>
                    <input
                      defaultValue="https://api.provider.com/v2"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <input
                      type="password"
                      defaultValue="sk_live_placeholder_key"
                      className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none transition-colors focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-5">
                <h3 className="font-display font-semibold">Payment gateways</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">Stripe</p>
                      <p className="text-xs text-muted-foreground">Credit &amp; debit cards</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                    <div>
                      <p className="text-sm font-medium">Coinbase Commerce</p>
                      <p className="text-xs text-muted-foreground">Crypto payments</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-current" />
                      Not connected
                    </span>
                  </div>
                </div>
              </div>

              <button className="inline-flex w-fit items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                <Save className="size-4" />
                Save configuration
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
