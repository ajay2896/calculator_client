import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Calculators - Discounts, Tips & Price Tools | mreasycalculators',
  description: 'Use our free shopping calculators to calculate discounts, tips, sales tax, gift budgets, currency conversion, and unit prices. Make smarter shopping decisions easily.',
  keywords: [
    'shopping calculator',
    'discount calculator',
    'tip calculator',
    'sales tax calculator',
    'unit price calculator',
    'gift budget calculator',
    'currency converter',
    'online calculator',
    'free calculator'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/shopping',
  },
  openGraph: {
    title: 'Shopping Calculators - Discounts, Tips & Price Tools',
    description: 'Calculate discounts, tips, sales tax, gift budgets, and compare prices with our free online shopping calculators.',
    type: 'website',
    url: 'https://mreasycalculators.com/shopping',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/shopping-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Shopping Calculators',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopping Calculators - Discounts, Tips & Price Tools',
    description: 'Free online calculators for discounts, tips, sales tax, unit prices, gift budgets, and currency conversion.',
    images: ['/images/shopping-calculators-twitter.jpg'],
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
