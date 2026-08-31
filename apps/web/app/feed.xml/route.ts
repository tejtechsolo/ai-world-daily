import { NextResponse } from 'next/server'

export function GET() {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>AI &amp; World Daily</title><link>${base}</link><description>AI, technology, India, world affairs and business.</description></channel></rss>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}
