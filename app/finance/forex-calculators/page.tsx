import CalculatorCard from '@/components/CalculatorCard';
import { DollarSign, Globe, TrendingUp } from 'lucide-react';

const forexCalculators = [
  {
    title: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates',
    category: 'finance/forex-calculators',
    slug: 'currency-converter',
    icon: DollarSign,
  },
  {
    title: 'Import Duty Calculator',
    description: 'Calculate import duty and customs charges for international purchases',
    category: 'finance/forex-calculators',
    slug: 'import-duty-calculator',
    icon: Globe,
  },
  {
    title: 'Inflation Adjusted Calculator',
    description: 'Calculate inflation-adjusted values across different countries',
    category: 'finance/forex-calculators',
    slug: 'inflation-adjusted-calculator',
    icon: TrendingUp,
  },
];

export default function ForexCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <DollarSign className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Forex & International Finance
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Handle international finance calculations with our forex and currency 
            conversion tools for global transactions and investments.
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 px-4 bg-white border-b">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">Home</a>
            <span className="mx-2">›</span>
            <a href="/finance" className="hover:text-blue-600">Finance</a>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Forex & International Finance</span>
          </nav>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Advertisement Space - Google AdSense</p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forexCalculators.map((calculator, index) => (
              <CalculatorCard
                key={index}
                title={calculator.title}
                description={calculator.description}
                category={calculator.category}
                slug={calculator.slug}
                icon={calculator.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad Space */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Advertisement Space - Google AdSense</p>
          </div>
        </div>
      </section>
    </div>
  );
}