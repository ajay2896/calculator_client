'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Calendar, Percent, Plus, Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7);
  const [time, setTime] = useState(10);
  const [compound, setCompound] = useState(12);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [results, setResults] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const compoundFrequencies = [
    { value: 1, label: 'Annually' },
    { value: 2, label: 'Semi-annually' },
    { value: 4, label: 'Quarterly' },
    { value: 12, label: 'Monthly' },
    { value: 365, label: 'Daily' }
  ];

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal.toString()) || 0;
    const r = (parseFloat(rate.toString()) || 0) / 100;
    const t = parseFloat(time.toString()) || 0;
    const n = parseFloat(compound.toString()) || 12;
    const PMT = parseFloat(monthlyContribution.toString()) || 0;

    // Calculate compound interest with regular contributions
    const monthlyRate = r / 12;
    const totalMonths = t * 12;
    
    let data = [];
    let currentAmount = P;
    let totalContributions = P;

    // Calculate year by year for chart
    for (let year = 0; year <= t; year++) {
      if (year === 0) {
        data.push({
          year: year,
          amount: P,
          principal: P,
          interest: 0,
          contributions: P
        });
      } else {
        const months = year * 12;
        
        // Calculate with monthly contributions
        if (PMT > 0) {
          currentAmount = P * Math.pow(1 + monthlyRate, months);
          if (monthlyRate !== 0) {
            currentAmount += PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
          } else {
            currentAmount += PMT * months;
          }
        } else {
          // Simple compound interest without contributions
          currentAmount = P * Math.pow(1 + r/n, n * year);
        }
        
        totalContributions = P + (PMT * 12 * year);
        const interestEarned = currentAmount - totalContributions;
        
        data.push({
          year: year,
          amount: Math.round(currentAmount * 100) / 100,
          principal: Math.round(totalContributions * 100) / 100,
          interest: Math.round(interestEarned * 100) / 100,
          contributions: Math.round(totalContributions * 100) / 100
        });
      }
    }

    const finalAmount = data[data.length - 1].amount;
    const finalContributions = P + (PMT * 12 * t);
    const totalInterest = finalAmount - finalContributions;
    
    setResults({
      finalAmount: Math.round(finalAmount * 100) / 100,
      totalContributions: Math.round(finalContributions * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      effectiveRate: Math.round(((finalAmount / finalContributions - 1) / t) * 100 * 100) / 100
    });
    
    setChartData(data);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, compound, monthlyContribution]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate how your money grows over time with compound interest. 
            See the power of compounding with different frequencies and regular contributions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="flex items-center mb-6">
                <Calculator className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Calculate</h2>
              </div>

              <div className="space-y-6">
                {/* Initial Investment */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Initial Investment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="10000"
                    />
                  </div>
                </div>

                {/* Annual Interest Rate */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="w-4 h-4 mr-2" />
                    Annual Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-full pl-4 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="7"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </div>

                {/* Time Period */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10"
                  />
                </div>

                {/* Compounding Frequency */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Compounding Frequency
                  </label>
                  <select
                    value={compound}
                    onChange={(e) => setCompound(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {compoundFrequencies.map((freq) => (
                      <option key={freq.value} value={freq.value}>
                        {freq.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Monthly Contribution */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Plus className="w-4 h-4 mr-2" />
                    Monthly Contribution (Optional)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={monthlyContribution}
                      onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {results && (
              <>
                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-green-800">Final Amount</h3>
                      <div className="p-2 bg-green-200 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-700" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-green-900 mb-2">
                      {formatCurrency(results.finalAmount)}
                    </div>
                    <p className="text-sm text-green-700">
                      Total value after {time} years
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-800">Interest Earned</h3>
                      <div className="p-2 bg-blue-200 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-700" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <p className="text-sm text-blue-700">
                      Profit from compound interest
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 rounded-2xl p-6 border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-purple-800">Total Contributions</h3>
                      <div className="p-2 bg-purple-200 rounded-lg">
                        <Plus className="w-5 h-5 text-purple-700" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-purple-900 mb-2">
                      {formatCurrency(results.totalContributions)}
                    </div>
                    <p className="text-sm text-purple-700">
                      Your total investment
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-orange-800">Effective Rate</h3>
                      <div className="p-2 bg-orange-200 rounded-lg">
                        <Percent className="w-5 h-5 text-orange-700" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-orange-900 mb-2">
                      {results.effectiveRate}%
                    </div>
                    <p className="text-sm text-orange-700">
                      Annual return rate
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Growth Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="year" 
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          label={{ value: 'Years', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tick={{ fontSize: 12 }}
                          tickFormatter={(value) => formatCurrency(value)}
                          label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip 
                          formatter={(value: number, name: string) => [
                            formatCurrency(value), 
                            name === 'amount' ? 'Total Amount' : 
                            name === 'principal' ? 'Principal' : 'Interest Earned'
                          ]}
                          labelFormatter={(year) => `Year ${year}`}
                          contentStyle={{
                            backgroundColor: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="principal" 
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                          dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                          name="principal"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#059669" 
                          strokeWidth={3}
                          dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                          name="amount"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-purple-500 rounded mr-2"></div>
                      <span className="text-gray-600">Principal</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-1 bg-green-600 rounded mr-2"></div>
                      <span className="text-gray-600">Total Amount</span>
                    </div>
                  </div>
                </div>

                {/* Breakdown Table */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Year-by-Year Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Principal</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Interest</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.slice(-5).map((row, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 font-medium text-gray-900">{row.year}</td>
                            <td className="py-3 px-4 text-right text-purple-600 font-medium">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="py-3 px-4 text-right text-blue-600 font-medium">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="py-3 px-4 text-right text-green-600 font-bold">
                              {formatCurrency(row.amount)}
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

        {/* Educational Content */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Compound Interest</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-600">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What is Compound Interest?</h3>
              <p className="mb-4">
                Compound interest is interest calculated on both the initial principal and the accumulated 
                interest from previous periods. This creates a snowball effect where your money grows 
                exponentially over time.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">The Power of Time</h3>
              <p>
                The longer you invest, the more powerful compounding becomes. Even small amounts invested 
                early can grow to substantial sums over decades due to the exponential nature of compound growth.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Compounding Frequency</h3>
              <p className="mb-4">
                How often interest is calculated and added to your principal affects your returns. 
                More frequent compounding (daily vs. annually) results in slightly higher returns over time.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Regular Contributions</h3>
              <p>
                Adding money regularly (like monthly contributions) dramatically increases your final 
                amount and demonstrates the power of consistent investing over time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;