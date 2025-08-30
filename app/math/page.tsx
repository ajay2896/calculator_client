import CalculatorCard from '@/components/CalculatorCard';
import { Calculator, Percent, Square, Triangle, Circle, Plus } from 'lucide-react';

const mathCalculators = [
  {
    title: 'Percentage Calculator',
    description: 'Calculate percentages, percentage increase, decrease, and percentage of a number',
    category: 'math',
    slug: 'percentage-calculator',
    icon: Percent,
  },
  {
    title: 'Area Calculator',
    description: 'Calculate area of various shapes including rectangles, circles, triangles, and more',
    category: 'math',
    slug: 'area-calculator',
    icon: Square,
  },
  {
    title: 'Scientific Calculator',
    description: 'Advanced scientific calculator with trigonometric, logarithmic, and exponential functions',
    category: 'math',
    slug: 'scientific-calculator',
    icon: Calculator,
  },
  {
    title: 'Algebra Calculator',
    description: 'Solve algebraic equations, simplify expressions, and find unknowns',
    category: 'math',
    slug: 'algebra-calculator',
    icon: Plus,
  },
  {
    title: 'Geometry Calculator',
    description: 'Calculate perimeter, area, volume for geometric shapes and figures',
    category: 'math',
    slug: 'geometry-calculator',
    icon: Triangle,
  },
  {
    title: 'Circle Calculator',
    description: 'Calculate circumference, area, diameter, and radius of circles',
    category: 'math',
    slug: 'circle-calculator',
    icon: Circle,
  },
];

export default function MathPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Calculator className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Math Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Solve mathematical problems quickly and accurately with our comprehensive 
            collection of math calculators and tools.
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
            {mathCalculators.map((calculator, index) => (
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