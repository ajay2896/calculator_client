'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Calculator, DollarSign, Calendar, Percent, Info, PieChart, ArrowUpRight, ToggleLeft, ToggleRight } from 'lucide-react';

// Define a type for yearly breakdown
type YearlyBreakdown = {
  year: number;
  totalInvested: number;
  currentValue: number;
  yearlyGains: number;
};

// Define a type for results
type Results = {
  totalInvestment: number;
  maturityAmount: number;
  totalReturns: number;
  yearlyBreakdown: YearlyBreakdown[];
};

export default function MutualFundCalculator() {
  const [investmentType, setInvestmentType] = useState<'SIP' | 'Lump Sum'>('SIP');
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [lumpSumAmount, setLumpSumAmount] = useState(100000);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [stepUpPercent, setStepUpPercent] = useState(10);
  const [enableStepUp, setEnableStepUp] = useState(false);
  const [fundType, setFundType] = useState<'equity' | 'debt' | 'hybrid'>('equity');

  const [results, setResults] = useState<Results>({
    totalInvestment: 0,
    maturityAmount: 0,
    totalReturns: 0,
    yearlyBreakdown: []
  });

  useEffect(() => {
    calculateReturns();
  }, [investmentType, monthlyAmount, lumpSumAmount, investmentPeriod, expectedReturn, stepUpPercent, enableStepUp, fundType]);

  const calculateReturns = () => {
    if (investmentType === 'SIP') {
      calculateSIPReturns();
    } else {
      calculateLumpSumReturns();
    }
  };

  const calculateSIPReturns = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const totalMonths = investmentPeriod * 12;
    let totalInvestment = 0;
    let maturityAmount = 0;
    let yearlyBreakdown: YearlyBreakdown[] = [];
    let currentMonthlyAmount = monthlyAmount;

    for (let month = 1; month <= totalMonths; month++) {
      if (enableStepUp && month > 1 && month % 12 === 1) {
        currentMonthlyAmount = currentMonthlyAmount * (1 + stepUpPercent / 100);
      }

      totalInvestment += currentMonthlyAmount;
      const monthsRemaining = totalMonths - month + 1;
      const futureValue = currentMonthlyAmount * Math.pow(1 + monthlyRate, monthsRemaining);
      maturityAmount += futureValue;

      if (month % 12 === 0) {
        const year = month / 12;
        yearlyBreakdown.push({
          year,
          totalInvested: totalInvestment,
          currentValue: maturityAmount,
          yearlyGains: maturityAmount - totalInvestment
        });
      }
    }

    const totalReturns = maturityAmount - totalInvestment;

    setResults({
      totalInvestment,
      maturityAmount,
      totalReturns,
      yearlyBreakdown
    });
  };

  const calculateLumpSumReturns = () => {
    const maturityAmount = lumpSumAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    const totalReturns = maturityAmount - lumpSumAmount;

    let yearlyBreakdown: YearlyBreakdown[] = [];
    for (let year = 1; year <= investmentPeriod; year++) {
      const currentValue = lumpSumAmount * Math.pow(1 + expectedReturn / 100, year);
      yearlyBreakdown.push({
        year,
        totalInvested: lumpSumAmount,
        currentValue,
        yearlyGains: currentValue - lumpSumAmount
      });
    }

    setResults({
      totalInvestment: lumpSumAmount,
      maturityAmount,
      totalReturns,
      yearlyBreakdown
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFundTypeInfo = (type: 'equity' | 'debt' | 'hybrid') => {
    const info = {
      equity: { name: 'Equity Fund', risk: 'High', expectedReturn: '10-15%', color: 'text-red-600' },
      debt: { name: 'Debt Fund', risk: 'Low', expectedReturn: '6-9%', color: 'text-green-600' },
      hybrid: { name: 'Hybrid Fund', risk: 'Medium', expectedReturn: '8-12%', color: 'text-yellow-600' }
    };
    return info[type];
  };

  const currentFundInfo = getFundTypeInfo(fundType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Mutual Fund Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate returns for SIP and lump sum mutual fund investments
          </p>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Investment Type & Fund Selection</h2>
              </div>

              {/* Investment Type Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Investment Type
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setInvestmentType('SIP')}
                    className={`flex items-center px-6 py-3 rounded-lg border-2 transition-all ${investmentType === 'SIP'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {investmentType === 'SIP' ? <ToggleRight className="h-5 w-5 mr-2" /> : <ToggleLeft className="h-5 w-5 mr-2" />}
                    SIP (Systematic Investment Plan)
                  </button>
                  <button
                    onClick={() => setInvestmentType('Lump Sum')}
                    className={`flex items-center px-6 py-3 rounded-lg border-2 transition-all ${investmentType === 'Lump Sum'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {investmentType === 'Lump Sum' ? <ToggleRight className="h-5 w-5 mr-2" /> : <ToggleLeft className="h-5 w-5 mr-2" />}
                    Lump Sum
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {investmentType === 'SIP'
                    ? 'Regular monthly investments with rupee cost averaging benefits'
                    : 'One-time investment with compound growth over time'
                  }
                </p>
              </div>

              {/* Fund Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Fund Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['equity', 'debt', 'hybrid'] as const).map(type => {
                    const info = getFundTypeInfo(type);
                    return (
                      <button
                        key={type}
                        onClick={() => setFundType(type)}
                        className={`p-4 rounded-lg border-2 transition-all ${fundType === type
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                      >
                        <div className="text-center">
                          <p className={`font-semibold ${fundType === type ? 'text-blue-700' : 'text-gray-700'}`}>
                            {info.name}
                          </p>
                          <p className={`text-xs ${info.color}`}>{info.risk} Risk</p>
                          <p className="text-xs text-gray-500">{info.expectedReturn}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Investment Amount */}
                {investmentType === 'SIP' ? (
                  <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Monthly SIP Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                        min="100"
                        step="500"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[1000, 2500, 5000, 10000].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setMonthlyAmount(amount)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${monthlyAmount === amount
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="md:col-span-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <DollarSign className="h-4 w-4 mr-1" />
                      Lump Sum Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        value={lumpSumAmount}
                        onChange={(e) => setLumpSumAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                        min="1000"
                        step="10000"
                      />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {[50000, 100000, 250000, 500000].map(amount => (
                        <button
                          key={amount}
                          onClick={() => setLumpSumAmount(amount)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${lumpSumAmount === amount
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          ${amount / 1000}K
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Investment Period */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="1"
                    max="30"
                  />
                  <input
                    type="range"
                    value={investmentPeriod}
                    onChange={(e) => setInvestmentPeriod(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                    min="1"
                    max="30"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>

                {/* Expected Return */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Expected Annual Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="1"
                      max="25"
                      step="0.5"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <input
                    type="range"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                    min="5"
                    max="20"
                    step="0.5"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Typical range: {currentFundInfo.expectedReturn}
                  </p>
                </div>
              </div>

              {/* Step-up SIP (only for SIP) */}
              {investmentType === 'SIP' && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-700">
                      Enable Step-up SIP
                    </label>
                    <button
                      onClick={() => setEnableStepUp(!enableStepUp)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enableStepUp ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enableStepUp ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </div>

                  {enableStepUp && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Annual Step-up Percentage
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={stepUpPercent}
                          onChange={(e) => setStepUpPercent(Number(e.target.value))}
                          className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                          min="5"
                          max="25"
                          step="1"
                        />
                        <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Increase SIP amount by {stepUpPercent}% every year
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <p className="text-green-100 text-sm font-medium">Maturity Amount</p>
                <p className="text-3xl font-bold mb-1">{formatCurrency(results.maturityAmount)}</p>
                <div className="flex items-center justify-center text-green-100 text-sm">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {((results.maturityAmount / results.totalInvestment - 1) * 100).toFixed(1)}% Total Return
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Total Investment</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(results.totalInvestment)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Total Returns</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(results.totalReturns)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Wealth Gain</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {((results.totalReturns / results.totalInvestment) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Fund Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-800">Fund Details</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fund Type:</span>
                  <span className="font-semibold">{currentFundInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`font-semibold ${currentFundInfo.color}`}>{currentFundInfo.risk}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold">{currentFundInfo.expectedReturn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Duration:</span>
                  <span className="font-semibold">{investmentPeriod} years</span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Investment Mode:</span>
                  <span className="font-semibold">{investmentType}</span>
                </div>
                {investmentType === 'SIP' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Investment:</span>
                      <span className="font-semibold">{formatCurrency(monthlyAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Installments:</span>
                      <span className="font-semibold">{investmentPeriod * 12}</span>
                    </div>
                    {enableStepUp && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Step-up:</span>
                        <span className="font-semibold">{stepUpPercent}%</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lump Sum Amount:</span>
                    <span className="font-semibold">{formatCurrency(lumpSumAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-800 font-medium">CAGR:</span>
                  <span className="font-bold">{expectedReturn}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown Table */}
        {results.yearlyBreakdown.length > 0 && (
          <div className="mt-12 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Year-wise Investment Growth</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Invested</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Current Value</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Gains</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Return %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyBreakdown.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">Year {item.year}</td>
                        <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(item.totalInvested)}</td>
                        <td className="py-3 px-4 text-right font-bold">{formatCurrency(item.currentValue)}</td>
                        <td className="py-3 px-4 text-right text-green-600">{formatCurrency(item.yearlyGains)}</td>
                        <td className="py-3 px-4 text-right font-bold text-purple-600">
                          {((item.yearlyGains / item.totalInvested) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Mutual Funds</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">SIP Benefits</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Rupee cost averaging
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Disciplined investing
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Lower market timing risk
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Power of compounding
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Fund Types</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-red-600">Equity Funds:</span> High risk, high potential returns
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-green-600">Debt Funds:</span> Low risk, stable returns
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <div>
                      <span className="font-medium text-yellow-600">Hybrid Funds:</span> Balanced risk-return profile
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Investment Tip:</p>
                  <p>
                    Mutual funds are subject to market risks. Past performance doesn't guarantee future results.
                    Always diversify your portfolio and invest according to your risk tolerance and financial goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}