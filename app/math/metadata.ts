import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Calculators 2025 - Area, Percentage, Algebra & Geometry Tools | MyEasyCalculators',
  description: 'Solve mathematical problems instantly with our free online math calculators. Calculate percentages, area, algebra equations, geometry, circles, and scientific calculations easily.',
  keywords: [
    'math calculator',
    'area calculator',
    'percentage calculator',
    'algebra calculator',
    'geometry calculator',
    'circle calculator',
    'scientific calculator',
    'online math tools',
    'solve math problems',
    'free math calculator'
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
    canonical: '/math',
  },
  openGraph: {
    title: 'Math Calculators - Free Online Math Tools',
    description: 'Use our online math calculators to compute percentages, area, algebra, geometry, circle dimensions, and perform scientific calculations instantly.',
    url: 'https://myeasycalculators.com/math',
    siteName: 'MyEasyCalculators',
    images: [
      {
        url: '/images/math-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Math Calculators',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Math Calculators - Free Online Math Tools',
    description: 'Calculate percentages, area, algebra, geometry, circle dimensions, and scientific calculations online for free.',
    images: ['/images/math-calculators-twitter.jpg'],
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
