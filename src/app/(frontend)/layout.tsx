import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LivingEnvironment } from "@/components/LivingEnvironment";
import { LogoGrowIn } from "@/components/LogoGrowIn";
import { SwayingMeadow } from "@/components/SwayingMeadow";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const NAVIGATION = [
  ["Nurseries", "/nurseries"],
  ["Plants", "/plants"],
  ["Ecoregions", "/ecoregions"],
  ["Plant quiz", "/quiz"],
  ["By state", "/states"],
  ["Canada", "/canada"],
  ["Blog", "/blog"],
] as const;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keystonenurseries.com"),
  title: { default: "Keystone Nurseries", template: "%s | Keystone Nurseries" },
  description: "A living field guide for finding native plant nurseries and the plants that belong where you live.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Keystone Nurseries",
  },
};

export default function FrontendLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Keystone Nurseries",
          url: "https://www.keystonenurseries.com",
          description: "A living field guide for finding native plant nurseries and the plants that belong where you live.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.keystonenurseries.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }} />
        <LivingEnvironment />
        <div className="field-shell">
          <header className="field-header">
            <nav className="field-nav" aria-label="Primary navigation">
              <Link href="/" className="field-nav__brand" aria-label="Keystone Nurseries home">
                <LogoGrowIn />
              </Link>

              <div className="field-nav__links">
                {NAVIGATION.map(([label, href]) => (
                  <Link key={href} href={href} className="kn-navlink">
                    {label}
                  </Link>
                ))}
              </div>

              <div className="field-nav__tools">
                <details className="field-nav__more">
                  <summary>Explore</summary>
                  <div>
                    {NAVIGATION.map(([label, href]) => (
                      <Link key={href} href={href} className="kn-navlink">
                        {label}
                      </Link>
                    ))}
                  </div>
                </details>
              </div>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="field-footer">
            <SwayingMeadow />
            <div className="field-footer__inner">
              <div>
                <p className="field-footer__brand">Keystone Nurseries</p>
                <p className="mt-2 text-sm text-white/65">A living field guide for native plant discovery.</p>
                <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55" aria-label="Legal">
                  <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
                  <Link href="/terms" className="transition-colors hover:text-white">Terms of Service</Link>
                </nav>
              </div>
              <p className="field-footer__note">
                Nursery information is gathered from public records and community submissions. Help the guide grow by sharing a nursery near you.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
