import Link from 'next/link';
import { TrendingUp, Calculator, PiggyBank, CreditCard, Building2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const financeSubcategories = [
  {
    title: 'Loan & Credit Calculators',
    description: 'EMI, home loans, car loans, personal loans, and credit calculators',
    href: '/finance/loan-calculators',
    icon: CreditCard,
    color: 'bg-blue-500',
    count: 9,
    calculators: ['EMI Calculator', 'Home Loan', 'Car Loan', 'Personal Loan']
  },
  {
    title: 'Investment & Returns Calculators',
    description: 'SIP, mutual funds, FD, PPF, and investment return calculators',
    href: '/finance/investment-calculators',
    icon: TrendingUp,
    color: 'bg-green-500',
    count: 10,
    calculators: ['SIP Calculator', 'Mutual Fund', 'FD Calculator', 'PPF Calculator']
  },
  {
    title: 'Savings & Wealth Calculators',
    description: 'Savings goals, emergency funds, and wealth planning tools',
    href: '/finance/savings-calculators',
    icon: PiggyBank,
    color: 'bg-purple-500',
    count: 6,
    calculators: ['Savings Goal', 'Emergency Fund', 'Future Value', 'Net Worth']
  },
  {
    title: 'Tax & Salary Calculators',
    description: 'Income tax, HRA, salary, GST, and tax planning calculators',
    href: '/finance/tax-salary-calculators',
    icon: Calculator,
    color: 'bg-orange-500',
    count: 7,
    calculators: ['Income Tax', 'HRA Calculator', 'Salary Calculator', 'GST Calculator']
  },
  {
    title: 'Real Estate & Property Calculators',
    description: 'Home affordability, mortgage, rent vs buy, and property calculators',
    href: '/finance/property-calculators',
    icon: Building2,
    color: 'bg-indigo-500',
    count: 5,
    calculators: ['Home Affordability', 'Mortgage', 'Rent vs Buy', 'Property Tax']
  },
  {
    title: 'Forex & International Finance',
    description: 'Currency conversion, import duty, and international finance tools',
    href: '/finance/forex-calculators',
    icon: DollarSign,
    color: 'bg-teal-500',
    count: 3,
    calculators: ['Currency Converter', 'Import Duty', 'Inflation Adjusted']
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

      {/* Subcategories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Finance Calculator Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {financeSubcategories.map((subcategory, index) => (
              <Link key={index} href={subcategory.href} className="group">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                  <CardHeader>
                    <div className={`w-16 h-16 ${subcategory.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <subcategory.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {subcategory.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {subcategory.description}
                    </p>
                    
                    {/* <div className="space-y-2 mb-4">
                      <p className="text-sm font-medium text-gray-700">Popular Tools:</p>
                      <div className="flex flex-wrap gap-1">
                        {subcategory.calculators.slice(0, 3).map((calc, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {calc}
                          </span>
                        ))}
                        {subcategory.calculators.length > 3 && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                            +{subcategory.calculators.length - 3} more
                          </span>
                        )}
                      </div>
                    </div> */}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium text-sm group-hover:underline">
                        View All Tools →
                      </span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {subcategory.count} tools
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
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