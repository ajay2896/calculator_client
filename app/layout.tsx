import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next"; 

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MrEasyCalculators - Free Online Calculators for Everyone',
  description: 'Explore 200+ free calculators for finance, math, health, construction, and more. Accurate, fast, and easy-to-use calculators all in one place.',
  keywords: 'calculator, finance calculator, math calculator, health calculator, free calculators, online tools',
  authors: [{ name: 'MrEasyCalculators' }],
  metadataBase: new URL("https://mreasycalculators.com"), // your real domain
  openGraph: {
    title: 'MrEasyCalculators - Free Online Calculator Tools',
    description: 'Access 200+ free calculators for finance, math, health, construction, and more.',
    type: 'website',
    url: "https://mreasycalculators.com",
    siteName: "MrEasyCalculators",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        {/* Website Layout */}
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
