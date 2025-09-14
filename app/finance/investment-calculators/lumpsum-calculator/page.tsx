'use client';

import React, { useState, useEffect } from 'react';
import { DollarSign, Calculator, Calendar, Percent, TrendingUp, PieChart, BarChart3, CheckCircle, XCircle, Info, AlertCircle, Target, Clock, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie, AreaChart, Area } from 'recharts';

interface LumpsumResult {
  maturityAmount: number;
  totalReturns: number;
  investedAmount: number;
  yearlyBreakdown: Array<{
    year: number;
    amount: number;
    returns: number;
    totalReturns: number;
  }>;
}

const LumpsumCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [results, setResults] = useState<LumpsumResult | null>(null);
  const [returnComparison, setReturnComparison] = useState<any[]>([]);
  const [periodComparison, setPeriodComparison] = useState<any[]>([]);

  // Ad Component Placeholder
  const AdBanner = ({ size, className }: { size: string; className?: string }) => (
    <div className={`bg-gradient-to-r from-green-100 to-blue-100 border-2 border-dashed border-green-300 rounded-lg flex items-center justify-center ${className}`}>
      <div className="text-center p-4">
        <div className="text-green-600 mb-2">
          <BarChart3 className="w-8 h-8 mx-auto" />
        </div>
        <p className="text-sm text-green-700 font-medium">Advertisement</p>
        <p className="text-xs text-green-600">{size}</p>
      </div>
    </div>
  );

  const calculateLumpsum = (principal: number, rate: number, years: number) => {
    const yearlyBreakdown = [];
    let currentAmount = principal;
    
    for (let year = 1; year <= years; year++) {
      const previousAmount = currentAmount;
      currentAmount = currentAmount * (1 + rate / 100);
      const yearlyReturns = currentAmount - previousAmount;
      const totalReturns = currentAmount - principal;
      
      yearlyBreakdown.push({
        year,
        amount: Math.round(currentAmount),
        returns: Math.round(yearlyReturns),
        totalReturns: Math.round(totalReturns)
      });
    }
    
    const maturityAmount = Math.round(currentAmount);
    const totalReturns = Math.round(currentAmount - principal);
    
    return {
      maturityAmount,
      totalReturns,
      investedAmount: principal,
      yearlyBreakdown
    };
  };

  const generateReturnComparison = () => {
    const returns = [8, 10, 12, 15, 18];
    const comparison = returns.map(rate => {
      const result = calculateLumpsum(investmentAmount, rate, timePeriod);
      return {
        rate: `${rate}%`,
        maturity: result.maturityAmount,
        returns: result.totalReturns,
        multiplier: Math.round((result.maturityAmount / investmentAmount) * 10) / 10
      };
    });
    setReturnComparison(comparison);
  };

  const generatePeriodComparison = () => {
    const periods = [5, 10, 15, 20, 25];
    const comparison = periods.map(years => {
      const result = calculateLumpsum(investmentAmount, expectedReturn, years);
      return {
        period: `${years}Y`,
        years,
        maturity: result.maturityAmount,
        returns: result.totalReturns,
        multiplier: Math.round((result.maturityAmount / investmentAmount) * 10) / 10
      };
    });
    setPeriodComparison(comparison);
  };

  useEffect(() => {
    const result = calculateLumpsum(investmentAmount, expectedReturn, timePeriod);
    setResults(result);
    generateReturnComparison();
    generatePeriodComparison();
  }, [investmentAmount, expectedReturn, timePeriod]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const pieData = results ? [
    { name: 'Invested Amount', value: results.investedAmount, color: '#3b82f6' },
    { name: 'Returns Generated', value: results.totalReturns, color: '#10b981' }
  ] : [];

  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <DollarSign className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
              Lumpsum Investment Calculator
            </h1>
            <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
              Calculate returns on your one-time mutual fund investment. See how your lumpsum investment grows over time 
              and make informed investment decisions with detailed analysis.
            </p>
            <div className="flex items-center justify-center mt-8 space-x-8 text-green-100">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                <span>Instant Results</span>
              </div>
              <div className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                <span>Accurate Projections</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                <span>Growth Analysis</span>
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
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-xl mr-4">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Calculate Returns</h2>
                  <p className="text-gray-500 text-sm">Enter investment details</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Investment Amount */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <DollarSign className="w-4 h-4 mr-2 text-emerald-600" />
                    Investment Amount
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="100000"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[50000, 100000, 500000, 1000000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setInvestmentAmount(amount)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        ₹{amount >= 100000 ? `${amount/100000}L` : `${amount/1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Expected Annual Return */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                    Expected Annual Return (%)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      step="0.1"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full pl-4 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="12"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[8, 10, 12, 15, 18].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setExpectedReturn(rate)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-600">
                    Equity: 10-15% | Debt: 6-9% | Hybrid: 8-12%
                  </div>
                </div>

                {/* Investment Period */}
                <div>
                  <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    Investment Period (Years)
                  </label>
                  <div className="relative group">
                    <input
                      type="number"
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(Number(e.target.value))}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg font-semibold"
                      placeholder="10"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {[5, 10, 15, 20, 25].map((years) => (
                      <button
                        key={years}
                        onClick={() => setTimePeriod(years)}
                        className="px-3 py-1 text-xs bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        {years}Y
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                {results && (
                  <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl p-6 mt-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Growth:</span>
                        <span className="font-bold text-emerald-600">
                          {formatCurrency(results.totalReturns / (timePeriod * 12))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Money Multiplier:</span>
                        <span className="font-bold text-blue-600">
                          {Math.round((results.maturityAmount / results.investedAmount) * 10) / 10}x
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">CAGR:</span>
                        <span className="font-bold text-purple-600">{expectedReturn}%</span>
                      </div>
                    </div>
                  </div>
                )}
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
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Maturity Amount</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Target className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {formatCurrency(results.maturityAmount)}
                    </div>
                    <p className="text-emerald-100 text-sm">
                      After {timePeriod} years
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Total Returns</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {formatCurrency(results.totalReturns)}
                    </div>
                    <p className="text-blue-100 text-sm">
                      Profit generated
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold opacity-90">Money Multiplier</h3>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Zap className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="text-4xl font-black mb-2">
                      {Math.round((results.maturityAmount / results.investedAmount) * 10) / 10}x
                    </div>
                    <p className="text-purple-100 text-sm">
                      Investment multiplied
                    </p>
                  </div>
                </div>

                {/* Charts Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Growth Chart */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="w-6 h-6 mr-3 text-emerald-600" />
                      Investment Growth
                    </h3>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={results.yearlyBreakdown}>
                          <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="year" 
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            stroke="#6b7280"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `₹${value/100000}L`}
                          />
                          <Tooltip 
                            formatter={(value: number) => [formatCurrency(value), 'Amount']}
                            labelFormatter={(year) => `Year ${year}`}
                            contentStyle={{
                              backgroundColor: '#f9fafb',
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px'
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="amount" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            fill="url(#colorAmount)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Investment Breakdown */}
                  <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <PieChart className="w-6 h-6 mr-3 text-blue-600" />
                      Investment Breakdown
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
                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div className="bg-blue-50 rounded-xl p-4">
                        <div className="text-sm text-blue-600 font-medium">Initial Investment</div>
                        <div className="text-lg font-bold text-blue-900">{formatCurrency(results.investedAmount)}</div>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4">
                        <div className="text-sm text-green-600 font-medium">Returns Generated</div>
                        <div className="text-lg font-bold text-green-900">{formatCurrency(results.totalReturns)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Return Rate Comparison */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-3 text-purple-600" />
                    Returns at Different Rates
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-6 font-bold text-gray-700">Return Rate</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Maturity Amount</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Total Returns</th>
                          <th className="text-right py-4 px-6 font-bold text-gray-700">Money Multiplier</th>
                          <th className="text-center py-4 px-6 font-bold text-gray-700">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {returnComparison.map((row, index) => (
                          <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${row.rate === `${expectedReturn}%` ? 'bg-emerald-50 border-emerald-200' : ''}`}>
                            <td className="py-4 px-6 font-bold text-gray-900">{row.rate}</td>
                            <td className="py-4 px-6 text-right font-bold text-emerald-600">
                              {formatCurrency(row.maturity)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-blue-600">
                              {formatCurrency(row.returns)}
                            </td>
                            <td className="py-4 px-6 text-right font-bold text-purple-600">
                              {row.multiplier}x
                            </td>
                            <td className="py-4 px-6 text-center">
                              {parseFloat(row.rate) >= 12 ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Excellent
                                </div>
                              ) : parseFloat(row.rate) >= 10 ? (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                                  <Info className="w-4 h-4 mr-1" />
                                  Good
                                </div>
                              ) : (
                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                                  <AlertCircle className="w-4 h-4 mr-1" />
                                  Average
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Time Period Comparison */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-6 h-6 mr-3 text-indigo-600" />
                    Impact of Investment Duration
                  </h3>
                  <div className="h-80 mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={periodComparison}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="period" stroke="#6b7280" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} tickFormatter={(value) => `₹${value/100000}L`} />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          contentStyle={{
                            backgroundColor: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px'
                          }}
                        />
                        <Bar dataKey="maturity" fill="#6366f1" name="Maturity Amount" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="returns" fill="#10b981" name="Returns" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid md:grid-cols-5 gap-4">
                    {periodComparison.map((period, index) => (
                      <div key={index} className={`text-center p-4 rounded-xl border-2 transition-all ${period.years === timePeriod ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="text-lg font-bold text-gray-900">{period.period}</div>
                        <div className="text-sm text-indigo-600 font-medium">{period.multiplier}x Growth</div>
                        <div className="text-xs text-gray-600">{formatCurrency(period.maturity)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Year-wise Breakdown */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-6 h-6 mr-3 text-teal-600" />
                    Year-wise Growth Breakdown
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-4 px-4 font-bold text-gray-700">Year</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Opening Balance</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Annual Returns</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Closing Balance</th>
                          <th className="text-right py-4 px-4 font-bold text-gray-700">Total Returns</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyBreakdown.slice(0, 10).map((row, index) => {
                          const openingBalance = index === 0 ? investmentAmount : results.yearlyBreakdown[index - 1].amount;
                          return (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              <td className="py-4 px-4 font-bold text-gray-900">{row.year}</td>
                              <td className="py-4 px-4 text-right font-medium text-gray-700">
                                {formatCurrency(openingBalance)}
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-emerald-600">
                                {formatCurrency(row.returns)}
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-blue-600">
                                {formatCurrency(row.amount)}
                              </td>
                              <td className="py-4 px-4 text-right font-bold text-purple-600">
                                {formatCurrency(row.totalReturns)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {results.yearlyBreakdown.length > 10 && (
                    <div className="mt-4 text-center text-gray-500 text-sm">
                      Showing first 10 years. Total period: {timePeriod} years
                    </div>
                  )}
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
              Complete Guide to Lumpsum Investment
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Everything you need to know about lumpsum investments, how they work, and strategies for maximizing returns
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* What is Lumpsum Investment */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4 flex items-center">
                  <DollarSign className="w-6 h-6 mr-3" />
                  What is Lumpsum Investment?
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  A lumpsum investment involves investing a large amount of money in mutual funds or other investment 
                  vehicles at once, rather than spreading it over multiple installments. This strategy allows your entire 
                  capital to start working immediately and benefit from compound growth.
                </p>
                <div className="bg-white rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Characteristics:</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />One-time large investment</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Immediate market exposure</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Full compound growth benefit</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" />Higher potential returns</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3" />
                  Advantages of Lumpsum Investment
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-lg p-2 mr-4 mt-1">
                      <Zap className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Maximum Compound Growth</h4>
                      <p className="text-gray-600 text-sm">Your entire investment starts earning returns immediately, maximizing the power of compounding</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-lg p-2 mr-4 mt-1">
                      <Target className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Market Timing Benefits</h4>
                      <p className="text-gray-600 text-sm">If invested at the right time, can capture significant market upswings</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-lg p-2 mr-4 mt-1">
                      <Calendar className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Lower Transaction Costs</h4>
                      <p className="text-gray-600 text-sm">Single transaction reduces overall fees compared to multiple SIP installments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* When to Choose Lumpsum */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-purple-900 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-3" />
                  When to Choose Lumpsum?
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Market Downturns
                    </h4>
                    <p className="text-gray-600 text-sm">
                      When markets are at low levels, lumpsum investment can capture the entire recovery
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Windfall Money
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Bonus, inheritance, or maturity proceeds can be invested as lumpsum for immediate growth
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Long-term Goals
                    </h4>
                    <p className="text-gray-600 text-sm">
                      For goals 10+ years away, lumpsum can potentially generate higher absolute returns
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-100">
                <h3 className="text-2xl font-bold text-orange-900 mb-4 flex items-center">
                  <AlertCircle className="w-6 h-6 mr-3" />
                  Risks & Considerations
                </h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Market Timing Risk
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Investing at market peaks can lead to immediate losses and longer recovery periods
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Higher Volatility Impact
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Entire investment is subject to market volatility without averaging benefits
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                      <XCircle className="w-4 h-4 mr-2 text-red-500" />
                      Emotional Stress
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Large fluctuations in portfolio value can cause emotional decision-making
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Strategies */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Smart Lumpsum Investment Strategies</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-100">
                <div className="bg-emerald-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-emerald-900 mb-3">Staggered Investment</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Instead of investing the entire amount at once, divide it into 3-4 parts and invest over 6-12 months 
                  to reduce timing risk while maintaining most lumpsum benefits.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-blue-900 mb-3">Asset Allocation</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Diversify lumpsum across different asset classes - equity, debt, and international funds 
                  to balance risk and returns based on your risk tolerance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-purple-900 mb-3">Value Averaging</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Combine lumpsum with SIP. Invest a major portion as lumpsum and continue smaller SIPs 
                  to benefit from both immediate exposure and rupee cost averaging.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-teal-900 mb-3">Market Valuation Based</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Invest lumpsum when market valuations (P/E ratios) are below historical averages. 
                  Use market indicators to time your investment for better returns.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-orange-900 mb-3">Rebalancing Strategy</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  After lumpsum investment, review and rebalance your portfolio annually. 
                  Book profits from outperforming assets and invest in underperforming ones.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-100">
                <div className="bg-indigo-500 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-indigo-900 mb-3">Goal-based Investing</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Align lumpsum investments with specific financial goals. Use equity funds for long-term goals 
                  and balanced funds for medium-term objectives with appropriate risk levels.
                </p>
              </div>
            </div>
          </div>

          {/* Lumpsum vs SIP Comparison */}
          <div className="mt-12 bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Lumpsum vs SIP: When to Choose What?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Choose Lumpsum When
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">You have a large corpus available (windfall, bonus, maturity)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">Market is at low levels or in correction phase</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">Investment horizon is very long (15+ years)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-emerald-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-sm">You can handle short-term volatility emotionally</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Choose SIP When
                </h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm">You have regular monthly income but no large corpus</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Market timing is uncertain or markets are at high levels</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm">You want to develop a disciplined investment habit</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                      <CheckCircle className="w-3 h-3 text-blue-600" />
                    </div>
                    <span className="text-sm">You prefer lower risk through rupee cost averaging</span>
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
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: What is the minimum amount for lumpsum investment?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Most mutual funds have a minimum lumpsum investment of ₹500-₹1,000. However, for meaningful wealth creation, 
                  consider investing at least ₹25,000-₹50,000 as lumpsum to see significant impact over time.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Can I withdraw my lumpsum investment anytime?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Yes, open-ended mutual funds allow withdrawal anytime. However, equity funds may have exit loads if redeemed 
                  within 1 year. ELSS funds have a 3-year lock-in period. Consider your liquidity needs before investing.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: How are lumpsum investments taxed?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: For equity funds: No tax if held for more than 1 year. Gains above ₹1 lakh are taxed at 10%. 
                  For debt funds: Gains are taxed as per your income tax slab if held less than 3 years, otherwise at 20% with indexation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Should I invest lumpsum in one fund or multiple funds?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Diversification is recommended. Consider investing across 3-5 funds covering large-cap, mid-cap, 
                  international equity, and debt funds based on your risk appetite and investment goals for better risk management.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: What returns can I expect from lumpsum investment?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: Historical data shows equity funds have generated 10-15% annual returns over long periods. 
                  However, past performance doesn't guarantee future returns. Expect volatility in short term but smoother returns over 7+ years.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Q: Can I switch from lumpsum to SIP or vice versa?</h4>
                <p className="text-gray-700 leading-relaxed">
                  A: You cannot convert existing lumpsum to SIP, but you can start a new SIP in the same fund. 
                  Similarly, you can make additional lumpsum investments in a fund where you have an existing SIP running.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Investment Journey Today</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Use our lumpsum calculator to plan your investments wisely. Calculate potential returns and make informed decisions for your financial future.
          </p>
          <div className="flex items-center justify-center space-x-8 text-emerald-100">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Free Calculator</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Accurate Projections</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Expert Guidance</span>
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

export default LumpsumCalculator;