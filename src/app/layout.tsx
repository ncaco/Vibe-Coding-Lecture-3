import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/context/providers'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://vibe-coding-lecture-3.vercel.app'),
  title: 'Vibe – Plan and build products',
  description: 'Vibe streamlines design and development. Purpose-built for modern product development.',
  keywords: 'design system, components, UI, React, Next.js, TypeScript',
  openGraph: {
    title: 'Vibe – Plan and build products',
    description: 'Vibe streamlines design and development. Purpose-built for modern product development.',
    type: 'website',
    locale: 'ko_KR',
    url: 'https://vibe-coding-lecture-3.vercel.app',
    siteName: 'Vibe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe – Plan and build products',
    description: 'Vibe streamlines design and development. Purpose-built for modern product development.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
