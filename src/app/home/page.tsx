import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Web Design & Development in Egypt',
  description: 'We build fast, professional websites for businesses in Egypt — online booking, WhatsApp integration, and Google-ready SEO. Delivered in 2 weeks.',
}

export default function HomePage() {
  return <HomeClient />
}
