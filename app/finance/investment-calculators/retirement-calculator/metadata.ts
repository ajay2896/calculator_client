import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Retirement Calculator | Plan Your Retirement Corpus & Savings - FinanceTools',
  description: 'Calculate your retirement corpus and monthly savings requirement. Plan your retirement with inflation-adjusted goals and comprehensive projections.',
  keywords: [
    'retirement calculator',
    'retirement planning calculator',
    'retirement corpus calculator',
    'monthly savings calculator',
    'retirement goal calculator',
    'pension calculator',
    'retirement fund calculator',
    'retirement savings calculator',
    'financial planning calculator',
    'retirement investment calculator',
    'inflation adjusted retirement calculator',
    'retirement planning tool'
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
    title: 'Free Retirement Calculator - Plan Your Financial Future',
    description: 'Calculate retirement corpus and monthly savings needed. Comprehensive retirement planning tool with inflation adjustments and goal-based planning.',
    url: 'https://financetools.com/calculators/retirement-calculator',
    siteName: 'FinanceTools',
    images: [
      {
        url: 'https://financetools.com/images/retirement-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Retirement Calculator - Financial Planning Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator - Plan Your Financial Independence',
    description: 'Free retirement planning calculator. Calculate corpus needed and monthly savings required for your retirement goals.',
    images: ['https://financetools.com/images/retirement-calculator-twitter.jpg'],
    creator: '@FinanceToolsApp',
  },
  alternates: {
    canonical: 'https://financetools.com/calculators/retirement-calculator',
    languages: {
      'en-US': 'https://financetools.com/calculators/retirement-calculator',
    },
  },
  other: {
    'application-name': 'FinanceTools Retirement Calculator',
    'apple-mobile-web-app-title': 'Retirement Calculator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};