import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Calculators - BMI, Calorie, Heart Rate & Wellness Tools | mreasycalculators',
  description: 'Monitor your health and fitness with our free health calculators. Calculate BMI, daily calories, heart rate, body fat, water intake, and sleep patterns easily online.',
  keywords: [
    'health calculators',
    'BMI calculator',
    'calorie calculator',
    'heart rate calculator',
    'body fat calculator',
    'water intake calculator',
    'sleep calculator',
    'wellness tools',
    'fitness calculators',
    'online health calculators'
  ],
  metadataBase: new URL('https://mreasycalculators.com'),
  alternates: {
    canonical: '/health',
  },
  openGraph: {
    title: 'Health Calculators - BMI, Calorie, Heart Rate & Wellness Tools',
    description: 'Free online health calculators to track BMI, calories, heart rate, body fat, water intake, and sleep for better fitness and wellness.',
    type: 'website',
    url: 'https://mreasycalculators.com/health',
    siteName: 'mreasycalculators',
    images: [
      {
        url: '/images/health-calculators-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Health Calculators',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health Calculators - BMI, Calorie, Heart Rate & Wellness Tools',
    description: 'Use our free health calculators to monitor BMI, calories, heart rate, body fat, water intake, and sleep online.',
    images: ['/images/health-calculators-twitter.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
};
