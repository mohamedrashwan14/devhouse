import type { Metadata } from 'next'
import FreeAuditClient from './FreeAuditClient'

export const metadata: Metadata = {
  title: 'Free Website Audit for Egyptian Businesses',
  description: 'Get a free personalized video audit of your website within 48 hours. No cost, no commitment.',
}

export default function FreeAuditPage() {
  return <FreeAuditClient />
}
