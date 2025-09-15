import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EMI Calculator 2025 - Calculate Loan EMI Online (Home, Car, Personal) | MrEasyCalculators',
  description:
    'Free EMI Calculator 2025 to calculate monthly installments for any loan (home, car, personal, education, business). Get detailed EMI breakdown of principal & interest with amortization schedule.',
  keywords: [
    'EMI calculator',
    'loan EMI calculator',
    'monthly installment calculator',
    'home loan EMI calculator',
    'car loan EMI calculator',
    'personal loan EMI calculator',
    'education loan EMI calculator',
    'business loan EMI calculator',
    'equated monthly installment calculator',
    'loan repayment calculator',
    'loan interest calculator',
    'amortization calculator',
  ],

  openGraph: {
    title: 'EMI Calculator 2025 - Calculate Loan EMI Online',
    description:
      'Use free EMI Calculator 2025 to calculate monthly EMI for home, car, personal, education, and business loans. Instant results with detailed principal & interest breakdown.',
    type: 'website',
    url: 'https://mreasycalculators.com/finance/loan-calculators/emi-calculator',
    siteName: 'MrEasyCalculators',
    locale: 'en_IN',
    images: [
      {
        url: '/images/og/emi-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'EMI Calculator - Calculate Monthly Loan Installments Online',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EMI Calculator 2025 - Free Loan EMI Calculator Online',
    description:
      'Free EMI calculator to calculate monthly installments for home, car, personal, education & business loans. Detailed repayment breakdown with amortization.',
    images: ['/images/twitter/emi-calculator.jpg'],
    site: '@MrEasyCalc',
    creator: '@MrEasyCalc',
  },

  alternates: {
    canonical: 'https://mreasycalculators.com/finance/loan-calculators/emi-calculator',
    languages: {
      'en-IN': 'https://mreasycalculators.com/finance/loan-calculators/emi-calculator',
      'hi-IN': 'https://mreasycalculators.com/hi/finance/loan-calculators/emi-calculator',
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  metadataBase: new URL('https://mreasycalculators.com'),
};
