import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FreeCalc - Free Calculator Tools for Everyone',
  description: 'Access 200+ free calculator tools for finance, math, health, construction, and more. Fast, accurate, and easy to use calculators for all your needs.',
  keywords: 'calculator, finance calculator, math calculator, health calculator, free tools',
  authors: [{ name: 'FreeCalc' }],
  metadataBase: new URL("https://freecalc.com"), // replace with real domain
  openGraph: {
    title: 'FreeCalc - Free Calculator Tools',
    description: 'Access 200+ free calculator tools for finance, math, health, construction, and more.',
    type: 'website',
    url: "https://freecalc.com",
    siteName: "FreeCalc",
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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
