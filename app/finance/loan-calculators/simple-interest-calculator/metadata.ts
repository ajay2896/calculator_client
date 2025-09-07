import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator 2025 - Calculate Interest Instantly | FreeCalc',
  description: 'Calculate simple interest instantly with our free online calculator. Enter principal amount, interest rate, and time period to get accurate results. Perfect for loans, investments, and financial planning.',
  keywords: [
    'simple interest calculator',
    'interest calculator',
    'financial calculator',
    'loan interest',
    'investment calculator',
    'simple interest formula',
    'calculate interest',
    'free calculator',
    'online calculator',
    'finance tools'
  ],
  authors: [{ name: 'FreeCalc' }],
  creator: 'FreeCalc',
  publisher: 'FreeCalc',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://freecalc.com'),
  alternates: {
    canonical: '/finance/simple-interest-calculator',
  },
  openGraph: {
    title: 'Simple Interest Calculator - Free Online Tool',
    description: 'Calculate simple interest for loans and investments with our easy-to-use calculator. Get instant results and detailed breakdown.',
    url: '/finance/simple-interest-calculator',
    siteName: 'FreeCalc',
    images: [
      {
        url: '/images/simple-interest-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Simple Interest Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simple Interest Calculator - Free Online Tool',
    description: 'Calculate simple interest for loans and investments instantly. Free, fast, and accurate results.',
    images: ['/images/simple-interest-calculator-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};