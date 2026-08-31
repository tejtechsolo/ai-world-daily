import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'AI & World Daily', template: '%s | AI & World Daily' },
  description: 'Independent, source-backed coverage of AI, technology, India, world affairs and business.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
