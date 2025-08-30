import CalculatorCard from '@/components/CalculatorCard';
import { Smile, Gamepad2, Calendar, Star, Heart, Dice6 } from 'lucide-react';

const funCalculators = [
  {
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes',
    category: 'fun',
    slug: 'age-calculator',
    icon: Calendar,
  },
  {
    title: 'Love Calculator',
    description: 'Calculate love compatibility between two people (just for fun!)',
    category: 'fun',
    slug: 'love-calculator',
    icon: Heart,
  },
  {
    title: 'Random Number Generator',
    description: 'Generate random numbers, dice rolls, and lottery numbers',
    category: 'fun',
    slug: 'random-number-generator',
    icon: Dice6,
  },
  {
    title: 'Zodiac Calculator',
    description: 'Find your zodiac sign and compatibility with others',
    category: 'fun',
    slug: 'zodiac-calculator',
    icon: Star,
  },
  {
    title: 'Game Score Calculator',
    description: 'Calculate scores for various games and tournaments',
    category: 'fun',
    slug: 'game-score-calculator',
    icon: Gamepad2,
  },
  {
    title: 'Fun Facts Calculator',
    description: 'Calculate interesting facts about numbers, dates, and statistics',
    category: 'fun',
    slug: 'fun-facts-calculator',
    icon: Smile,
  },
];

export default function FunPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Smile className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fun Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Entertaining calculators for games, compatibility, random numbers, 
            and other fun mathematical activities.
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
            {funCalculators.map((calculator, index) => (
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