import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mutual Fund Calculator | Investment Returns & SIP Calculator - FinanceTools',
  description: 'Calculate mutual fund returns for lump sum and SIP investments. Compare different investment scenarios with our comprehensive mutual fund calculator and growth projections.',
  keywords: [
    'mutual fund calculator',
    'SIP calculator',
    'mutual fund returns calculator',
    'investment calculator',
    'mutual fund growth calculator',
    'systematic investment plan calculator',
    'mutual fund SIP calculator',
    'investment returns calculator',
    'mutual fund planning tool',
    'equity fund calculator',
    'debt fund calculator',
    'hybrid fund calculator'
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
    title: 'Free Mutual Fund Calculator - Calculate SIP & Investment Returns',
    description: 'Calculate mutual fund returns for lump sum and SIP investments. Free comprehensive tool with detailed projections and fund comparison features.',
    url: 'https://financetools.com/calculators/mutual-fund-calculator',
    siteName: 'FinanceTools',
    images: [
      {
        url: 'https://financetools.com/images/mutual-fund-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Mutual Fund Calculator - SIP & Investment Returns',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mutual Fund Calculator - SIP & Investment Planning Tool',
    description: 'Free mutual fund calculator for SIP and lump sum investments. Calculate returns and plan your investment strategy.',
    images: ['https://financetools.com/images/mutual-fund-calculator-twitter.jpg'],
    creator: '@FinanceToolsApp',
  },
  alternates: {
    canonical: 'https://financetools.com/calculators/mutual-fund-calculator',
    languages: {
      'en-US': 'https://financetools.com/calculators/mutual-fund-calculator',
    },
  },
  other: {
    'application-name': 'FinanceTools Mutual Fund Calculator',
    'apple-mobile-web-app-title': 'Mutual Fund Calculator',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
};