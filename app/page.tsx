import SearchBar from '@/components/SearchBar';
import CategorySection from '@/components/CategorySection';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Heart, Hammer, ShoppingCart, Smartphone, Smile } from 'lucide-react';
import { Triangle } from "lucide-react";

const categories = [
  {
    id: 'finance',
    name: 'Finance',
    icon: TrendingUp,
    description: 'Loan, investment, tax, and financial planning calculators',
    color: 'bg-blue-500',
    count: 45,
  },
  {
    id: 'math',
    name: 'Math',
    icon: Calculator,
    description: 'Basic to advanced mathematical calculation tools',
    color: 'bg-green-500',
    count: 35,
  },
  {
    id: 'health',
    name: 'Health',
    icon: Heart,
    description: 'BMI, calorie, fitness, and health assessment tools',
    color: 'bg-red-500',
    count: 25,
  },
  {
    id: 'construction',
    name: 'Construction',
    icon: Hammer,
    description: 'Building materials, area, and construction cost calculators',
    color: 'bg-orange-500',
    count: 30,
  },
  {
    id: 'shopping',
    name: 'Shopping',
    icon: ShoppingCart,
    description: 'Discount, tax, tip, and shopping-related calculators',
    color: 'bg-purple-500',
    count: 20,
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: Smartphone,
    description: 'Data conversion, networking, and tech calculation tools',
    color: 'bg-indigo-500',
    count: 25,
  },
  {
    id: 'fun',
    name: 'Fun',
    icon: Smile,
    description: 'Entertainment, games, and recreational calculators',
    color: 'bg-pink-500',
    count: 20,
  },
];

const popularCalculators = [
  {
    title: 'Loan EMI Calculator',
    description: 'Calculate your monthly EMI for personal, home, or car loans',
    category: 'finance',
    slug: 'loan-calculator',
    icon: Calculator,
  },
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and health status',
    category: 'health',
    slug: 'bmi-calculator',
    icon: Heart,
  },
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase, and decrease',
    category: 'math',
    slug: 'percentage-calculator',
    icon: Calculator,
  },
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and total interest',
    category: 'finance',
    slug: 'mortgage-calculator',
    icon: TrendingUp,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            All the calculators
            <span className="block text-blue-600">you need — free & fast.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Calculate loans, investments, taxes, health metrics, and more in seconds with our comprehensive collection of free calculator tools.
          </p>
          
          <SearchBar />
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <span className="text-gray-700 font-medium">Popular:</span>
            {['Loan', 'EMI', 'BMI', 'Tax', 'Percentage'].map((tag) => (
              <Button key={tag} variant="outline" size="sm" className="rounded-full">
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Calculator Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCalculators.map((calculator, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <calculator.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {calculator.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {calculator.description}
                </p>
                <Button asChild className="w-full">
                  <a href={`/${calculator.category}/${calculator.slug}`}>
                    Open Calculator →
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Space Placeholder */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Advertisement Space - Google AdSense</p>
          </div>
        </div>
      </section>
    </div>
  );
}