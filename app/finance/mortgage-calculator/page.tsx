'use client';

import { useState } from 'react';
import { Home, Info, Download, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [results, setResults] = useState<any>(null);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;

    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                          (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = monthlyPayment * months;
    const totalInterest = totalAmount - principal;

    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal,
      downPaymentPercent: ((downPayment / homePrice) * 100).toFixed(1),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Home className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Mortgage Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate your monthly mortgage payments and total loan costs
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
                  <Home className="w-5 h-5" />
                  Calculate Your Mortgage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="home-price">Home Price ($)</Label>
                  <Input
                    id="home-price"
                    type="number"
                    value={homePrice}
                    onChange={(e) => setHomePrice(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="down-payment">Down Payment ($)</Label>
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loan-term">Loan Term (Years)</Label>
                  <Input
                    id="loan-term"
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <Button 
                  onClick={calculateMortgage} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                >
                  Calculate Mortgage
                </Button>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="mt-8">
              <AdPlaceholder size="banner" />
            </div>
          </div>

          {/* Results & Info */}
          <div className="space-y-6">
            {/* Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Mortgage Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monthly Payment</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ${results.monthlyPayment.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-semibold">${results.principal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Down Payment</span>
                      <span className="font-semibold">${downPayment.toLocaleString()} ({results.downPaymentPercent}%)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-semibold">${results.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-semibold">${results.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Mortgage Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• A 20% down payment helps avoid PMI</li>
                  <li>• Lower interest rates save thousands over time</li>
                  <li>• Consider 15-year vs 30-year terms</li>
                  <li>• Factor in property taxes and insurance</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <AdPlaceholder size="square" />
          </div>
        </div>
      </div>
    </div>
  );
}