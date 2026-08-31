import type { MetadataRoute } from 'next'

const categories = ['ai', 'technology', 'india', 'world', 'business', 'science', 'explainers', 'how-to']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const now = new Date()
  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    ...categories.map(slug => ({ url: `${base}/${slug}`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.8 })),
  ]
}
