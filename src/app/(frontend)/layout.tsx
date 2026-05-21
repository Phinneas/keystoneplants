import type { Metadata } from 'next'
import { Figtree, Noto_Sans } from 'next/font/google'
import Link from 'next/link'
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
      <body className="min-h-full flex flex-col bg-white text-[#3D0C11] font-[var(--font-noto)]">
        <header className="border-b border-[#e8f5d8] bg-white px-6 py-4">
          <nav className="max-w-5xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-[#3D0C11] font-[var(--font-figtree)]"
            >
              Keystone Nurseries
            </Link>
            <div className="flex gap-6 text-sm text-[#6b5b5d]">
              <Link href="/nurseries" className="hover:text-[#3D0C11] transition-colors">
                Nurseries
              </Link>
              <Link href="/plants" className="hover:text-[#3D0C11] transition-colors">
                Plants
              </Link>
              <Link href="/states" className="hover:text-[#3D0C11] transition-colors">
                By State
              </Link>
              <Link href="/blog" className="hover:text-[#3D0C11] transition-colors">
                Blog
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer
          className="px-6 py-10 text-sm text-[#D3F9B5]"
          style={{ background: 'linear-gradient(135deg, #3D0C11 0%, #2d5016 100%)' }}
        >
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
