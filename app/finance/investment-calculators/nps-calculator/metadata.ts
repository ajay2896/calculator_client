import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IRA Calculator | Traditional & Roth IRA Planning Tool - FinanceTools',
  description: 'Calculate Traditional and Roth IRA returns for retirement planning. Compare tax benefits and growth projections with our comprehensive IRA calculator.',
  keywords: [
    'IRA calculator',
    'traditional IRA calculator',
    'roth IRA calculator',
    'individual retirement account calculator',
    'IRA contribution calculator',
    'retirement planning calculator',
    'IRA growth calculator',
    'tax-advantaged retirement calculator',
    'IRA comparison calculator',
    'retirement savings calculator',
    'IRA investment calculator'
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
    title: 'Free IRA Calculator - Traditional vs Roth IRA Planning',
    description: 'Calculate IRA returns and compare Traditional vs Roth options. Free comprehensive retirement planning tool with tax benefit analysis.',
    url: 'https://financetools.com/calculators/ira-calculator',
    siteName: 'FinanceTools',
    images: [
      {
        url: 'https://financetools.com/images/ira-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'IRA Calculator - Traditional vs Roth Planning Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IRA Calculator - Traditional vs Roth Comparison Tool',
    description: 'Free IRA calculator comparing Traditional and Roth options. Plan your retirement with tax-advantaged savings analysis.',
    images: ['https://financetools.com/images/ira-calculator-twitter.jpg'],
    creator: '@FinanceToolsApp',
  },
  alternates: {
    canonical: 'https://financetools.com/calculators/ira-calculator',
    languages: {
      'en-US': 'https://financetools.com/calculators/ira-calculator',
    },
  },
  other: {
    'application-name': 'FinanceTools IRA Calculator',
    'apple-mobile-web-app-title': 'IRA Calculator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};