import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calculator | Retirement Planning Tool - FinanceTools',
  description: 'Calculate your retirement savings with employer matching. Plan your retirement with our comprehensive 401(k) contribution calculator and growth projections.',
  keywords: [
    '401k calculator',
    '401(k) calculator',
    'retirement calculator',
    '401k contribution calculator',
    'employer match calculator',
    'retirement planning calculator',
    '401k growth calculator',
    'retirement savings calculator',
    '401k investment calculator',
    'pension calculator',
    'retirement fund calculator'
  ],
  authors: [{ name: 'FinanceTools' }],
  creator: 'FinanceTools',
  publisher: 'FinanceTools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Free 401(k) Calculator - Plan Your Retirement Savings',
    description: 'Calculate 401(k) returns with employer matching and tax advantages. Free comprehensive retirement planning tool with detailed projections.',
    url: 'https://financetools.com/calculators/401k-calculator',
    siteName: 'FinanceTools',
    images: [
      {
        url: 'https://financetools.com/images/401k-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: '401(k) Calculator - Retirement Planning Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '401(k) Calculator - Retirement Planning Made Easy',
    description: 'Free 401(k) calculator with employer matching. Calculate retirement savings growth and plan your financial future.',
    images: ['https://financetools.com/images/401k-calculator-twitter.jpg'],
    creator: '@FinanceToolsApp',
  },
  alternates: {
    canonical: 'https://financetools.com/calculators/401k-calculator',
    languages: {
      'en-US': 'https://financetools.com/calculators/401k-calculator',
    },
  },
  other: {
    'application-name': 'FinanceTools 401(k) Calculator',
    'apple-mobile-web-app-title': '401(k) Calculator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};