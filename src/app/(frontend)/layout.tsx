import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Link from "next/link";
import { LivingEnvironment, NightModeToggle } from "@/components/LivingEnvironment";
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
] as const;

export const metadata: Metadata = {
  title: { default: "Keystone Nurseries", template: "%s | Keystone Nurseries" },
  description: "A living field guide for finding native plant nurseries and the plants that belong where you live.",
};

export default function FrontendLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
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
                <NightModeToggle />
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
