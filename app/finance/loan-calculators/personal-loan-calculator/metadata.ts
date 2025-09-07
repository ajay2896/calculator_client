import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan EMI Calculator 2025 - Calculate Monthly EMI, Interest & Eligibility | FreeCalc',
  description: 'Free online personal loan calculator to calculate EMI, total interest, and loan eligibility instantly. Compare rates from 50+ banks & NBFCs. Get the best personal loan deals in India.',
  keywords: [
    'personal loan calculator',
    'personal loan EMI calculator',
    'instant personal loan calculator',
    'personal loan eligibility calculator',
    'personal loan interest calculator',
    'loan calculator online free',
    'personal loan EMI formula',
    'best personal loan rates India',
    'personal loan comparison',
    'quick personal loan calculator',
    'unsecured loan calculator',
    'salary based loan calculator',
    'instant loan EMI calculator',
    'personal loan planner',
    'loan against salary calculator',
    'personal finance calculator',
    'monthly EMI calculator',
    'personal loan repayment calculator',
    'loan affordability calculator',
    'personal loan simulator'
  ],
  authors: [{ name: 'FreeCalc Financial Team' }],
  creator: 'FreeCalc',
  publisher: 'FreeCalc Financial Services',
  category: 'Personal Finance',
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
    url: 'https://freecalc.com/finance/loan-calculators/personal-loan-calculator',
    siteName: 'FreeCalc - Free Financial Calculators',
    title: 'Personal Loan EMI Calculator 2025 - Calculate Monthly EMI & Interest',
    description: 'Calculate personal loan EMI, total interest & eligibility instantly. Compare best rates from 50+ banks. Free online calculator with detailed amortization schedule.',
    images: [
      {
        url: '/images/og/personal-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Personal Loan EMI Calculator - Calculate Monthly EMI, Interest and Eligibility',
        type: 'image/jpeg',
      },
      {
        url: '/images/og/personal-loan-calculator-mobile.jpg',
        width: 800,
        height: 600,
        alt: 'Mobile Personal Loan Calculator',
        type: 'image/jpeg',
      },
    ],
    videos: [
      {
        url: '/videos/personal-loan-calculator-guide.mp4',
        width: 1280,
        height: 720,
        type: 'video/mp4',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@FreeCalcIndia',
    creator: '@FreeCalcTeam',
    title: 'Personal Loan EMI Calculator 2025 - Free Online Tool',
    description: 'Calculate personal loan EMI, interest & eligibility instantly. Compare rates from 50+ lenders. Get best personal loan deals in India.',
    images: [
      {
        url: '/images/twitter/personal-loan-calculator.jpg',
        alt: 'Personal Loan EMI Calculator - Free Online Tool',
        width: 1200,
        height: 630,
      },
    ],
  },

  alternates: {
    canonical: 'https://freecalc.com/finance/loan-calculators/personal-loan-calculator',
    languages: {
      'en-IN': 'https://freecalc.com/finance/loan-calculators/personal-loan-calculator',
      'hi-IN': 'https://freecalc.com/hi/finance/loan-calculators/personal-loan-calculator',
      'te-IN': 'https://freecalc.com/te/finance/loan-calculators/personal-loan-calculator',
      'ta-IN': 'https://freecalc.com/ta/finance/loan-calculators/personal-loan-calculator',
      'bn-IN': 'https://freecalc.com/bn/finance/loan-calculators/personal-loan-calculator',
      'mr-IN': 'https://freecalc.com/mr/finance/loan-calculators/personal-loan-calculator',
    },
    media: {
      'only screen and (max-width: 600px)': 'https://freecalc.com/m/finance/loan-calculators/personal-loan-calculator',
    },
  },

  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
    other: {
      'bing-site-verification': 'your-bing-verification-code',
      'facebook-domain-verification': 'your-facebook-verification-code',
    },
  },

  metadataBase: new URL('https://freecalc.com'),
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
    date: false,
    url: false,
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',
  },

  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#2563eb',
      },
    ],
  },

  manifest: '/manifest.json',
  
  appLinks: {
    android: {
      package: 'com.freecalc.android',
      app_name: 'FreeCalc',
    },
    // ios: {
    //   app_store_id: 'freecalc-ios-app-id',
    //   app_name: 'FreeCalc',
    // },
  },

  other: {
    // Theme and app configuration
    'theme-color': '#2563eb',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FreeCalc',
    'application-name': 'FreeCalc Personal Loan Calculator',
    'mobile-web-app-capable': 'yes',
    
    // Microsoft specific
    'msapplication-TileColor': '#2563eb',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-navbutton-color': '#2563eb',
    'msapplication-starturl': '/finance/loan-calculators/personal-loan-calculator',
    
    // Financial specific metadata
    'financial-service': 'loan-calculator',
    'loan-type': 'personal-loan',
    'calculator-type': 'emi-calculator',
    'target-audience': 'borrowers, loan-seekers, financial-planners',
    'geographic-coverage': 'India',
    'currency': 'INR',
    'interest-calculation-method': 'reducing-balance',
    
    // Schema.org structured data hints
    'article:section': 'Personal Finance',
    'article:tag': 'personal loan, EMI calculator, loan planning, financial tools',
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    
    // Performance and caching hints
    'cache-control': 'public, max-age=3600, s-maxage=3600',
    'x-dns-prefetch-control': 'on',
    
    // Security headers
    'referrer': 'strict-origin-when-cross-origin',
    'permissions-policy': 'geolocation=(), microphone=(), camera=()',
    
    // Accessibility
  
    'prefers-color-scheme': 'light',
    
    // Additional SEO signals
    'rating': 'general',
    'distribution': 'global',
    'expires': 'never',
    'revisit-after': '7 days',
    'content-language': 'en-IN',
    'geo.region': 'IN',
    'geo.placename': 'India',
    'ICBM': '20.5937,78.9629', // India coordinates
    
    // Financial calculator specific
    'calculator-accuracy': '99.9%',
    'calculation-method': 'compound-interest',
    'update-frequency': 'real-time',
    'supported-currencies': 'INR',
    'minimum-loan-amount': '50000',
    'maximum-loan-amount': '5000000',
    'interest-rate-range': '10-24%',
    'tenure-range': '1-5 years',
  },
};