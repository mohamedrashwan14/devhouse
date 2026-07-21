import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About DevHouse — Web Developers in Egypt',
  description: 'Three developers building modern, conversion-focused websites for businesses across Egypt. You talk directly to the people building your site.',
}

export default function AboutPage() {
  return <AboutClient />
}
