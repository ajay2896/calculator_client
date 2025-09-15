import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forex & International Finance Calculators 2025 - Currency Converter, Import Duty, Inflation Adjusted | MyEasyCalculators',
  description: 'Handle international finance with our free online forex calculators. Convert currencies, calculate import duties, and adjust values for inflation across countries instantly.',
  keywords: [
    'forex calculators',
    'currency converter',
    'import duty calculator',
    'inflation adjusted calculator',
    'international finance',
    'global currency calculator',
    'exchange rate calculator',
    'finance tools',
    'calculate forex',
    'free online calculator'
  ],
  authors: [{ name: 'MyEasyCalculators' }],
  creator: 'MyEasyCalculators',
  publisher: 'MyEasyCalculators',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://myeasycalculators.com'),
  alternates: {
    canonical: '/finance/forex-calculators',
  },
  openGraph: {
    title: 'Forex & International Finance Calculators - Free Online Tools',
    description: 'Use our forex calculators to convert currencies, calculate import duties, and adjust values for inflation across countries. Easy and accurate.',
    url: 'https://myeasycalculators.com/finance/forex-calculators',
    siteName: 'MyEasyCalculators',
    images: [
      {
        url: '/images/forex-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Forex & International Finance Calculators',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forex & International Finance Calculators - Free Online Tools',
    description: 'Convert currencies, calculate import duties, and adjust values for inflation across countries with our free online calculators.',
    images: ['/images/forex-calculators-twitter.jpg'],
    creator: '@MyEasyCalculators',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};
