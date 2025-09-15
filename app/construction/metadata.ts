import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Construction Calculators - Concrete, Paint, Flooring & Building Tools | mreasycalculators',
  description: 'Plan your construction projects efficiently with free calculators. Calculate concrete, paint, flooring, roofing, drywall, gravel, and other building materials.',
  keywords: [
    'construction calculators',
    'concrete calculator',
    'paint calculator',
    'flooring calculator',
    'roofing calculator',
    'drywall calculator',
    'gravel calculator',
    'building calculators',
    'construction tools',
    'material estimation calculator'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/construction',
  },
  openGraph: {
    title: 'Construction Calculators - Concrete, Paint, Flooring & Building Tools',
    description: 'Free online calculators to estimate concrete, paint, flooring, roofing, drywall, and gravel for your construction projects.',
    type: 'website',
    url: 'https://mreasycalculators.com/construction',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/construction-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Construction Calculators',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Construction Calculators - Concrete, Paint, Flooring & Building Tools',
    description: 'Estimate concrete, paint, flooring, roofing, drywall, and gravel easily using our free construction calculators online.',
    images: ['/images/construction-calculators-twitter.jpg'],
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
