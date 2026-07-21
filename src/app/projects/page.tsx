import type { Metadata } from 'next'
import ProjectsClient from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Our Work — Websites We\'ve Built',
  description: 'Real websites we\'ve delivered for businesses across Egypt, from e-commerce to real estate.',
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
