import type { Metadata, Viewport } from 'next'
import { Rubik, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import TerminalModal from '@/components/TerminalModal'
import CommandPalette from '@/components/CommandPalette'
import ScrollProgress from '@/components/ScrollProgress'
import WebGLBackgroundDynamic from '@/components/WebGLBackgroundDynamic'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const rubik = Rubik({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '500', '600', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-headline', weight: ['500', '600', '700'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://sabarnasaha.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Sabarna Saha | AI/ML Engineer',
    template: '%s | Sabarna Saha',
  },
  description:
    'AI/ML Engineer specializing in Retrieval-Augmented Generation, deep learning, and NLP. Power Engineering @ Jadavpur University. Building intelligent systems that bridge research and real-world impact.',
  applicationName: 'Sabarna Saha · Portfolio',
  authors: [{ name: 'Sabarna Saha', url: SITE_URL }],
  creator: 'Sabarna Saha',
  keywords: [
    'Sabarna Saha',
    'AI Engineer',
    'Machine Learning Engineer',
    'RAG',
    'Deep Learning',
    'NLP',
    'LLM',
    'TensorFlow',
    'Jadavpur University',
    'Portfolio',
  ],
  icons: { icon: '/logo.png' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Sabarna Saha | AI/ML Engineer',
    description:
      'Building RAG systems, deep-learning models & production AI. Power Engineering @ Jadavpur University.',
    siteName: 'Sabarna Saha · Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sabarna Saha | AI/ML Engineer',
    description: 'Building RAG systems, deep-learning models & production AI.',
  },
}

export const viewport: Viewport = {
  themeColor: '#150f23',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth dark">
      {/* 
        We use suppressHydrationWarning to prevent warnings from some 
        browser extensions modifying the body classes/attributes.
      */}
      <body className={`${rubik.variable} ${spaceGrotesk.variable} relative font-body antialiased`}>
        {/* WebGL Background */}
        <WebGLBackgroundDynamic />

        {/* Progress Bar */}
        <ScrollProgress />

        {/* Grain Overlay */}
        <div className="grain-overlay"></div>
        
        {/* Navigation */}
        <Navbar />
        <TerminalModal />
        <CommandPalette />

        {/* Page Content */}
        <main className="relative z-10 w-full flex flex-col">
          {children}
        </main>
        
        {/* Vercel Metrics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
