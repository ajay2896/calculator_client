import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator Blog - Tips, Guides & Insights | mreasycalculators',
  description: 'Explore tips, guides, and insights about using calculators effectively for finance, health, construction, math, shopping, technology, and more.',
  keywords: [
    'calculator blog',
    'finance tips',
    'health calculators',
    'construction calculators',
    'math calculators',
    'shopping calculators',
    'technology calculators',
    'calculator guides',
    'how-to use calculators'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Calculator Blog - Tips, Guides & Insights',
    description: 'Read our blog for useful tips, guides, and insights on using calculators across various categories like finance, health, construction, and more.',
    type: 'website',
    url: 'https://mreasycalculators.com/blog',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculator Blog',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculator Blog - Tips, Guides & Insights',
    description: 'Discover useful tips, guides, and insights on using calculators for finance, health, construction, math, and more.',
    images: ['/images/blog-twitter-card.jpg'],
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
