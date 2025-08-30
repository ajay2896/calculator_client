import CalculatorCard from '@/components/CalculatorCard';
import { Hammer, Home, Ruler, Calculator, Truck, Wrench } from 'lucide-react';

const constructionCalculators = [
  {
    title: 'Concrete Calculator',
    description: 'Calculate the amount of concrete needed for your construction project',
    category: 'construction',
    slug: 'concrete-calculator',
    icon: Home,
  },
  {
    title: 'Paint Calculator',
    description: 'Calculate how much paint you need for walls, rooms, and surfaces',
    category: 'construction',
    slug: 'paint-calculator',
    icon: Hammer,
  },
  {
    title: 'Flooring Calculator',
    description: 'Calculate materials needed for tile, hardwood, carpet, and other flooring',
    category: 'construction',
    slug: 'flooring-calculator',
    icon: Ruler,
  },
  {
    title: 'Roofing Calculator',
    description: 'Calculate roofing materials, shingles, and costs for your roof project',
    category: 'construction',
    slug: 'roofing-calculator',
    icon: Triangle,
  },
  {
    title: 'Drywall Calculator',
    description: 'Calculate drywall sheets and joint compound needed for your project',
    category: 'construction',
    slug: 'drywall-calculator',
    icon: Calculator,
  },
  {
    title: 'Gravel Calculator',
    description: 'Calculate gravel, sand, and aggregate needed for driveways and landscaping',
    category: 'construction',
    slug: 'gravel-calculator',
    icon: Truck,
  },
];

export default function ConstructionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Hammer className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Construction Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Plan your construction projects with precision using our comprehensive 
            collection of building and construction calculators.
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
            {constructionCalculators.map((calculator, index) => (
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