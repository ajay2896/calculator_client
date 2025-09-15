import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Percentage Calculator - Calculate Percentages Online | mreasycalculators',
  description: 'Free online percentage calculator to quickly calculate percentages, percentage increase, decrease, and percentage of any number. Fast, accurate, and easy to use.',
  keywords: [
    'percentage calculator',
    'percent calculator',
    'percentage increase',
    'percentage decrease',
    'math calculator',
    'online calculator',
    'free calculator'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/math/percentage-calculator',
  },
  openGraph: {
    title: 'Percentage Calculator - Calculate Percentages Online',
    description: 'Quickly calculate percentages, percentage increase, and decrease with this free online calculator.',
    type: 'website',
    url: 'https://mreasycalculators.com/math/percentage-calculator',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/percentage-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Percentage Calculator',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Percentage Calculator - Calculate Percentages Online',
    description: 'Free online percentage calculator to calculate percentages, increase, and decrease instantly.',
    images: ['/images/percentage-calculator-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};
