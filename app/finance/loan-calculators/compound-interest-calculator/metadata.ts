import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Free Online Investment Growth Tool',
  description:
    'Use our free Compound Interest Calculator to calculate investment growth over time. Compare different compounding frequencies, add regular contributions, and plan your financial future.',
  keywords: [
    'compound interest calculator',
    'investment calculator',
    'savings calculator',
    'financial planning',
    'money growth calculator',
    'investment returns calculator',
    'compounding frequency',
    'interest calculator'
  ],
  alternates: {
    canonical: 'https://myeasycalculators.com/finance/loan-calculators/compound-interest-calculator',
  },
  openGraph: {
    title: 'Compound Interest Calculator | Free Online Investment Growth Tool',
    description:
      'Calculate how your money grows with compound interest. Test different compounding frequencies, contributions, and investment periods.',
    url: 'https://myeasycalculators.com/finance/loan-calculators/compound-interest-calculator',
    siteName: 'MyEasyCalculators',
    type: 'website',
    images: [
      {
        url: '/images/compound-interest-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Free Online Investment Growth Tool',
    description:
      'Free compound interest calculator to calculate growth of your investments with different compounding frequencies and contributions.',
    images: ['/images/compound-interest-calculator-twitter.jpg'],
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
};
