import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FulfillOS | Warehouse Control Tower',
  description: 'FulfillOS is a radiant warehouse command center for faster, smarter operations.',
  generator: 'v0.app',
  keywords: ['warehouse operations', 'fulfillment intelligence', 'inventory control tower', 'logistics dashboard'],
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070910',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
