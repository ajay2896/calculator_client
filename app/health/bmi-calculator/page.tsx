'use client';

import { useState } from 'react';
import { Scale, Info, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(175);
  const [unit, setUnit] = useState('metric');
  const [results, setResults] = useState<any>(null);

  const calculateBMI = () => {
    let heightInMeters = height / 100;
    let weightInKg = weight;

    if (unit === 'imperial') {
      // Convert feet/inches to meters and pounds to kg
      heightInMeters = height * 0.3048;
      weightInKg = weight * 0.453592;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = '';
    let recommendation = '';
    let color = '';

    if (bmi < 18.5) {
      category = 'Underweight';
      recommendation = 'Consider gaining weight through a healthy diet and exercise.';
      color = 'text-blue-600';
    } else if (bmi < 25) {
      category = 'Normal weight';
      recommendation = 'Maintain your current weight through healthy lifestyle choices.';
      color = 'text-green-600';
    } else if (bmi < 30) {
      category = 'Overweight';
      recommendation = 'Consider losing weight through diet and exercise.';
      color = 'text-yellow-600';
    } else {
      category = 'Obese';
      recommendation = 'Consult with a healthcare provider for a weight management plan.';
      color = 'text-red-600';
    }

    setResults({
      bmi: bmi.toFixed(1),
      category,
      recommendation,
      color,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-red-500 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            BMI Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate your Body Mass Index and understand your health status
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5" />
                  Calculate Your BMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="unit-system">Unit System</Label>
                  <Select value={unit} onValueChange={setUnit}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="weight">
                    Weight ({unit === 'metric' ? 'kg' : 'lbs'})
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">
                    Height ({unit === 'metric' ? 'cm' : 'ft'})
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    step="0.1"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <Button 
                  onClick={calculateBMI} 
                  className="w-full bg-red-500 hover:bg-red-600 text-lg py-6"
                >
                  Calculate BMI
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results & Info */}
          <div className="space-y-6">
            {/* Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Your BMI Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Your BMI</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {results.bmi}
                    </p>
                    <p className={`text-lg font-semibold ${results.color}`}>
                      {results.category}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {results.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* BMI Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  BMI Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-blue-600 font-medium">Underweight</span>
                    <span className="text-sm text-gray-600">Below 18.5</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-green-600 font-medium">Normal</span>
                    <span className="text-sm text-gray-600">18.5 - 24.9</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-yellow-600 font-medium">Overweight</span>
                    <span className="text-sm text-gray-600">25.0 - 29.9</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-red-600 font-medium">Obese</span>
                    <span className="text-sm text-gray-600">30.0 and above</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm">Advertisement Space</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}