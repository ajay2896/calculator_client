import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fun Calculators - Age, Love, Zodiac, Random Numbers & Games | mreasycalculators',
  description: 'Explore our entertaining collection of fun calculators for age, love compatibility, zodiac signs, random numbers, game scores, and interesting math facts. Free and easy to use!',
  keywords: [
    'fun calculators',
    'age calculator',
    'love calculator',
    'zodiac calculator',
    'random number generator',
    'game score calculator',
    'fun math tools',
    'online fun calculators'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/fun',
  },
  openGraph: {
    title: 'Fun Calculators - Age, Love, Zodiac, Random Numbers & Games',
    description: 'Free online fun calculators to find age, love compatibility, zodiac signs, generate random numbers, and calculate game scores.',
    type: 'website',
    url: 'https://mreasycalculators.com/fun',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/fun-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Fun Calculators',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fun Calculators - Age, Love, Zodiac, Random Numbers & Games',
    description: 'Use our free fun calculators for age, love, zodiac, random numbers, game scores, and more.',
    images: ['/images/fun-calculators-twitter.jpg'],
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
