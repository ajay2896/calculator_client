import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technology Calculators - Data, Network, Storage & CPU Tools | mreasycalculators',
  description: 'Calculate data transfer speeds, network performance, storage requirements, CPU metrics, and other technology-related calculations with our free online technology calculators.',
  keywords: [
    'technology calculators',
    'data transfer calculator',
    'network speed calculator',
    'storage calculator',
    'CPU performance calculator',
    'screen resolution calculator',
    'mobile data calculator',
    'tech tools online'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/technology',
  },
  openGraph: {
    title: 'Technology Calculators - Data, Network, Storage & CPU Tools',
    description: 'Free online calculators to compute data transfer, network speed, storage, CPU performance, and more.',
    type: 'website',
    url: 'https://mreasycalculators.com/technology',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/technology-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Technology Calculators',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technology Calculators - Data, Network, Storage & CPU Tools',
    description: 'Use our free technology calculators to measure data, storage, network speed, and CPU performance.',
    images: ['/images/technology-calculators-twitter.jpg'],
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
