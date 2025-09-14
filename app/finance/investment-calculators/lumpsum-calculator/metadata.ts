import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lumpsum Calculator | Calculate Mutual Fund Returns & Investment Growth',
  description: 'Free lumpsum investment calculator for mutual funds. Calculate returns, maturity amount, and investment growth with different annual returns. Plan your one-time investments wisely.',
  keywords: 'lumpsum calculator, mutual fund calculator, investment calculator, one-time investment, lumpsum returns, mutual fund returns, investment growth calculator, maturity calculator, SIP vs lumpsum',
  openGraph: {
    title: 'Lumpsum Calculator | Calculate Mutual Fund Returns & Investment Growth',
    description: 'Calculate your lumpsum mutual fund investment returns instantly. See how your one-time investment grows over time with our comprehensive lumpsum calculator.',
    type: 'website',
    url: '/lumpsum-calculator',
    images: [
      {
        url: '/images/lumpsum-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Lumpsum Calculator - Calculate Mutual Fund Investment Returns',
      },
    ],
    locale: 'en_US',
    siteName: 'Investment Calculators',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@investmentcalc',
    creator: '@investmentcalc',
    title: 'Lumpsum Calculator | Calculate Mutual Fund Returns & Investment Growth',
    description: 'Free lumpsum investment calculator. Calculate returns, maturity amount, and investment growth for your one-time mutual fund investments.',
    images: ['/images/lumpsum-calculator-twitter.jpg'],
  },
  alternates: {
    canonical: '/lumpsum-calculator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Finance',
  classification: 'Investment',
  other: {
    'rating': 'General',
    'distribution': 'Global',
    'investment-type': 'Mutual Funds',
    'calculator-type': 'Lumpsum Investment',
  },
};