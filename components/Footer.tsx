import Link from 'next/link';
import { Calculator, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    'Popular Tools': [
      { name: 'Loan Calculator', href: '/finance/loan-calculator' },
      { name: 'BMI Calculator', href: '/health/bmi-calculator' },
      { name: 'Percentage Calculator', href: '/math/percentage-calculator' },
      { name: 'Mortgage Calculator', href: '/finance/mortgage-calculator' },
    ],
    'Categories': [
      { name: 'Finance', href: '/finance' },
      { name: 'Math', href: '/math' },
      { name: 'Health', href: '/health' },
      { name: 'Construction', href: '/construction' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Sitemap', href: '/sitemap' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">FreeCalc</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your go-to destination for free, fast, and accurate calculator tools. 
              From finance to health, we've got you covered.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 FreeCalc. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            Made with ❤️ for better calculations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;