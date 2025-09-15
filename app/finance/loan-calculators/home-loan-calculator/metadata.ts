import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan Calculator 2025 - Calculate EMI, Eligibility & Interest | MrEasyCalculators',
  description:
    'Free Home Loan Calculator 2025 to calculate EMI, eligibility, and total interest payable. Get instant results for housing loan planning with accurate repayment schedule and affordability analysis.',
  keywords: [
    'home loan calculator',
    'housing loan calculator',
    'mortgage calculator',
    'home loan EMI calculator',
    'house loan calculator',
    'property loan calculator',
    'home loan eligibility calculator',
    'mortgage EMI calculator',
    'home loan interest calculator',
    'housing finance calculator',
    'loan affordability calculator',
    'real estate finance calculator'
  ],

  authors: [{ name: 'MrEasyCalculators Team' }],
  creator: 'MrEasyCalculators',
  publisher: 'MrEasyCalculators',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mreasycalculators.com/finance/loan-calculators/home-loan-calculator',
    siteName: 'MrEasyCalculators',
    title: 'Home Loan Calculator 2025 - EMI, Eligibility & Interest',
    description:
      'Calculate home loan EMI, eligibility, and total interest payable. Free online calculator by MrEasyCalculators for smart housing loan planning.',
    images: [
      {
        url: '/images/og/home-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Loan Calculator - Calculate EMI, Eligibility & Interest',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@MrEasyCalc',
    creator: '@MrEasyCalc',
    title: 'Home Loan Calculator 2025 - EMI, Eligibility & Interest',
    description:
      'Free Home Loan Calculator 2025 to calculate EMI, eligibility, and total interest payable with accurate breakdown. Plan your housing loan smartly.',
    images: ['/images/twitter/home-loan-calculator.jpg'],
  },

  alternates: {
    canonical: 'https://mreasycalculators.com/finance/loan-calculators/home-loan-calculator',
    languages: {
      'en-IN': 'https://mreasycalculators.com/finance/loan-calculators/home-loan-calculator',
      'hi-IN': 'https://mreasycalculators.com/hi/finance/loan-calculators/home-loan-calculator',
    },
  },

  category: 'Finance',
  classification: 'Financial Calculator',

  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'bing-site-verification': 'your-bing-verification-code',
    },
  },

  metadataBase: new URL('https://mreasycalculators.com'),

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },

  manifest: '/manifest.json',

  other: {
    "theme-color": '#2563eb',
    "color-scheme": 'light dark',
    "apple-mobile-web-app-capable": 'yes',
    "apple-mobile-web-app-status-bar-style": 'default',
    "apple-mobile-web-app-title": 'MrEasyCalculators',
    "application-name": 'MrEasyCalculators',
    "msapplication-TileColor": '#2563eb',
    "msapplication-config": '/browserconfig.xml',
  },
};
