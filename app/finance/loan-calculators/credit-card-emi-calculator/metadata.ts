import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Card EMI Calculator | Calculate Monthly Installments & Interest',
  description: 'Free credit card EMI calculator to calculate monthly installments, total interest, and payment schedule. Compare different tenure options and make informed financial decisions.',
  keywords: 'credit card EMI calculator, monthly installment calculator, credit card payment calculator, EMI interest calculator, balance transfer calculator, credit card finance charges, installment planner',
  openGraph: {
    title: 'Credit Card EMI Calculator | Calculate Monthly Installments & Interest',
    description: 'Calculate credit card EMI, monthly payments, and total interest. Plan your credit card purchases with our comprehensive EMI calculator and payment schedule.',
    type: 'website',
    url: '/credit-card-emi-calculator',
    images: [
      {
        url: '/images/credit-card-emi-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Card EMI Calculator - Calculate Monthly Installments',
      },
    ],
    locale: 'en_US',
    siteName: 'Financial Calculators',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yourcalculators',
    creator: '@yourcalculators',
    title: 'Credit Card EMI Calculator | Calculate Monthly Installments & Interest',
    description: 'Free credit card EMI calculator. Calculate monthly installments, total interest, and payment schedule for your credit card purchases.',
    images: ['/images/credit-card-emi-calculator-twitter.jpg'],
  },
  alternates: {
    canonical: '/credit-card-emi-calculator',
  },
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
  category: 'Finance',
  classification: 'Business',
  other: {
    'rating': 'General',
    'distribution': 'Global',
  },
};