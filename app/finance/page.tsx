import CalculatorCard from '@/components/CalculatorCard';
import { TrendingUp, Calculator, PiggyBank, CreditCard, Building2, Percent, DollarSign } from 'lucide-react';

const financeCalculators = [
  {
    title: 'Loan EMI Calculator',
    description: 'Calculate your monthly EMI for personal, home, or car loans with detailed amortization schedule',
    category: 'finance',
    slug: 'loan-calculator',
    icon: Calculator,
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments, total interest, and loan comparison',
    category: 'finance',
    slug: 'mortgage-calculator',
    icon: Building2,
  },
  {
    title: 'SIP Calculator',
    description: 'Calculate returns on your Systematic Investment Plan and mutual fund investments',
    category: 'finance',
    slug: 'sip-calculator',
    icon: TrendingUp,
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and see how your money grows over time',
    category: 'finance',
    slug: 'compound-interest-calculator',
    icon: Percent,
  },
  {
    title: 'Fixed Deposit Calculator',
    description: 'Calculate FD maturity amount and interest earnings',
    category: 'finance',
    slug: 'fd-calculator',
    icon: PiggyBank,
  },
  {
    title: 'Credit Card Payment Calculator',
    description: 'Calculate minimum payments and payoff time for credit card debt',
    category: 'finance',
    slug: 'credit-card-calculator',
    icon: CreditCard,
  },
  {
    title: 'Investment Return Calculator',
    description: 'Calculate returns on various investment options and compare scenarios',
    category: 'finance',
    slug: 'investment-calculator',
    icon: DollarSign,
  },
  {
    title: 'Tax Calculator',
    description: 'Calculate income tax, deductions, and tax savings for current financial year',
    category: 'finance',
    slug: 'tax-calculator',
    icon: Calculator,
  },
];

export default function FinancePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Finance Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Make informed financial decisions with our comprehensive collection of finance calculators. 
            Calculate loans, investments, taxes, and more with precision.
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {financeCalculators.map((calculator, index) => (
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