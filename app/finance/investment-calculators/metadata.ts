import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investment & Returns Calculators 2025 - SIP, FD, PPF, Mutual Funds | MyEasyCalculators',
  description: 'Plan your investments and calculate returns with our free online investment calculators. Check SIP, FD, PPF, NPS, Mutual Funds, CAGR, ROI, and Retirement calculations instantly.',
  keywords: [
    'investment calculators',
    'SIP calculator',
    'FD calculator',
    'PPF calculator',
    'NPS calculator',
    'Mutual fund calculator',
    'CAGR calculator',
    'ROI calculator',
    'Retirement calculator',
    'finance tools',
    'calculate investment returns',
    'online investment calculator'
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
    canonical: '/finance/investment-calculators',
  },
  openGraph: {
    title: 'Investment & Returns Calculators - Free Online Tools',
    description: 'Calculate returns for SIP, FD, PPF, NPS, Mutual Funds, CAGR, ROI, and Retirement instantly with our easy-to-use calculators.',
    url: 'https://myeasycalculators.com/finance/investment-calculators',
    siteName: 'MyEasyCalculators',
    images: [
      {
        url: '/images/investment-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Investment Calculators',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment & Returns Calculators - Free Online Tools',
    description: 'Use our free online calculators to plan investments and check returns for SIP, FD, PPF, NPS, Mutual Funds, CAGR, ROI, and Retirement.',
    images: ['/images/investment-calculators-twitter.jpg'],
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
