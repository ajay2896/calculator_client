import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Car Loan Calculator | EMI, Interest & Repayment Schedule - MyEasyCalculators",
  description:
    "Use our free Car Loan Calculator to calculate EMI, interest, and repayment schedule. Plan your vehicle financing easily with MyEasyCalculators.",
  keywords: [
    "car loan calculator",
    "car EMI calculator",
    "vehicle loan calculator",
    "auto loan calculator",
    "car finance calculator",
    "loan repayment calculator",
    "interest calculator"
  ],
  alternates: {
    canonical: "https://myeasycalculators.com/finance/loan-calculators/car-loan-calculator",
  },
  openGraph: {
    title: "Car Loan Calculator | EMI, Interest & Repayment",
    description:
      "Easily calculate EMI, interest, and repayment schedule for your car loan. Free tool by MyEasyCalculators.",
    url: "https://myeasycalculators.com/finance/loan-calculators/car-loan-calculator",
    siteName: "MyEasyCalculators",
    type: "website",
    images: [
      {
        url: "/og-car-loan-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Car Loan Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Car Loan Calculator | EMI, Interest & Repayment",
    description:
      "Calculate EMI, interest, and repayment schedule for your car loan. Free online tool by MyEasyCalculators.",
    images: ["/twitter-car-loan-calculator.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      // use quoted hyphenated keys — these are the exact names allowed by the type
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};
