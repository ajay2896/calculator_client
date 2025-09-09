import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Calculate Investment Growth Over Time',
  description: 'Free compound interest calculator to see how your money grows over time. Calculate returns with different compounding frequencies and regular contributions. Plan your investments wisely.',
  keywords: 'compound interest calculator, investment calculator, savings calculator, financial planning, money growth, investment returns, compounding frequency',
  openGraph: {
    title: 'Compound Interest Calculator | Calculate Investment Growth Over Time',
    description: 'Free compound interest calculator to see how your money grows over time. Calculate returns with different compounding frequencies and regular contributions.',
    type: 'website',
    url: '/compound-interest-calculator',
    images: [
      {
        url: '/images/compound-interest-calculator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Compound Interest Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Calculate Investment Growth Over Time',
    description: 'Free compound interest calculator to see how your money grows over time. Calculate returns with different compounding frequencies.',
    images: ['/images/compound-interest-calculator-twitter.jpg'],
  },
  alternates: {
    canonical: '/compound-interest-calculator',
  },
  robots: {
    index: true,
    follow: true,
  },
};