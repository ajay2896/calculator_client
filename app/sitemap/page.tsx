// app/sitemap/page.tsx
import Link from 'next/link';
import { Calculator } from 'lucide-react';

const sitemapData = {
  Categories: [
    { name: 'Finance', href: '/finance' },
    { name: 'Math', href: '/math' },
    { name: 'Health', href: '/health' },
    { name: 'Shopping', href: '/shopping' },
    { name: 'Technology', href: '/technology' },
    { name: 'Fun', href: '/fun' },
    { name: 'Construction', href: '/construction' },
  ],
  'Finance Calculators': [
    { name: 'Income Tax Calculator', href: '/finance/tax-salary-calculators/income-tax-calculator' },
    { name: 'HRA Calculator', href: '/finance/tax-salary-calculators/hra-calculator' },
    { name: 'Gratuity Calculator', href: '/finance/tax-salary-calculators/gratuity-calculator' },
    { name: 'EPF Calculator', href: '/finance/tax-salary-calculators/epf-calculator' },
    { name: 'TDS Calculator', href: '/finance/tax-salary-calculators/tds-calculator' },
    { name: 'Salary Calculator', href: '/finance/tax-salary-calculators/salary-calculator' },
    { name: 'GST Calculator', href: '/finance/tax-salary-calculators/gst-calculator' },
  ],
  'Math Calculators': [
    { name: 'Percentage Calculator', href: '/math/percentage-calculator' },
    { name: 'Area Calculator', href: '/math/area-calculator' },
    { name: 'Scientific Calculator', href: '/math/scientific-calculator' },
    { name: 'Algebra Calculator', href: '/math/algebra-calculator' },
    { name: 'Geometry Calculator', href: '/math/geometry-calculator' },
    { name: 'Circle Calculator', href: '/math/circle-calculator' },
  ],
  'Shopping Calculators': [
    { name: 'Discount Calculator', href: '/shopping/discount-calculator' },
    { name: 'Tip Calculator', href: '/shopping/tip-calculator' },
    { name: 'Sales Tax Calculator', href: '/shopping/sales-tax-calculator' },
    { name: 'Currency Converter', href: '/shopping/currency-converter' },
    { name: 'Unit Price Calculator', href: '/shopping/unit-price-calculator' },
    { name: 'Gift Budget Calculator', href: '/shopping/gift-budget-calculator' },
  ],
  'Other Calculators': [
    { name: 'Technology Calculators', href: '/technology' },
    { name: 'Fun Calculators', href: '/fun' },
    { name: 'Health Calculators', href: '/health' },
    { name: 'Construction Calculators', href: '/construction' },
  ],
  Blog: [
    { name: 'How to Choose the Right Loan for Your Needs', href: '/blog/choosing-right-loan' },
    { name: 'Understanding BMI and Health Metrics', href: '/blog/understanding-bmi-health-metrics' },
    { name: 'Construction Cost Estimation Guide', href: '/blog/construction-cost-estimation' },
    { name: 'Math Made Easy: Percentage Calculations', href: '/blog/math-percentage-calculations' },
  ],
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sitemap</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Navigate all categories, calculators, and blog posts on MrEasyCalculators
          </p>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(sitemapData).map(([section, links]) => (
            <div key={section} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">{section}</h2>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
