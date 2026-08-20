import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { TrustBadges } from '@/components/trust-badges'
import { HowItWorks } from '@/components/features'
import { Pricing } from '@/components/pricing'
import { CtaBand, SiteFooter } from '@/components/site-footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <Pricing />
      <CtaBand />
      <SiteFooter />
    </main>
  )
}
