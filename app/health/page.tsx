import CalculatorCard from '@/components/CalculatorCard';
import { Heart, Activity, Scale, Target, Clock, Apple } from 'lucide-react';

const healthCalculators = [
  {
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and understand your health status with detailed insights',
    category: 'health',
    slug: 'bmi-calculator',
    icon: Scale,
  },
  {
    title: 'Calorie Calculator',
    description: 'Calculate daily calorie needs based on your age, gender, weight, and activity level',
    category: 'health',
    slug: 'calorie-calculator',
    icon: Apple,
  },
  {
    title: 'Heart Rate Calculator',
    description: 'Calculate target heart rate zones for optimal workout and fitness training',
    category: 'health',
    slug: 'heart-rate-calculator',
    icon: Activity,
  },
  {
    title: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using various measurement methods',
    category: 'health',
    slug: 'body-fat-calculator',
    icon: Target,
  },
  {
    title: 'Water Intake Calculator',
    description: 'Calculate daily water intake requirement based on your body weight and activity',
    category: 'health',
    slug: 'water-intake-calculator',
    icon: Heart,
  },
  {
    title: 'Sleep Calculator',
    description: 'Calculate optimal sleep and wake times based on sleep cycles',
    category: 'health',
    slug: 'sleep-calculator',
    icon: Clock,
  },
];

export default function HealthPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Health Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Monitor and improve your health with our comprehensive collection of health calculators. 
            Track fitness, nutrition, and wellness metrics easily.
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
            {healthCalculators.map((calculator, index) => (
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