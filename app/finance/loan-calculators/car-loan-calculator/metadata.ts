import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Loan Calculator - Calculate EMI, Interest & Total Cost | LoanCalc',
  description: 'Calculate car loan EMI and total cost of your vehicle financing. Free online car loan calculator with interest rates, monthly payments, and amortization details.',
  keywords: [
    'car loan calculator',
    'auto loan calculator',
    'vehicle loan EMI',
    'car financing calculator',
    'monthly car payment calculator',
    'car loan EMI calculator',
    'auto loan EMI',
    'car loan interest calculator',
    'vehicle financing',
    'car loan planner'
  ],
  authors: [{ name: 'LoanCalc Team' }],
  creator: 'LoanCalc',
  publisher: 'LoanCalc',
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
    type: 'website',
    locale: 'en_IN',
    url: 'https://loancalc.com/finance/loan-calculators/car-loan-calculator',
    siteName: 'LoanCalc',
    title: 'Car Loan Calculator - Calculate EMI & Total Cost',
    description: 'Calculate car loan EMI and total cost of your vehicle financing. Free online calculator with detailed breakdown of monthly payments and interest.',
    images: [
      {
        url: '/og-car-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Car Loan Calculator - Calculate EMI and Interest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LoanCalc',
    creator: '@LoanCalc',
    title: 'Car Loan Calculator - Calculate EMI & Total Cost',
    description: 'Calculate car loan EMI and total cost of your vehicle financing. Free online calculator with detailed breakdown.',
    images: ['/twitter-car-loan-calculator.jpg'],
  },
  alternates: {
    canonical: 'https://loancalc.com/finance/loan-calculators/car-loan-calculator',
    languages: {
      'en-IN': 'https://loancalc.com/finance/loan-calculators/car-loan-calculator',
      'hi-IN': 'https://loancalc.com/hi/finance/loan-calculators/car-loan-calculator',
    },
  },
  category: 'finance',
  classification: 'Financial Calculator',
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  metadataBase: new URL('https://loancalc.com'),
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
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  other: {
    'theme-color': '#2563eb',
    'color-scheme': 'light',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'LoanCalc',
    'application-name': 'LoanCalc',
    'msapplication-TileColor': '#2563eb',
    'msapplication-config': '/browserconfig.xml',
  },
};