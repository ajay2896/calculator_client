import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tax & Salary Calculators 2025 - Income Tax, HRA, EPF & Salary Tools | MyEasyCalculators',
  description: 'Calculate income tax, HRA exemption, EPF maturity, gratuity, TDS, GST, and take-home salary instantly with our free online tax and salary calculators.',
  keywords: [
    'income tax calculator',
    'HRA calculator',
    'EPF calculator',
    'gratuity calculator',
    'TDS calculator',
    'salary calculator',
    'GST calculator',
    'tax calculator online',
    'take-home salary calculator',
    'financial planning tools'
  ],
  authors: [{ name: 'MyEasyCalculators' }],
  creator: 'MyEasyCalculators',
  publisher: 'MyEasyCalculators',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://myeasycalculators.com'),
  alternates: {
    canonical: '/finance/tax-salary-calculators',
  },
  openGraph: {
    title: 'Tax & Salary Calculators - Free Online Tools',
    description: 'Use our tax and salary calculators to compute income tax, HRA, EPF, gratuity, TDS, GST, and take-home salary for better financial planning.',
    url: 'https://myeasycalculators.com/finance/tax-salary-calculators',
    siteName: 'MyEasyCalculators',
    images: [
      {
        url: '/images/tax-salary-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Tax & Salary Calculators',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax & Salary Calculators - Free Online Tools',
    description: 'Calculate income tax, HRA exemption, EPF, gratuity, TDS, GST, and take-home salary instantly with free online calculators.',
    images: ['/images/tax-salary-calculators-twitter.jpg'],
    creator: '@MyEasyCalculators',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};
