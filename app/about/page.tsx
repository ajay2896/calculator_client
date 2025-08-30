import { Calculator, Users, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  const stats = [
    { icon: Calculator, label: 'Calculators', value: '200+' },
    { icon: Users, label: 'Monthly Users', value: '1M+' },
    { icon: Target, label: 'Categories', value: '7' },
    { icon: Award, label: 'Years Experience', value: '5+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About FreeCalc
          </h1>
          <p className="text-xl opacity-90">
            Your trusted source for free, accurate, and easy-to-use calculator tools
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* About Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                At FreeCalc, we believe that everyone should have access to powerful, accurate calculation tools 
                without any cost barriers. Our mission is to provide comprehensive, user-friendly calculators 
                that help people make informed decisions in their personal, professional, and academic lives.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Finance Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Comprehensive financial calculators for loans, investments, taxes, and planning.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Health & Fitness</h4>
                  <p className="text-gray-600 text-sm">
                    Health calculators for BMI, calories, fitness tracking, and wellness planning.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Math & Science</h4>
                  <p className="text-gray-600 text-sm">
                    Mathematical calculators from basic arithmetic to advanced scientific calculations.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Specialized Tools</h4>
                  <p className="text-gray-600 text-sm">
                    Industry-specific calculators for construction, technology, shopping, and more.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Choose FreeCalc?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Always Free:</strong> All our calculators are completely free to use with no hidden charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Accurate Results:</strong> Our calculators use industry-standard formulas and are regularly updated</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>User-Friendly:</strong> Simple, intuitive interfaces designed for users of all technical levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>Mobile Optimized:</strong> All calculators work perfectly on desktop, tablet, and mobile devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span><strong>No Registration:</strong> Start calculating immediately without creating accounts or signing up</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Ad Space */}
        <div className="mt-12 bg-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">Advertisement Space - Google AdSense</p>
        </div>
      </div>
    </div>
  );
}