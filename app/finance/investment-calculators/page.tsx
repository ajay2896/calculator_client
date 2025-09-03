import CalculatorCard from '@/components/CalculatorCard';
import { TrendingUp, PiggyBank, Building2, Target, Calculator, DollarSign, Percent, BarChart3, TrendingDown, Coins } from 'lucide-react';

const investmentCalculators = [
  {
    title: 'SIP Calculator',
    description: 'Calculate returns on Systematic Investment Plan and mutual fund investments',
    category: 'finance/investment-calculators',
    slug: 'sip-calculator',
    icon: TrendingUp,
  },
  {
    title: 'Lumpsum Calculator',
    description: 'Calculate returns on one-time lumpsum mutual fund investments',
    category: 'finance/investment-calculators',
    slug: 'lumpsum-calculator',
    icon: DollarSign,
  },
  {
    title: 'Fixed Deposit Calculator',
    description: 'Calculate FD maturity amount and interest earnings',
    category: 'finance/investment-calculators',
    slug: 'fd-calculator',
    icon: PiggyBank,
  },
  {
    title: 'Recurring Deposit Calculator',
    description: 'Calculate RD maturity amount for monthly deposits',
    category: 'finance/investment-calculators',
    slug: 'rd-calculator',
    icon: Coins,
  },
  {
    title: 'PPF Calculator',
    description: 'Calculate Public Provident Fund returns and maturity amount',
    category: 'finance/investment-calculators',
    slug: 'ppf-calculator',
    icon: Building2,
  },
  {
    title: 'NPS Calculator',
    description: 'Calculate National Pension System returns and pension amount',
    category: 'finance/investment-calculators',
    slug: 'nps-calculator',
    icon: Target,
  },
  {
    title: 'Mutual Fund Calculator',
    description: 'Calculate mutual fund returns for different investment scenarios',
    category: 'finance/investment-calculators',
    slug: 'mutual-fund-calculator',
    icon: BarChart3,
  },
  {
    title: 'Retirement Calculator',
    description: 'Plan your retirement corpus and monthly savings requirement',
    category: 'finance/investment-calculators',
    slug: 'retirement-calculator',
    icon: TrendingDown,
  },
  {
    title: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate for your investments',
    category: 'finance/investment-calculators',
    slug: 'cagr-calculator',
    icon: Percent,
  },
  {
    title: 'ROI Calculator',
    description: 'Calculate Return on Investment for various investment options',
    category: 'finance/investment-calculators',
    slug: 'roi-calculator',
    icon: Calculator,
  },
];

export default function InvestmentCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Investment & Returns Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Plan your investments and calculate returns with our comprehensive collection 
            of investment calculators for SIP, mutual funds, FD, PPF, and more.
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
            <span className="text-gray-900">Investment & Returns Calculators</span>
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
            {investmentCalculators.map((calculator, index) => (
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