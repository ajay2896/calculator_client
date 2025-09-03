import CalculatorCard from '@/components/CalculatorCard';
import { Calculator, FileText, Home, PiggyBank, Receipt, DollarSign, Percent } from 'lucide-react';

const taxSalaryCalculators = [
  {
    title: 'Income Tax Calculator',
    description: 'Calculate income tax liability for current and previous financial years',
    category: 'finance/tax-salary-calculators',
    slug: 'income-tax-calculator',
    icon: Calculator,
  },
  {
    title: 'HRA Calculator',
    description: 'Calculate House Rent Allowance exemption and tax savings',
    category: 'finance/tax-salary-calculators',
    slug: 'hra-calculator',
    icon: Home,
  },
  {
    title: 'Gratuity Calculator',
    description: 'Calculate gratuity amount based on salary and service years',
    category: 'finance/tax-salary-calculators',
    slug: 'gratuity-calculator',
    icon: FileText,
  },
  {
    title: 'EPF Calculator',
    description: 'Calculate Employee Provident Fund maturity amount and returns',
    category: 'finance/tax-salary-calculators',
    slug: 'epf-calculator',
    icon: PiggyBank,
  },
  {
    title: 'TDS Calculator',
    description: 'Calculate Tax Deducted at Source for salary and other income',
    category: 'finance/tax-salary-calculators',
    slug: 'tds-calculator',
    icon: Receipt,
  },
  {
    title: 'Salary Calculator',
    description: 'Calculate take-home salary after deductions and taxes',
    category: 'finance/tax-salary-calculators',
    slug: 'salary-calculator',
    icon: DollarSign,
  },
  {
    title: 'GST Calculator',
    description: 'Calculate GST amount, inclusive and exclusive pricing',
    category: 'finance/tax-salary-calculators',
    slug: 'gst-calculator',
    icon: Percent,
  },
];

export default function TaxSalaryCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tax & Salary Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Calculate income tax, salary deductions, HRA exemptions, and other 
            tax-related calculations for better financial planning.
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
            <span className="text-gray-900">Tax & Salary Calculators</span>
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
            {taxSalaryCalculators.map((calculator, index) => (
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