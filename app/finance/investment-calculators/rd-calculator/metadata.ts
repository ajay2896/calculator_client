import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regular Savings Calculator | Monthly Deposit Calculator - FinanceTools',
  description: 'Calculate your regular savings account maturity amount with monthly deposits. Plan your systematic savings with our free compound interest calculator for recurring deposits.',
  keywords: [
    'regular savings calculator',
    'monthly deposit calculator',
    'recurring deposit calculator',
    'savings account calculator',
    'compound interest calculator',
    'systematic savings plan',
    'monthly savings calculator',
    'deposit maturity calculator',
    'savings growth calculator',
    'investment calculator'
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
    title: 'Free Regular Savings Calculator - Calculate Monthly Deposit Returns',
    description: 'Calculate maturity amount for your regular savings with monthly deposits. Free tool with detailed breakdown and growth projections.',
    url: 'https://financetools.com/calculators/regular-savings-calculator',
    siteName: 'FinanceTools',
    images: [
      {
        url: 'https://financetools.com/images/regular-savings-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Regular Savings Calculator - Monthly Deposit Growth',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regular Savings Calculator - Calculate Monthly Deposit Returns',
    description: 'Free calculator for regular savings accounts with monthly deposits. Calculate maturity amount and track your savings growth.',
    images: ['https://financetools.com/images/regular-savings-calculator-twitter.jpg'],
    creator: '@FinanceToolsApp',
  },
  alternates: {
    canonical: 'https://financetools.com/calculators/regular-savings-calculator',
    languages: {
      'en-US': 'https://financetools.com/calculators/regular-savings-calculator',
    },
  },
  other: {
    'application-name': 'FinanceTools Regular Savings Calculator',
    'apple-mobile-web-app-title': 'Savings Calculator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};