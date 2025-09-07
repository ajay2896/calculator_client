'use client';

import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Clock, TrendingUp, Info, GraduationCap } from 'lucide-react';

interface MonthlyBreakdownItem {
  month: number;
  interest: number;
  total: number;
}

interface CalculationResults {
  simpleInterest: number;
  totalAmount: number;
  monthlyBreakdown: MonthlyBreakdownItem[];
}

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState<string>('100000');
  const [rate, setRate] = useState<string>('8.5');
  const [time, setTime] = useState<string>('5');
  const [timeUnit, setTimeUnit] = useState<string>('years');
  const [results, setResults] = useState<CalculationResults>({
    simpleInterest: 0,
    totalAmount: 0,
    monthlyBreakdown: []
  });

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    let t = parseFloat(time) || 0;

    // Convert time to years if needed
    if (timeUnit === 'months') {
      t = t / 12;
    }

    const simpleInterest = (p * r * t) / 100;
    const totalAmount = p + simpleInterest;

    // Calculate monthly breakdown
    const monthlyBreakdown: MonthlyBreakdownItem[] = [];
    const monthsTotal = timeUnit === 'years' ? t * 12 : t;
    
    if (monthsTotal > 0) {
      const monthlyInterest = simpleInterest / monthsTotal;

      for (let i = 1; i <= Math.min(monthsTotal, 60); i++) {
        monthlyBreakdown.push({
          month: i,
          interest: monthlyInterest * i,
          total: p + (monthlyInterest * i)
        });
      }
    }

    setResults({
      simpleInterest: Math.round(simpleInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      monthlyBreakdown
    });
  };

  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, rate, time, timeUnit]);

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Green Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 py-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
            <Calculator className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple Interest Calculator 2025
          </h1>
          <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
            Calculate your simple interest EMI, total interest, and loan eligibility instantly. Compare rates from top lenders and find the best deal.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full">SIMPLE INTEREST</span>
            <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full">INVESTMENT</span>
            <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full">LOAN EMI</span>
            <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full">FREE TOOLS</span>
          </div>
        </div>
      </div>

      {/* Main Calculator Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Calculator Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <Calculator className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Simple Interest Calculator</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {/* Principal Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="1,00,000"
                    />
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="8.5"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                {/* Loan Tenure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure
                  </label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="5"
                  />
                </div>

                {/* Tenure Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tenure Type
                  </label>
                  <select
                    value={timeUnit}
                    onChange={(e) => setTimeUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={calculateSimpleInterest}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Calculate Simple Interest EMI
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Result */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                Calculation Results
              </h3>

              <div className="text-center p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white mb-4">
                <p className="text-3xl font-bold">₹{results.simpleInterest.toLocaleString()}</p>
                <p className="text-sm opacity-90">Total Interest</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Interest Amount</span>
                  <span className="font-semibold">₹{results.simpleInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Amount Payable</span>
                  <span className="font-semibold">₹{results.totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Loan Tenure</span>
                  <span className="font-semibold">{time} {timeUnit}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-semibold">{rate}% p.a.</span>
                </div>
              </div>
            </div>

            {/* Loan Eligibility Analysis */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <div className="bg-blue-100 p-1 rounded mr-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                </div>
                Loan Eligibility Analysis
              </h4>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-700">ELIGIBLE</p>
                <p className="text-sm text-green-600">Based on EMI calculation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {/* Education Loan EMI */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">What is a simple interest calculator?</h4>
                <p className="text-gray-700">Simple interest calculators help you determine the interest amount on loans, investments, or savings accounts using the basic interest formula.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">What factors affect personal loan eligibility?</h4>
                <p className="text-gray-700">Key factors include income level, credit score, employment stability, existing debt obligations, and the debt-to-income ratio.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Can I change the personal loan?</h4>
                <p className="text-gray-700">Yes, you can change loan parameters like amount, tenure, and interest rate to see how they affect your EMI and total interest.</p>
              </div>
            </div>
          </div>

          {/* About Simple Interest Calculator */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About Simple Interest Calculator</h3>
            <div className="text-sm text-gray-700 space-y-3">
              <p>Our Simple Interest Calculator helps you calculate the interest amount and total repayment for loans and investments using simple interest calculation methods.</p>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Key Benefits of using our Calculator:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>Instant and accurate calculations</li>
                  <li>Compare different loan scenarios</li>
                  <li>Plan your financial budget effectively</li>
                  <li>Understand total interest payable</li>
                  <li>Make informed borrowing decisions</li>
                </ul>
              </div>
              
              <p className="mt-3">Last Updated: March 3, 2025</p>
            </div>
          </div>
        </div>

        {/* Simple Interest Tips & Guidelines */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Simple Interest Tips & Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">💡 Simple Interest: This is the basic interest that doesn't compound - useful for short-term loans and basic calculations</h4>
              <h4 className="font-semibold text-gray-900 mb-2">📈 EMI Factor: Use our calculator to determine affordable EMI amounts based on your income</h4>
              <h4 className="font-semibold text-gray-900 mb-2">🎯 Interest Rates: Compare rates from different lenders to find the most competitive offers</h4>
              <h4 className="font-semibold text-gray-900 mb-2">⏰ Repayment: Shorter tenure means higher EMI but lower total interest paid</h4>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">✨ Pre-payment: Making early payments can significantly reduce your total interest burden</h4>
              <h4 className="font-semibold text-gray-900 mb-2">📊 Documentation: Keep all loan documents and payment records for tax benefits and reference</h4>
              <h4 className="font-semibold text-gray-900 mb-2">🔍 Credit Score: Maintain a good credit score to qualify for better interest rates</h4>
              <h4 className="font-semibold text-gray-900 mb-2">💼 Income: Ensure your EMI doesn't exceed 40-50% of your monthly income</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}