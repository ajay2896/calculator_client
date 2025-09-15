import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discount Calculator - Calculate Savings & Sale Prices | mreasycalculators',
  description: 'Use our free online discount calculator to instantly calculate discounts, sale prices, and savings on your purchases. Perfect for shopping, sales, and deals.',
  keywords: [
    'discount calculator',
    'sale price calculator',
    'calculate savings',
    'shopping calculator',
    'online calculator',
    'percent off calculator',
    'price reduction tool'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/shopping/discount-calculator',
  },
  openGraph: {
    title: 'Discount Calculator - Calculate Savings & Sale Prices',
    description: 'Instantly calculate discounts, sale prices, and savings using our free online discount calculator.',
    type: 'website',
    url: 'https://mreasycalculators.com/shopping/discount-calculator',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/discount-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Discount Calculator',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discount Calculator - Calculate Savings & Sale Prices',
    description: 'Free online discount calculator to instantly find sale prices and savings for your shopping.',
    images: ['/images/discount-calculator-twitter.jpg'],
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
