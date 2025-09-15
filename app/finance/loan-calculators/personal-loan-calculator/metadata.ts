import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator - Calculate EMI & Interest | MyEasyCalculators',
  description: 'Free Personal Loan EMI Calculator on MyEasyCalculators.com. Instantly calculate EMI, interest, and loan eligibility online for all banks and NBFCs in India.',
  keywords: [
    'personal loan calculator',
    'personal loan EMI calculator',
    'EMI calculator online',
    'loan interest calculator',
    'loan eligibility calculator',
    'monthly EMI calculator',
    'personal finance calculator',
    'loan repayment calculator',
    'easy EMI calculation',
    'instant loan calculator',
  ],
  authors: [{ name: 'MyEasyCalculators Team' }],
  creator: 'MyEasyCalculators',
  publisher: 'MyEasyCalculators',
  category: 'Finance',
  classification: 'Financial Calculator',

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://myeasycalculators.com/personal-loan-emi-calculator',
    siteName: 'MyEasyCalculators',
    title: 'Personal Loan EMI Calculator - Calculate EMI & Interest | MyEasyCalculators',
    description: 'Use MyEasyCalculators.com Personal Loan EMI Calculator to calculate your monthly EMI, total interest, and loan eligibility instantly.',
    images: [
      {
        url: '/images/og/personal-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Loan EMI Calculator - MyEasyCalculators',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Personal Loan EMI Calculator - MyEasyCalculators',
    description: 'Instantly calculate your personal loan EMI, interest, and eligibility with our free online calculator.',
    images: ['/images/og/personal-loan-calculator.jpg'],
    creator: '@MyEasyCalculators',
  },
};
