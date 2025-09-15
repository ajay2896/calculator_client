import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings & Wealth Calculators 2025 - Plan Savings & Track Net Worth | MyEasyCalculators',
  description: 'Plan your savings goals, build emergency funds, and track your wealth with our free online savings calculators. Calculate future value, present value, net worth, and inflation impact instantly.',
  keywords: [
    'savings calculators',
    'wealth calculators',
    'emergency fund calculator',
    'future value calculator',
    'present value calculator',
    'inflation impact calculator',
    'net worth calculator',
    'financial planning tools',
    'savings goal calculator',
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
    canonical: '/finance/savings-calculators',
  },
  openGraph: {
    title: 'Savings & Wealth Calculators - Free Online Tools',
    description: 'Use our savings calculators to plan financial goals, build emergency funds, and track net worth. Easy, accurate, and free.',
    url: 'https://myeasycalculators.com/finance/savings-calculators',
    siteName: 'MyEasyCalculators',
    images: [
      {
        url: '/images/savings-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Savings & Wealth Calculators',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Savings & Wealth Calculators - Free Online Tools',
    description: 'Plan savings, calculate emergency funds, and track your wealth with our free online savings calculators.',
    images: ['/images/savings-calculators-twitter.jpg'],
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
