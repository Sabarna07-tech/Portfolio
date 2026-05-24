import type { Metadata } from 'next'
import { Rubik, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import TerminalModal from '@/components/TerminalModal'
import ScrollProgress from '@/components/ScrollProgress'

const rubik = Rubik({ subsets: ['latin'], variable: '--font-body', weight: ['300', '400', '500', '600', '700'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-headline', weight: ['500', '600', '700'] })

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
      <body className={`${rubik.variable} ${spaceGrotesk.variable} relative font-body antialiased`}>
        {/* Starfield Background */}
        <div className="starfield" aria-hidden="true"></div>

        {/* Progress Bar */}
        <ScrollProgress />

        {/* Grain Overlay */}
        <div className="grain-overlay"></div>
        
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
