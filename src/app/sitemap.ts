import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://devhouse.dev'
  const pages = ['/home', '/about', '/projects', '/contact', '/free-audit']

  return pages.map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '/home' ? 1 : path === '/free-audit' ? 0.9 : 0.7,
  }))
}
