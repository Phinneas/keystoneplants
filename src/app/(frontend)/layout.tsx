import type { Metadata } from 'next'
import { Figtree, Noto_Sans } from 'next/font/google'
import Link from 'next/link'
import { LivingEnvironment, NightModeToggle } from '@/components/LivingEnvironment'
import { RootSystemScroll } from '@/components/RootSystemScroll'
import { PollinatorField } from '@/components/PollinatorField'
import { SeedDispersal } from '@/components/SeedDispersal'
import './globals.css'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-figtree' })
const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: { default: 'Keystone Nurseries', template: '%s | Keystone Nurseries' },
  description: 'Find native plant nurseries near you. Discover native plants across America.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col living-shell font-[var(--font-noto)]">
        <LivingEnvironment />
        <RootSystemScroll />
        <PollinatorField />
        <SeedDispersal />
        <header className="living-header sticky top-0 z-30 border-b px-6 py-4">
          <nav className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-[var(--primary)] font-[var(--font-figtree)]"
            >
              Keystone Nurseries
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex gap-4 text-sm living-copy-muted">
                <Link href="/nurseries" className="hover:text-[var(--primary)] transition-colors">
                  Nurseries
                </Link>
                <Link href="/plants" className="hover:text-[var(--primary)] transition-colors">
                  Plants
                </Link>
                <Link href="/ecoregions" className="hover:text-[var(--primary)] transition-colors">
                  Ecoregions
                </Link>
                <Link href="/quiz" className="hover:text-[var(--primary)] transition-colors">
                  Plant Quiz
                </Link>
                <Link href="/states" className="hover:text-[var(--primary)] transition-colors">
                  By State
                </Link>
                <Link href="/canada" className="hover:text-[var(--primary)] transition-colors">
                  Canada
                </Link>
                <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
                  Blog
                </Link>
              </div>
              <NightModeToggle />
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="living-footer px-6 py-10 text-sm text-[#D3F9B5]">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-bold text-base font-[var(--font-figtree)]">Keystone Nurseries</p>
            <p className="text-[#a8d18a]">
              Nursery data sourced from public records and community submissions.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
