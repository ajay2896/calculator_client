import CalculatorCard from '@/components/CalculatorCard';
import { PiggyBank, Target, Shield, TrendingUp, Calculator, DollarSign, TrendingDown } from 'lucide-react';

const savingsCalculators = [
  {
    title: 'Savings Goal Calculator',
    description: 'Calculate how much to save monthly to reach your financial goals',
    category: 'finance/savings-calculators',
    slug: 'savings-goal-calculator',
    icon: Target,
  },
  {
    title: 'Emergency Fund Calculator',
    description: 'Calculate ideal emergency fund amount based on your expenses',
    category: 'finance/savings-calculators',
    slug: 'emergency-fund-calculator',
    icon: Shield,
  },
  {
    title: 'Future Value Calculator',
    description: 'Calculate future value of your current savings and investments',
    category: 'finance/savings-calculators',
    slug: 'future-value-calculator',
    icon: TrendingUp,
  },
  {
    title: 'Present Value Calculator',
    description: 'Calculate present value of future cash flows and investments',
    category: 'finance/savings-calculators',
    slug: 'present-value-calculator',
    icon: Calculator,
  },
  {
    title: 'Inflation Impact Calculator',
    description: 'Calculate how inflation affects your savings and purchasing power',
    category: 'finance/savings-calculators',
    slug: 'inflation-impact-calculator',
    icon: TrendingDown,
  },
  {
    title: 'Net Worth Calculator',
    description: 'Calculate your total net worth including assets and liabilities',
    category: 'finance/savings-calculators',
    slug: 'net-worth-calculator',
    icon: DollarSign,
  },
];

export default function SavingsCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <PiggyBank className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Savings & Wealth Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Plan your savings goals, build emergency funds, and track your wealth 
            with our comprehensive savings and wealth planning calculators.
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
            <span className="text-gray-900">Savings & Wealth Calculators</span>
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
            {savingsCalculators.map((calculator, index) => (
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