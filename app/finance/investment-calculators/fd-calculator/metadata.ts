import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fixed Deposit Calculator | Calculate FD Maturity Amount & Interest Returns',
  description: 'Free FD calculator for banks. Calculate fixed deposit maturity amount, interest earnings, and returns with compound interest. Compare FD rates across banks and plan investments wisely.',
  keywords: 'fixed deposit calculator, FD calculator, FD maturity calculator, fixed deposit interest calculator, bank FD calculator, FD returns calculator, compound interest calculator, FD planning tool, savings calculator, investment calculator',
  openGraph: {
    title: 'Fixed Deposit Calculator | Calculate FD Maturity Amount & Interest Returns',
    description: 'Calculate your Fixed Deposit maturity amount and interest earnings instantly. Compare FD rates across different banks and tenure options with our comprehensive FD calculator.',
    type: 'website',
    url: '/fd-calculator',
    images: [
      {
        url: '/images/fd-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fixed Deposit Calculator - Calculate FD Maturity Amount & Interest',
      },
    ],
    locale: 'en_US',
    siteName: 'Investment Calculators',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@investmentcalc',
    creator: '@investmentcalc',
    title: 'Fixed Deposit Calculator | Calculate FD Maturity Amount & Interest Returns',
    description: 'Free FD calculator for banks. Calculate fixed deposit maturity amount, interest earnings, and returns with compound interest for better investment planning.',
    images: ['/images/fd-calculator-twitter.jpg'],
  },
  alternates: {
    canonical: '/fd-calculator',
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
  classification: 'Banking',
  other: {
    'rating': 'General',
    'distribution': 'Global',
    'investment-type': 'Fixed Deposits',
    'calculator-type': 'FD Interest Calculator',
  },
};