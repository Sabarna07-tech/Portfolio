import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import TerminalModal from '@/components/TerminalModal'
import BackgroundParticles from '@/components/BackgroundParticles'
import ScrollProgress from '@/components/ScrollProgress'

const inter = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '500', '600'] })
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-headline', weight: ['700', '800', '900'] })

export const metadata: Metadata = {
  title: 'SABARNA | Developer Portfolio',
  description: 'AI/ML Engineer with hands-on experience in RAG, deep learning, and NLP. Portfolio of Sabarna Saha.',
  icons: {
    icon: '/logo.png',
  },
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
      <body className={`${inter.variable} ${montserrat.variable} relative bg-surface text-on-surface font-body selection:bg-primary/30 antialiased`}>
        {/* Animated Background */}
        <BackgroundParticles />

        {/* Progress Bar */}
        <ScrollProgress />

        {/* Grain Overlay */}
        <div className="grain-overlay mix-blend-overlay"></div>
        
        {/* Navigation */}
        <Navbar />
        <TerminalModal />

        {/* Page Content */}
        <main className="relative z-10 w-full flex flex-col">
          {children}
        </main>
      </body>
    </html>
  )
}
