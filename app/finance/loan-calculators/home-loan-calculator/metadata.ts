import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan Calculator - Calculate EMI, Eligibility & Interest | LoanCalc',
  description: 'Calculate home loan EMI, eligibility, and total interest payable with our free online calculator. Get instant results for your home loan planning.',
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
    'housing finance calculator'
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
    url: 'https://loancalc.com/finance/loan-calculators/home-loan-calculator',
    siteName: 'LoanCalc',
    title: 'Home Loan Calculator - Calculate EMI, Eligibility & Interest',
    description: 'Calculate home loan EMI, eligibility, and total interest payable with our free online calculator. Plan your home purchase with accurate calculations.',
    images: [
      {
        url: '/og-home-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Home Loan Calculator - Calculate EMI and Eligibility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@LoanCalc',
    creator: '@LoanCalc',
    title: 'Home Loan Calculator - Calculate EMI, Eligibility & Interest',
    description: 'Calculate home loan EMI, eligibility, and total interest payable. Free online calculator for home loan planning.',
    images: ['/twitter-home-loan-calculator.jpg'],
  },
  alternates: {
    canonical: 'https://loancalc.com/finance/loan-calculators/home-loan-calculator',
    languages: {
      'en-IN': 'https://loancalc.com/finance/loan-calculators/home-loan-calculator',
      'hi-IN': 'https://loancalc.com/hi/finance/loan-calculators/home-loan-calculator',
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