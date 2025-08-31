'use client';

import { useState } from 'react';
import { Percent, Info, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Results = {
  percentageOf?: string;
  whatPercent?: string;
  percentageChange?: string;
};

export default function PercentageCalculatorPage() {
  const [value, setValue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [originalValue, setOriginalValue] = useState(0);
  const [newValue, setNewValue] = useState(0);
  const [results, setResults] = useState<Results>({});

  const calculatePercentageOf = () => {
    const result = (percentage / 100) * value;
    setResults(prev => ({ ...prev, percentageOf: result.toFixed(2) }));
  };

  const calculateWhatPercent = () => {
    if (originalValue !== 0) {
      const result = (value / originalValue) * 100;
      setResults(prev => ({ ...prev, whatPercent: result.toFixed(2) }));
    }
  };

  const calculatePercentageChange = () => {
    if (originalValue !== 0) {
      const change = ((newValue - originalValue) / originalValue) * 100;
      setResults(prev => ({ ...prev, percentageChange: change.toFixed(2) }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Percent className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Percentage Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate percentages, percentage increase, decrease, and more
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Percentage Calculations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="percentage-of" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="percentage-of">% of Number</TabsTrigger>
                    <TabsTrigger value="what-percent">What %</TabsTrigger>
                    <TabsTrigger value="percentage-change">% Change</TabsTrigger>
                  </TabsList>
                  
                  {/* % of Number */}
                  <TabsContent value="percentage-of" className="space-y-4">
                    <p className="text-gray-600">What is X% of Y?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Percentage (%)</Label>
                        <Input
                          type="number"
                          value={percentage}
                          onChange={(e) => setPercentage(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Of Number</Label>
                        <Input
                          type="number"
                          value={value}
                          onChange={(e) => setValue(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <Button onClick={calculatePercentageOf} className="w-full">
                      Calculate
                    </Button>
                    {results.percentageOf && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold">
                          {percentage}% of {value} = {results.percentageOf}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* What % */}
                  <TabsContent value="what-percent" className="space-y-4">
                    <p className="text-gray-600">X is what percent of Y?</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>First Number</Label>
                        <Input
                          type="number"
                          value={value}
                          onChange={(e) => setValue(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>Second Number</Label>
                        <Input
                          type="number"
                          value={originalValue}
                          onChange={(e) => setOriginalValue(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <Button onClick={calculateWhatPercent} className="w-full">
                      Calculate
                    </Button>
                    {results.whatPercent && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold">
                          {value} is {results.whatPercent}% of {originalValue}
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* % Change */}
                  <TabsContent value="percentage-change" className="space-y-4">
                    <p className="text-gray-600">Percentage increase/decrease from X to Y</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Original Value</Label>
                        <Input
                          type="number"
                          value={originalValue}
                          onChange={(e) => setOriginalValue(Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <Label>New Value</Label>
                        <Input
                          type="number"
                          value={newValue}
                          onChange={(e) => setNewValue(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <Button onClick={calculatePercentageChange} className="w-full">
                      Calculate
                    </Button>
                    {results.percentageChange && (
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <p className="text-lg font-semibold">
                          Percentage Change: {results.percentageChange}%
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <p><strong>% of Number:</strong> Find what percentage of a number equals another number.</p>
                <p><strong>What %:</strong> Find what percentage one number is of another.</p>
                <p><strong>% Change:</strong> Calculate percentage increase or decrease between two values.</p>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm">Advertisement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
