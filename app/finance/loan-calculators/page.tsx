import CalculatorCard from '@/components/CalculatorCard';
import { CreditCard, Calculator, Home, Car, GraduationCap, CheckCircle, Percent, DollarSign, Building } from 'lucide-react';
import { TrendingUp } from "lucide-react";


const loanCalculators = [
  {
    title: 'EMI Calculator',
    description: 'Calculate monthly EMI for any loan with detailed amortization schedule',
    category: 'finance/loan-calculators',
    slug: 'emi-calculator',
    icon: Calculator,
  },
  {
    title: 'Home Loan Calculator',
    description: 'Calculate home loan EMI, eligibility, and total interest payable',
    category: 'finance/loan-calculators',
    slug: 'home-loan-calculator',
    icon: Home,
  },
  {
    title: 'Car Loan Calculator',
    description: 'Calculate car loan EMI and total cost of your vehicle financing',
    category: 'finance/loan-calculators',
    slug: 'car-loan-calculator',
    icon: Car,
  },
  {
    title: 'Personal Loan Calculator',
    description: 'Calculate personal loan EMI and compare different loan offers',
    category: 'finance/loan-calculators',
    slug: 'personal-loan-calculator',
    icon: DollarSign,
  },
  {
    title: 'Education Loan Calculator',
    description: 'Calculate education loan EMI for higher studies and courses',
    category: 'finance/loan-calculators',
    slug: 'education-loan-calculator',
    icon: GraduationCap,
  },
  {
    title: 'Loan Eligibility Calculator',
    description: 'Check your loan eligibility based on income and expenses',
    category: 'finance/loan-calculators',
    slug: 'loan-eligibility-calculator',
    icon: CheckCircle,
  },
  {
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans and investments',
    category: 'finance/loan-calculators',
    slug: 'simple-interest-calculator',
    icon: Percent,
  },
  {
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and see money growth over time',
    category: 'finance/loan-calculators',
    slug: 'compound-interest-calculator',
    icon: TrendingUp,
  },
  {
    title: 'Credit Card EMI Calculator',
    description: 'Calculate EMI for credit card purchases and balance transfers',
    category: 'finance/loan-calculators',
    slug: 'credit-card-emi-calculator',
    icon: CreditCard,
  },
];

export default function LoanCalculatorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Loan & Credit Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Calculate EMI, loan eligibility, interest rates, and compare loan options 
            for all types of loans including home, car, personal, and education loans.
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
            <span className="text-gray-900">Loan & Credit Calculators</span>
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
            {loanCalculators.map((calculator, index) => (
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