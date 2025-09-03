'use client';

import { useState } from 'react';
import { Calculator, Info, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [loanTenure, setLoanTenure] = useState(10);
  const [results, setResults] = useState<any>(null);

  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Loan EMI Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate your monthly EMI for personal, home, or car loans instantly
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
                  <Calculator className="w-5 h-5" />
                  Calculate Your EMI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="loan-amount">Loan Amount (₹)</Label>
                  <Input
                    id="loan-amount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                  <Label htmlFor="loan-tenure">Loan Tenure (Years)</Label>
                  <Input
                    id="loan-tenure"
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <Button 
                  onClick={calculateEMI} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                >
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="mt-8 bg-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500">Advertisement Space - Google AdSense</p>
            </div>
          </div>

          {/* Results & Info */}
          <div className="space-y-6">
            {/* Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>EMI Calculation Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{results.emi.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Principal Amount</span>
                      <span className="font-semibold">₹{results.principal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Total Interest</span>
                      <span className="font-semibold">₹{results.totalInterest.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="font-semibold">₹{results.totalAmount.toLocaleString()}</span>
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
                  How EMI is Calculated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  EMI (Equated Monthly Installment) is calculated using the formula: 
                  EMI = [P x R x (1+R)^N] / [(1+R)^N-1], where P is the principal amount, 
                  R is the monthly interest rate, and N is the number of months.
                </p>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-6 text-center">
              <p className="text-gray-500 text-sm">Advertisement Space</p>
            </div>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="mt-12 prose max-w-none">
          <Card>
            <CardHeader>
              <CardTitle>About Loan EMI Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Our Loan EMI Calculator helps you determine the exact monthly installment amount 
                you'll need to pay for your loan. Whether it's a personal loan, home loan, or car loan, 
                this calculator provides accurate results instantly.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Instant EMI calculation for any loan amount</li>
                <li>Detailed breakdown of principal and interest components</li>
                <li>Total interest and amount payable over the loan tenure</li>
                <li>Easy-to-understand results with visual representation</li>
                <li>Download facility for future reference</li>
              </ul>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">How to Use:</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Enter the total loan amount you want to borrow</li>
                <li>Input the annual interest rate offered by your lender</li>
                <li>Specify the loan tenure in years</li>
                <li>Click 'Calculate EMI' to get instant results</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}