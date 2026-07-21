import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact DevHouse — Web Design in Egypt',
  description: 'Talk to us on WhatsApp about your website. Based in Egypt, serving businesses nationwide.',
}

export default function ContactPage() {
  return <ContactClient />
}
