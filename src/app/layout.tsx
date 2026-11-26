import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider } from '@/components/CartProvider';
import { Footer } from '@/components/Footer';
import { ShowcaseCTA } from '@/components/ShowcaseCTA';
import { Header } from '@/components/Header';
import { site } from '@/content/site';
import './globals.css';

// Font di-self-host di repo (tidak bergantung ke Google Fonts saat build).
const jost = localFont({ src: '../fonts/Jost-Variable.woff2', weight: '100 900', variable: '--font-jost', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline} 2027`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', locale: 'id_ID', siteName: site.name },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = { themeColor: '#1f3a2e' };

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: `+${site.contact.whatsapp}`,
  address: { '@type': 'PostalAddress', streetAddress: site.contact.address, addressLocality: site.city, addressCountry: 'ID' },
  sameAs: [site.contact.instagram],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={jost.variable}>
      <body>
        <CartProvider>
          <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-brand focus:px-4 focus:py-2 focus:text-white">
            Langsung ke konten
          </a>
          <Header />
          <main id="konten">{children}</main>
          <Footer />
          <ShowcaseCTA />
          <CartDrawer />
        </CartProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
