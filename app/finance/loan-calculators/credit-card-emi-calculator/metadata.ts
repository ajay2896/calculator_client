import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credit Card EMI Calculator | Monthly Installments & Interest Planner',
  description:
    'Use our free Credit Card EMI Calculator to calculate monthly installments, total interest, and repayment schedule. Compare tenure options and plan your credit card payments smartly.',
  keywords: [
    'credit card EMI calculator',
    'monthly installment calculator',
    'credit card payment calculator',
    'EMI interest calculator',
    'balance transfer calculator',
    'credit card finance charges',
    'installment planner',
    'credit card repayment calculator'
  ],
  alternates: {
    canonical: 'https://myeasycalculators.com/finance/loan-calculators/credit-card-emi-calculator',
  },
  openGraph: {
    title: 'Credit Card EMI Calculator | Monthly Installments & Interest Planner',
    description:
      'Calculate EMI, monthly payments, and total interest for your credit card purchases. Free tool by MyEasyCalculators.',
    type: 'website',
    url: 'https://myeasycalculators.com/finance/loan-calculators/credit-card-emi-calculator',
    siteName: 'MyEasyCalculators',
    locale: 'en_US',
    images: [
      {
        url: '/images/credit-card-emi-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Credit Card EMI Calculator - Monthly Installments & Interest',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@myeasycalculators',
    creator: '@myeasycalculators',
    title: 'Credit Card EMI Calculator | Monthly Installments & Interest Planner',
    description:
      'Free Credit Card EMI Calculator — calculate monthly installments, total interest, and repayment schedule for smarter financial planning.',
    images: ['/images/credit-card-emi-calculator-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Finance',
  classification: 'Business',
  other: {
    rating: 'General',
    distribution: 'Global',
  },
};
