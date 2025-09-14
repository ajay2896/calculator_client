"use client";


import React, { useState, useEffect } from 'react';
import { Target, Calculator, TrendingUp, DollarSign, Calendar, Percent, Info, Shield, ToggleLeft, ToggleRight } from 'lucide-react';

// Define a type for yearly breakdown
type YearlyBreakdown = {
  year: number;
  age: number;
  balance: number;
  afterTaxBalance: number;
  contribution: number;
  deductibleAmount: number;
  totalContributions: number;
};

// Define results type
type Results = {
  traditionalBalance: number;
  rothBalance: number;
  traditionalAfterTax: number;
  rothAfterTax: number;
  totalContributions: number;
  totalGrowth: number;
  yearlyBreakdown: YearlyBreakdown[];
};


export default function IRACalculator() {
  const [iraType, setIraType] = useState<"traditional" | "roth">("traditional");
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [annualContribution, setAnnualContribution] = useState<number>(6000);
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [currentTaxRate, setCurrentTaxRate] = useState<number>(22);
  const [retirementTaxRate, setRetirementTaxRate] = useState<number>(15);
  const [annualIncome, setAnnualIncome] = useState<number>(75000);

  const [results, setResults] = useState<Results>({
    traditionalBalance: 0,
    rothBalance: 0,
    traditionalAfterTax: 0,
    rothAfterTax: 0,
    totalContributions: 0,
    totalGrowth: 0,
    yearlyBreakdown: [],
  });

  useEffect(() => {
    calculateReturns();
  }, [
    iraType,
    currentAge,
    retirementAge,
    annualContribution,
    currentBalance,
    annualReturn,
    currentTaxRate,
    retirementTaxRate,
    annualIncome,
  ]);

  const calculateReturns = () => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) return;

    const contributionLimit2024 = 7000; // 2024 limit
    const catchUpLimit = 1000; // Additional for 50+

    let balance = currentBalance;
    let totalContributions = 0;
    let yearlyBreakdown: YearlyBreakdown[] = [];

    // Calculate income phase-out limits for Traditional IRA deduction and Roth IRA eligibility
    const traditionalPhaseOut = { start: 73000, end: 83000 }; // Single filer 2024
    const rothPhaseOut = { start: 138000, end: 153000 }; // Single filer 2024

    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = currentAge + year - 1;

      // Determine contribution limits
      let maxContribution =
        age >= 50 ? contributionLimit2024 + catchUpLimit : contributionLimit2024;
      let yearlyContribution = Math.min(annualContribution, maxContribution);

      // For Traditional IRA, check if deduction is available
      let deductibleAmount = yearlyContribution;
      if (iraType === "traditional" && annualIncome > traditionalPhaseOut.start) {
        if (annualIncome >= traditionalPhaseOut.end) {
          deductibleAmount = 0; // No deduction
        } else {
          // Partial deduction
          const phaseOutRatio =
            (traditionalPhaseOut.end - annualIncome) /
            (traditionalPhaseOut.end - traditionalPhaseOut.start);
          deductibleAmount = yearlyContribution * phaseOutRatio;
        }
      }

      // For Roth IRA, check income eligibility
      if (iraType === "roth" && annualIncome > rothPhaseOut.start) {
        if (annualIncome >= rothPhaseOut.end) {
          yearlyContribution = 0; // Not eligible
        } else {
          // Reduced contribution
          const phaseOutRatio =
            (rothPhaseOut.end - annualIncome) /
            (rothPhaseOut.end - rothPhaseOut.start);
          yearlyContribution = yearlyContribution * phaseOutRatio;
        }
      }

      balance += yearlyContribution;
      totalContributions += yearlyContribution;

      // Apply investment growth
      balance = balance * (1 + annualReturn / 100);

      // Store breakdown for key years
      if (year % 5 === 0 || year === yearsToRetirement || year <= 5) {
        const afterTaxBalance =
          iraType === "traditional"
            ? balance * (1 - retirementTaxRate / 100)
            : balance; // Roth is already after-tax

        yearlyBreakdown.push({
          year: currentAge + year,
          age: currentAge + year,
          balance: balance,
          afterTaxBalance,
          contribution: yearlyContribution,
          deductibleAmount: iraType === "traditional" ? deductibleAmount : 0,
          totalContributions,
        });
      }
    }

    // Calculate after-tax values
    const traditionalAfterTax =
      iraType === "traditional"
        ? balance * (1 - retirementTaxRate / 100)
        : balance;

    const rothAfterTax = balance; // Roth withdrawals are tax-free

    const totalGrowth = balance - totalContributions - currentBalance;

    setResults({
      traditionalBalance: iraType === "traditional" ? balance : 0,
      rothBalance: iraType === "roth" ? balance : 0,
      traditionalAfterTax,
      rothAfterTax,
      totalContributions,
      totalGrowth,
      yearlyBreakdown,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const currentTaxSavings =
    iraType === "traditional" ? annualContribution * (currentTaxRate / 100) : 0;

  const monthlyRetirementIncome =
    ((iraType === "traditional"
      ? results.traditionalAfterTax
      : results.rothAfterTax) *
      0.04) /
    12;



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Target className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">IRA Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare Traditional and Roth IRA options for your retirement planning
          </p>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Account Type & Basic Info</h2>
              </div>

              {/* IRA Type Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  IRA Type
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIraType('traditional')}
                    className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${iraType === 'traditional'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {iraType === 'traditional' ? <ToggleRight className="h-5 w-5 mr-2" /> : <ToggleLeft className="h-5 w-5 mr-2" />}
                    Traditional IRA
                  </button>
                  <button
                    onClick={() => setIraType('roth')}
                    className={`flex items-center px-4 py-3 rounded-lg border-2 transition-all ${iraType === 'roth'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {iraType === 'roth' ? <ToggleRight className="h-5 w-5 mr-2" /> : <ToggleLeft className="h-5 w-5 mr-2" />}
                    Roth IRA
                  </button>
                </div>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {iraType === 'traditional'
                      ? 'Tax-deductible contributions, taxed on withdrawal'
                      : 'After-tax contributions, tax-free withdrawals in retirement'}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Age */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="18"
                    max="80"
                  />
                </div>

                {/* Retirement Age */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="59"
                    max="80"
                  />
                  <p className="text-sm text-gray-500 mt-1">Minimum 59½ for penalty-free withdrawals</p>
                </div>

                {/* Annual Income */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={annualIncome}
                      onChange={(e) => setAnnualIncome(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      step="1000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Affects eligibility and deduction limits</p>
                </div>

                {/* Current IRA Balance */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Current IRA Balance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={currentBalance}
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      step="1000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Contribution Settings</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Annual Contribution */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Annual Contribution
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={annualContribution}
                      onChange={(e) => setAnnualContribution(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      max="8000"
                      step="500"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[3000, 5000, 7000, 8000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setAnnualContribution(amount)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${annualContribution === amount
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    2024 Limit: $7,000 (+ $1,000 catch-up if 50+)
                    {currentAge >= 50 && ' - You qualify for catch-up contributions!'}
                  </p>
                </div>

                {/* Current Tax Rate */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Current Tax Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={currentTaxRate}
                      onChange={(e) => setCurrentTaxRate(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      max="50"
                      step="1"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[12, 22, 24, 32].map(rate => (
                      <button
                        key={rate}
                        onClick={() => setCurrentTaxRate(rate)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${currentTaxRate === rate
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Retirement Tax Rate */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Expected Retirement Tax Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={retirementTaxRate}
                      onChange={(e) => setRetirementTaxRate(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      max="50"
                      step="1"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[10, 15, 20, 25].map(rate => (
                      <button
                        key={rate}
                        onClick={() => setRetirementTaxRate(rate)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${retirementTaxRate === rate
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                      >
                        {rate}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Investment Assumptions</h2>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Percent className="h-4 w-4 mr-1" />
                  Expected Annual Return
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="0"
                    max="15"
                    step="0.1"
                  />
                  <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                </div>
                <input
                  type="range"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600"
                  min="3"
                  max="12"
                  step="0.1"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Conservative (3%)</span>
                  <span>Aggressive (12%)</span>
                </div>

                {/* Info Box */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Tax Advantage:</p>
                      <p>
                        {iraType === 'traditional'
                          ? `You'll save ${currentTaxSavings.toFixed(0)} in taxes this year with your contribution.`
                          : 'Your contributions are made with after-tax dollars, but withdrawals will be tax-free.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <p className="text-green-100 text-sm font-medium">
                  {iraType === 'traditional' ? 'After-Tax' : 'Tax-Free'} Balance at Retirement
                </p>
                <p className="text-3xl font-bold mb-2">
                  {formatCurrency(iraType === 'traditional' ? results.traditionalAfterTax : results.rothAfterTax)}
                </p>
                <p className="text-green-100 text-sm">
                  Monthly Income: {formatCurrency(monthlyRetirementIncome)} (4% rule)
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Pre-Tax Account Value</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(iraType === 'traditional' ? results.traditionalBalance : results.rothBalance)}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Total Contributions</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(results.totalContributions)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Investment Growth</p>
                  <p className="text-2xl font-bold text-purple-600">{formatCurrency(results.totalGrowth)}</p>
                </div>
              </div>
            </div>

            {/* Tax Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Tax Benefits</h3>
              <div className="space-y-3">
                {iraType === 'traditional' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Tax Savings:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(currentTaxSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes on Withdrawal:</span>
                      <span className="font-semibold text-red-600">
                        {formatCurrency(results.traditionalBalance * (retirementTaxRate / 100))}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax-Free Growth:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(results.totalGrowth)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes on Withdrawal:</span>
                      <span className="font-semibold text-green-600">$0</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Years to Retirement */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm font-medium">Years Until Retirement</p>
                <p className="text-4xl font-bold text-blue-600">{retirementAge - currentAge}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {currentAge >= 50
                    ? 'Eligible for catch-up contributions ($1,000 extra)'
                    : `Catch-up contributions at age 50 (${50 - currentAge} years)`
                  }
                </p>
              </div>
            </div>

            {/* Eligibility Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Eligibility Status</h3>
              <div className="space-y-2">
                {iraType === 'traditional' ? (
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">
                      {annualIncome <= 73000
                        ? 'Full deduction available'
                        : annualIncome <= 83000
                          ? 'Partial deduction available'
                          : 'No tax deduction (consider Roth)'
                      }
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">
                      {annualIncome <= 138000
                        ? 'Full contribution allowed'
                        : annualIncome <= 153000
                          ? 'Reduced contribution limit'
                          : 'Not eligible (consider Traditional)'
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projection Table */}
        {results.yearlyBreakdown.length > 0 && (
          <div className="mt-12 max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Retirement Projection Timeline</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Age</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Annual Contribution</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Account Balance</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">After-Tax Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.yearlyBreakdown.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium">{item.age}</td>
                        <td className="py-3 px-4 text-right text-blue-600">{formatCurrency(item.contribution)}</td>
                        <td className="py-3 px-4 text-right font-bold">{formatCurrency(item.balance)}</td>
                        <td className="py-3 px-4 text-right font-bold text-green-600">{formatCurrency(item.afterTaxBalance)}</td>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Traditional vs Roth IRA Comparison</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Traditional IRA</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Tax-deductible contributions
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Tax-deferred growth
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Taxed on withdrawal
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Required minimum distributions at 73
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Roth IRA</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    After-tax contributions
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Tax-free growth and withdrawals
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Income limits apply
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    No required minimum distributions
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">2024 Contribution Limits:</p>
                  <p>
                    • Under 50: $7,000 annual limit<br />
                    • 50 and older: $8,000 annual limit (includes $1,000 catch-up)<br />
                    • Income limits may reduce or eliminate eligibility
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