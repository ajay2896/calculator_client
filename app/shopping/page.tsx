import CalculatorCard from '@/components/CalculatorCard';
import { ShoppingCart, Percent, Calculator, CreditCard, Gift, Tag } from 'lucide-react';

const shoppingCalculators = [
  {
    title: 'Discount Calculator',
    description: 'Calculate discounts, sale prices, and savings on your purchases',
    category: 'shopping',
    slug: 'discount-calculator',
    icon: Percent,
  },
  {
    title: 'Tip Calculator',
    description: 'Calculate tips for restaurants, services, and split bills among friends',
    category: 'shopping',
    slug: 'tip-calculator',
    icon: Calculator,
  },
  {
    title: 'Sales Tax Calculator',
    description: 'Calculate sales tax, VAT, and total price including taxes',
    category: 'shopping',
    slug: 'sales-tax-calculator',
    icon: Tag,
  },
  {
    title: 'Currency Converter',
    description: 'Convert between different currencies with real-time exchange rates',
    category: 'shopping',
    slug: 'currency-converter',
    icon: CreditCard,
  },
  {
    title: 'Unit Price Calculator',
    description: 'Compare unit prices to find the best deals when shopping',
    category: 'shopping',
    slug: 'unit-price-calculator',
    icon: ShoppingCart,
  },
  {
    title: 'Gift Budget Calculator',
    description: 'Plan your gift budget for holidays, birthdays, and special occasions',
    category: 'shopping',
    slug: 'gift-budget-calculator',
    icon: Gift,
  },
];

export default function ShoppingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <ShoppingCart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Shopping Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Make smarter shopping decisions with our collection of discount, 
            tax, tip, and price comparison calculators.
          </p>
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
            {shoppingCalculators.map((calculator, index) => (
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
    </div>
  );
}