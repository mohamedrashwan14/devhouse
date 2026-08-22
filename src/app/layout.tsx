import type { Metadata } from 'next'
import { Inter, Orbitron } from 'next/font/google'
import './globals.css'
import { SiteChrome } from '@/components/SiteChrome'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  metadataBase: new URL('https://devhouse.dev'),
  title: {
    default: 'DevHouse — Web Design & Development in Egypt',
    template: '%s | DevHouse',
  },
  description: 'We build fast, professional websites for businesses in Egypt — online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks.',
  openGraph: {
    type: 'website',
    locale: 'en_EG',
    url: 'https://devhouse.dev',
    siteName: 'DevHouse',
    title: 'DevHouse — Web Design & Development in Egypt',
    description: 'We build fast, professional websites for businesses in Egypt — online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks.',
    images: [{ url: '/static/Images/logoblackb2.png', width: 400, height: 400, alt: 'DevHouse' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@devhouse_eg',
    title: 'DevHouse — Web Design & Development in Egypt',
    description: 'Fast, professional websites for businesses in Egypt. Delivered in 2 weeks.',
    images: ['/static/Images/logoblackb2.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'DevHouse',
  url: 'https://devhouse.dev',
  telephone: '+201143584929',
  email: 'contact@devhouse.dev',
  areaServed: 'EG',
  logo: 'https://devhouse.dev/static/Images/logoblackb2.png',
  sameAs: [
    'https://www.instagram.com/devhouse.eg/',
    'https://www.linkedin.com/company/devhouse-eg',
    'https://x.com/devhouse_eg',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} ${orbitron.variable}`}>
        {children}
        <SiteChrome />
        <Analytics />
      </body>
    </html>
  )
}
