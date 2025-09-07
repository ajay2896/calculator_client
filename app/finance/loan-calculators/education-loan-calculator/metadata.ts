import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education Loan Calculator 2025 - Calculate EMI for Study Abroad & India | FreeCalc',
  description: 'Free education loan EMI calculator for higher studies, MBA, engineering, medical courses. Calculate EMI for study abroad loans with moratorium period. Compare rates from 50+ banks.',
  keywords: [
    'education loan calculator',
    'education loan EMI calculator',
    'student loan calculator',
    'study abroad loan calculator',
    'higher education loan calculator',
    'MBA loan calculator',
    'engineering loan calculator',
    'medical education loan calculator',
    'education loan eligibility calculator',
    'student loan EMI calculator India',
    'overseas education loan calculator',
    'education loan interest calculator',
    'study loan calculator',
    'college loan calculator',
    'university loan calculator',
    'professional course loan calculator',
    'doctorate loan calculator',
    'masters degree loan calculator',
    'undergraduate loan calculator',
    'vocational education loan calculator',
    'skill development loan calculator',
    'educational financing calculator',
    'study loan planner',
    'education loan moratorium calculator',
    'student finance calculator',
    'academic loan calculator',
    'course fee loan calculator',
    'tuition fee loan calculator',
    'hostel fee loan calculator',
    'education loan repayment calculator'
  ],
  authors: [{ name: 'FreeCalc Education Finance Team' }],
  creator: 'FreeCalc',
  publisher: 'FreeCalc Financial Services',
  category: 'Education Finance',
  classification: 'Educational Financial Calculator',
  
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
    url: 'https://freecalc.com/finance/loan-calculators/education-loan-calculator',
    siteName: 'FreeCalc - Free Financial Calculators',
    title: 'Education Loan Calculator 2025 - Calculate EMI for Higher Studies',
    description: 'Calculate education loan EMI for higher studies, study abroad, MBA, engineering. Free calculator with moratorium period and detailed repayment schedule.',
    images: [
      {
        url: '/images/og/education-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Education Loan EMI Calculator - Calculate Study Loan EMI and Interest',
        type: 'image/jpeg',
      },
      {
        url: '/images/og/study-abroad-loan-calculator.jpg',
        width: 1200,
        height: 630,
        alt: 'Study Abroad Loan Calculator',
        type: 'image/jpeg',
      },
    ],
    videos: [
      {
        url: '/videos/education-loan-calculator-guide.mp4',
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
    title: 'Education Loan Calculator 2025 - Study Abroad & India',
    description: 'Calculate education loan EMI for higher studies, study abroad, MBA, engineering. Free calculator with moratorium period support.',
    images: [
      {
        url: '/images/twitter/education-loan-calculator.jpg',
        alt: 'Education Loan EMI Calculator - Free Online Tool',
        width: 1200,
        height: 630,
      },
    ],
  },

  alternates: {
    canonical: 'https://freecalc.com/finance/loan-calculators/education-loan-calculator',
    languages: {
      'en-IN': 'https://freecalc.com/finance/loan-calculators/education-loan-calculator',
      'hi-IN': 'https://freecalc.com/hi/finance/loan-calculators/education-loan-calculator',
      'te-IN': 'https://freecalc.com/te/finance/loan-calculators/education-loan-calculator',
      'ta-IN': 'https://freecalc.com/ta/finance/loan-calculators/education-loan-calculator',
      'bn-IN': 'https://freecalc.com/bn/finance/loan-calculators/education-loan-calculator',
      'mr-IN': 'https://freecalc.com/mr/finance/loan-calculators/education-loan-calculator',
      'gu-IN': 'https://freecalc.com/gu/finance/loan-calculators/education-loan-calculator',
    },
    media: {
      'only screen and (max-width: 600px)': 'https://freecalc.com/m/finance/loan-calculators/education-loan-calculator',
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
        color: '#059669',
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
    'theme-color': '#059669',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'FreeCalc',
    'application-name': 'FreeCalc Education Loan Calculator',
    'mobile-web-app-capable': 'yes',
    
    // Microsoft specific
    'msapplication-TileColor': '#059669',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-navbutton-color': '#059669',
    'msapplication-starturl': '/finance/loan-calculators/education-loan-calculator',
    
    // Education loan specific metadata
    'financial-service': 'education-loan-calculator',
    'loan-type': 'education-loan',
    'calculator-type': 'emi-calculator-with-moratorium',
    'target-audience': 'students, parents, educational-planners',
    'geographic-coverage': 'India, Study Abroad',
    'currency': 'INR',
    'interest-calculation-method': 'reducing-balance-with-moratorium',
    'supported-courses': 'MBA, Engineering, Medical, Law, Arts, Science',
    
    // Schema.org structured data hints
    'article:section': 'Education Finance',
    'article:tag': 'education loan, student loan, study abroad, MBA loan, engineering loan',
    'article:published_time': '2024-01-01T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    
    // Performance and caching hints
    'cache-control': 'public, max-age=3600, s-maxage=3600',
    'x-dns-prefetch-control': 'on',
    
    // Security headers
    'referrer': 'strict-origin-when-cross-origin',
    'permissions-policy': 'geolocation=(), microphone=(), camera=()',
    
    // Accessibility
    // 'color-scheme': 'light',
    'prefers-color-scheme': 'light',
    
    // Additional SEO signals
    'rating': 'general',
    'distribution': 'global',
    'expires': 'never',
    'revisit-after': '7 days',
    'content-language': 'en-IN',
    'geo.region': 'IN',
    'geo.placename': 'India',
    'ICBM': '20.5937,78.9629',
    
    // Education loan calculator specific
    'calculator-accuracy': '99.9%',
    'calculation-method': 'compound-interest-with-moratorium',
    'update-frequency': 'real-time',
    'supported-currencies': 'INR, USD, GBP, EUR, CAD, AUD',
    'minimum-loan-amount': '100000',
    'maximum-loan-amount': '10000000',
    'interest-rate-range': '8.5-15%',
    'tenure-range': '5-15 years',
    'moratorium-period': '0-7 years',
    'supported-destinations': 'USA, UK, Canada, Australia, Germany, Ireland, Singapore',
    'loan-coverage': 'tuition-fees, living-expenses, travel-costs, equipment-costs',
  },
};