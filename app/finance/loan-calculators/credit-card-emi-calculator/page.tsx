'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Calculator, Calendar, Percent, DollarSign, Info, AlertCircle, TrendingUp, PieChart, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  monthlyBreakdown: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
}

const CreditCardEMICalculator = () => {
  const [purchaseAmount, setPurchaseAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(18);
  const [tenure, setTenure] = useState(12);
  const [processingFee, setProcessingFee] = useState(2);
  const [results, setResults] = useState<EMIResult | null>(null);
  const [selectedTenure, setSelectedTenure] = useState(12);
  const [tenureComparison, setTenureComparison] = useState<any[]>([]);

  // Ad Component Placeholder
  const AdBanner = ({ size, className }: { size: string; className?: string }) => (
    <div className={`bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-dashed border-blue-300 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <div className="text-blue-600 mb-2">
          <BarChart3 className="w-8 h-8 mx-auto" />
        </div>
        <p className="text-sm text-blue-700 font-medium">Advertisement</p>
        <p className="text-xs text-blue-600">{size}</p>
      </div>
    </div>
  );

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    let balance = principal;
    const breakdown = [];
    
    for (let month = 1; month <= months; month++) {
      const interestAmount = balance * monthlyRate;
      const principalAmount = emi - interestAmount;
      balance = balance - principalAmount;
      
      breakdown.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalAmount),
        interest: Math.round(interestAmount),
        balance: Math.round(Math.max(0, balance))
      });
    }
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    const actualProcessingFee = (principal * processingFee) / 100;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount + actualProcessingFee),
      totalInterest: Math.round(totalInterest + actualProcessingFee),
      monthlyBreakdown: breakdown
    };
  };

  const generateTenureComparison = () => {
    const tenures = [6, 12, 18, 24, 36];
    const comparison = tenures.map(months => {
      const result = calculateEMI(purchaseAmount, interestRate, months);
      return {
        tenure: months,
        emi: result.emi,
        totalAmount: result.totalAmount,
        totalInterest: result.totalInterest,
        savings: result.totalAmount - calculateEMI(purchaseAmount, interestRate, 36).totalAmount
      };
    });
    setTenureComparison(comparison);
  };

  useEffect(() => {
    const result = calculateEMI(purchaseAmount, interestRate, tenure);
    setResults(result);
    generateTenureComparison();
  }, [purchaseAmount, interestRate, tenure, processingFee]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const pieData = results ? [
    { name: 'Principal', value: purchaseAmount, color: '#3b82f6' },
    { name: 'Interest & Fees', value: results.totalInterest, color: '#ef4444' }
  ] : [];

  const COLORS = ['#3b82f6', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <CreditCard className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Credit Card EMI Calculator
            </h1>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Calculate your credit card EMI, compare different tenure options, and make informed financial decisions. 
              Get detailed payment schedules and interest breakdowns instantly.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-8 text-blue-100">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Instant Calculations</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Detailed Breakdown</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span>Multiple Tenure Options</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Top Banner Ad */}
        <AdBanner size="728x90" className="h-24 mb-8" />

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-6 border border-gray-100">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl mr-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Calculate EMI</h2>
                  <p className="text-gray-500 text-sm">Enter your details</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Purchase Amount */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                    Purchase Amount
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      value={purchaseAmount}
                      onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="50000"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    {[25000, 50000, 100000, 200000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setPurchaseAmount(amount)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        ₹{amount/1000}K
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <Percent className="w-4 h-4 mr-2 text-green-600" />
                    Annual Interest Rate
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full pl-4 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="18"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    Typical range: 12% - 42% per annum
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                    Tenure (Months)
                  </label>
                  <div className="relative group">
                    <select
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg font-semibold appearance-none bg-white"
                    >
                      <option value={3}>3 months</option>
                      <option value={6}>6 months</option>
                      <option value={9}>9 months</option>
                      <option value={12}>12 months</option>
                      <option value={18}>18 months</option>
                      <option value={24}>24 months</option>
                      <option value={36}>36 months</option>
                      <option value={48}>48 months</option>
                    </select>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>

                {/* Processing Fee */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 mr-2 text-orange-600" />
                    Processing Fee (%)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      step="0.1"
                      value={processingFee}
                      onChange={(e) => setProcessingFee(Number(e.target.value))}
                      className="w-full pl-4 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="2"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    Usually 1% - 3% of purchase amount
                  </div>
                </div>
              </div>

              {/* Side Ad */}
              <div className="mt-8">
                <AdBanner size="300x250" className="h-64" />
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            {results && (
              <>
                {/* Key Metrics Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Monthly EMI</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Calendar className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {formatCurrency(results.emi)}
                    </div>
                    <p className="text-blue-100 text-sm">
                      Fixed monthly payment
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Total Amount</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {formatCurrency(results.totalAmount)}
                    </div>
                    <p className="text-green-100 text-sm">
                      Including all charges
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Total Interest</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Percent className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <p className="text-red-100 text-sm">
                      Extra amount paid
                    </p>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Pie Chart */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Payment Breakdown
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Balance Over Time Chart */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <BarChart3 className="w-6 h-6 mr-3 text-green-600" />
                      Outstanding Balance
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={results.monthlyBreakdown.slice(0, 24)}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="month" 
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => formatCurrency(value)}
                          />
                          <Tooltip 
                            formatter={(value: number) => formatCurrency(value)}
                            labelFormatter={(month) => `Month ${month}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="balance" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Tenure Comparison */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
                    Compare Different Tenures
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-6 font-bold text-gray-700">Tenure</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Monthly EMI</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Total Amount</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Total Interest</th>
                          <th className="text-center py-4 px-6 font-bold text-gray-700">Recommendation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tenureComparison.map((row, index) => (
                          <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${row.tenure === tenure ? 'bg-blue-50 border-blue-200' : ''}`}>
                            <td className="py-4 px-6 font-bold text-gray-900">{row.tenure} months</td>
                            <td className="py-4 px-6 text-right font-bold text-blue-600">
                              {formatCurrency(row.emi)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-green-600">
                              {formatCurrency(row.totalAmount)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-red-600">
                              {formatCurrency(row.totalInterest)}
                            </td>
                            <td className="py-4 px-6 text-center">
                              {row.tenure <= 12 ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Best
                                </div>
                              ) : row.tenure <= 24 ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                                  <Info className="w-4 h-4 mr-1" />
                                  Good
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800">
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Costly
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Payment Schedule */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
                    Payment Schedule (First 12 Months)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Month</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">EMI</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Principal</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Interest</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.monthlyBreakdown.slice(0, 12).map((row, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-4 font-bold text-gray-900">{row.month}</td>
                            <td className="py-4 px-4 text-right font-bold text-blue-600">
                              {formatCurrency(row.emi)}
                            </td>
                            <td className="py-4 px-4 text-right font-medium text-green-600">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="py-4 px-4 text-right font-medium text-red-600">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="py-4 px-4 text-right font-bold text-gray-900">
                              {formatCurrency(row.balance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Banner Ad */}
        <AdBanner size="728x90" className="h-24 my-12" />

        {/* Comprehensive Educational Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-12 border border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Guide to Credit Card EMI
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Everything you need to know about credit card EMIs, how they work, and how to use them wisely
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* What is Credit Card EMI */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <Info className="w-6 h-6 mr-3" />
                  What is Credit Card EMI?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Credit Card EMI (Equated Monthly Installment) allows you to convert your credit card purchases 
                  or outstanding balance into fixed monthly payments over a predetermined period. Instead of paying 
                  the full amount at once, you can spread it across several months.
                </p>
                <div className="bg-white rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Fixed monthly payments</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Flexible tenure options</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />No additional documentation</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Instant approval</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
                <h3 className="text-2xl font-bold text-green-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Benefits of Credit Card EMI
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-lg p-2 mr-4 mt-1">
                      <DollarSign className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Better Cash Flow Management</h4>
                      <p className="text-gray-600 text-sm">Spread large purchases over months without straining your monthly budget</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-lg p-2 mr-4 mt-1">
                      <Percent className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Lower Interest Rates</h4>
                      <p className="text-gray-600 text-sm">EMI rates are typically lower than regular credit card interest rates</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-lg p-2 mr-4 mt-1">
                      <Calendar className="w-4 h-4 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Flexible Tenure</h4>
                      <p className="text-gray-600 text-sm">Choose from 3 to 48 months based on your repayment capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How EMI Works */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
                  <Calculator className="w-6 h-6 mr-3" />
                  How EMI Calculation Works
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Credit card EMI is calculated using the reducing balance method. The formula used is:
                </p>
                <div className="bg-white rounded-xl p-6 mb-4">
                  <div className="text-center">
                    <code className="text-lg font-mono bg-gray-100 px-4 py-2 rounded-lg">
                      EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
                    </code>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p><strong>P</strong> = Principal amount (Purchase amount)</p>
                    <p><strong>R</strong> = Monthly interest rate (Annual rate ÷ 12)</p>
                    <p><strong>N</strong> = Number of months (Tenure)</p>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Example:</h4>
                  <p className="text-sm text-purple-700">
                    For ₹50,000 at 18% annual interest for 12 months:<br />
                    Monthly EMI = ₹4,992<br />
                    Total Interest = ₹9,908
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Important Considerations
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Processing Fees
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Banks typically charge 1-3% of the purchase amount as processing fee
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Prepayment Charges
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Some banks charge prepayment penalties if you close the EMI early
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Credit Limit Impact
                    </h4>
                    <p className="text-gray-600 text-sm">
                      EMI amount reduces your available credit limit until fully paid
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips and Best Practices */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Smart EMI Tips & Best Practices</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-3">Choose Shorter Tenure</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Opt for the shortest tenure you can comfortably afford. This reduces total interest significantly. 
                  A 12-month EMI costs much less than a 36-month EMI in total interest.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-green-900 mb-3">Compare Interest Rates</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Different banks offer different EMI rates. Compare offers from multiple banks before converting 
                  purchases to EMI. Even a 1-2% difference can save thousands of rupees.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-purple-900 mb-3">Calculate Before Buying</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Always use an EMI calculator before making large purchases. Understand the total cost 
                  including interest and fees to make informed financial decisions.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-orange-900 mb-3">Avoid Multiple EMIs</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Running multiple EMIs simultaneously can strain your finances and reduce available credit. 
                  Plan your purchases and EMIs wisely to maintain financial health.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                <div className="bg-indigo-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-indigo-900 mb-3">Emergency Fund First</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Ensure you have an emergency fund before taking EMIs. This prevents missing EMI payments 
                  during unexpected financial situations and protects your credit score.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-teal-900 mb-3">Read Terms Carefully</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Understand all terms including processing fees, prepayment charges, and late payment penalties. 
                  Some banks offer 0% EMI which might have hidden charges.
                </p>
              </div>
            </div>
          </div>

          {/* When to Use Credit Card EMI */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">When Should You Use Credit Card EMI?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-green-700 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Good Times to Use EMI
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm">Large essential purchases like appliances, electronics</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm">Medical emergencies when cash is not readily available</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm">When EMI interest is lower than other loan options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-sm">To maintain cash flow for other investments</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-red-700 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2" />
                  Avoid EMI When
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-sm">You can afford to pay the full amount immediately</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-sm">For luxury items or impulsive purchases</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-sm">When you're already running multiple EMIs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-red-100 rounded-full p-1 mr-3 mt-1">
                      <XCircle className="w-3 h-3 text-red-600" />
                    </div>
                    <span className="text-sm">If your monthly expenses exceed 70% of your income</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Can I prepay my credit card EMI?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Yes, most banks allow prepayment of credit card EMI. However, some banks charge a prepayment penalty 
                  ranging from 2-3% of the outstanding amount. Check with your bank before prepaying to avoid unexpected charges.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Is 0% EMI really free?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: 0% EMI means you don't pay interest, but there might be processing fees, GST, or the discount might be 
                  adjusted from the product price. Always compare the total cost with and without EMI to make an informed decision.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: What happens if I miss an EMI payment?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Missing EMI payments can result in late payment charges, increased interest rates, negative impact on credit score, 
                  and in extreme cases, the bank might cancel the EMI facility and demand full payment immediately.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Can I convert my existing credit card balance to EMI?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Yes, most banks offer balance transfer to EMI facility. You can convert your outstanding credit card balance 
                  into EMI, which typically has lower interest rates compared to regular credit card interest charges.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: How does credit card EMI affect my credit score?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Regular EMI payments can positively impact your credit score as they show responsible credit behavior. 
                  However, missing payments or defaulting can severely damage your credit score and future borrowing capacity.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Can I get a tax benefit on credit card EMI?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Generally, credit card EMI interest is not eligible for tax deductions under income tax laws. 
                  However, if the purchase is for business purposes, you might be able to claim it as a business expense.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Make Smart Financial Decisions</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Use our calculator to plan your EMI payments wisely. Compare different options and choose what works best for your financial goals.
          </p>
          <div className="flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Always Free</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Accurate Calculations</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Expert Financial Guidance</span>
            </div>
          </div>
        </div>

        {/* Bottom Ad Space */}
        <div className="mt-12">
          <AdBanner size="970x250" className="h-32" />
        </div>
      </div>
    </div>
  );
};

export default CreditCardEMICalculator;