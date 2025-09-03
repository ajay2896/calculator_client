import CalculatorCard from '@/components/CalculatorCard';
import { Building2, Home, Calculator, Receipt, Scale } from 'lucide-react';

const propertyCalculators = [
  {
    title: 'Home Affordability Calculator',
    description: 'Calculate how much house you can afford based on your income',
    category: 'finance/property-calculators',
    slug: 'home-affordability-calculator',
    icon: Home,
  },
  {
    title: 'Rent vs Buy Calculator',
    description: 'Compare the costs of renting vs buying a property',
    category: 'finance/property-calculators',
    slug: 'rent-vs-buy-calculator',
    icon: Scale,
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate mortgage payments, interest, and amortization schedule',
    category: 'finance/property-calculators',
    slug: 'mortgage-calculator',
    icon: Calculator,
  },
  {
    title: 'Property Tax Calculator',
    description: 'Calculate property tax based on property value and location',
    category: 'finance/property-calculators',
    slug: 'property-tax-calculator',
    icon: Receipt,
  },
  {
    title: 'Stamp Duty Calculator',
    description: 'Calculate stamp duty and registration charges for property purchase',
    category: 'finance/property-calculators',
    slug: 'stamp-duty-calculator',
    icon: Building2,
  },
];

export default function PropertyCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Building2 className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real Estate & Property Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Make informed real estate decisions with our property calculators. 
            Calculate affordability, compare rent vs buy, and plan property investments.
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
            <span className="text-gray-900">Real Estate & Property Calculators</span>
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
            {propertyCalculators.map((calculator, index) => (
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