'use client';

import React, { useState, useEffect } from 'react';
import { TrendingDown, Calculator, TrendingUp, DollarSign, Calendar, Percent, Info, Target, Users, Clock, PiggyBank } from 'lucide-react';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState(5000);
  const [desiredIncomeRatio, setDesiredIncomeRatio] = useState(80);
  const [inflationRate, setInflationRate] = useState(6);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(8);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [calculationMode, setCalculationMode] = useState('expenses'); // expenses or target

  const [results, setResults] = useState({
    retirementCorpus: 0,
    monthlyExpensesAtRetirement: 0,
    requiredMonthlySIP: 0,
    totalInvestment: 0,
    corpusGrowth: 0,
    monthlyIncomeInRetirement: 0,
    corpusDepletionAge: 0
  });

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, lifeExpectancy, currentMonthlyExpenses, desiredIncomeRatio, inflationRate, preRetirementReturn, postRetirementReturn, currentSavings, calculationMode]);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const retirementDuration = lifeExpectancy - retirementAge;
    
    if (yearsToRetirement <= 0 || retirementDuration <= 0) return;

    // Calculate future monthly expenses at retirement
    const monthlyExpensesAtRetirement = currentMonthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const desiredMonthlyIncome = monthlyExpensesAtRetirement * (desiredIncomeRatio / 100);
    
    // Calculate required retirement corpus using annuity formula
    // Adjusting for inflation during retirement years
    const realReturnRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100)) - 1;
    const monthlyRealReturn = realReturnRate / 12;
    
    let retirementCorpus;
    if (monthlyRealReturn === 0) {
      // If real return is 0, corpus = monthly income * months
      retirementCorpus = desiredMonthlyIncome * retirementDuration * 12;
    } else {
      // Using annuity present value formula
      const annuityFactor = (1 - Math.pow(1 + monthlyRealReturn, -retirementDuration * 12)) / monthlyRealReturn;
      retirementCorpus = desiredMonthlyIncome * annuityFactor;
    }

    // Calculate how current savings will grow
    const currentSavingsAtRetirement = currentSavings * Math.pow(1 + preRetirementReturn / 100, yearsToRetirement);
    
    // Required additional corpus
    const additionalCorpusRequired = retirementCorpus - currentSavingsAtRetirement;
    
    // Calculate required monthly SIP
    let requiredMonthlySIP = 0;
    if (additionalCorpusRequired > 0 && yearsToRetirement > 0) {
      const monthlyReturn = preRetirementReturn / 12 / 100;
      const totalMonths = yearsToRetirement * 12;
      
      // SIP future value formula: FV = SIP * [((1+r)^n - 1) / r]
      if (monthlyReturn === 0) {
        requiredMonthlySIP = additionalCorpusRequired / totalMonths;
      } else {
        const annuityFactor = (Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn;
        requiredMonthlySIP = additionalCorpusRequired / annuityFactor;
      }
    }

    // Total investment calculation
    const totalInvestment = currentSavings + (requiredMonthlySIP * yearsToRetirement * 12);
    const corpusGrowth = retirementCorpus - totalInvestment;

    // Calculate monthly income from corpus in retirement
    const monthlyIncomeInRetirement = retirementCorpus * (postRetirementReturn / 100 / 12);

    // Estimate when corpus might be depleted (simplified calculation)
    let corpusDepletionAge = lifeExpectancy;
    if (desiredMonthlyIncome > monthlyIncomeInRetirement) {
      const monthlyDeficit = desiredMonthlyIncome - monthlyIncomeInRetirement;
      const monthsToDepletion = retirementCorpus / monthlyDeficit;
      corpusDepletionAge = retirementAge + (monthsToDepletion / 12);
      corpusDepletionAge = Math.min(corpusDepletionAge, lifeExpectancy);
    }

    setResults({
      retirementCorpus: Math.max(retirementCorpus, 0),
      monthlyExpensesAtRetirement,
      requiredMonthlySIP: Math.max(requiredMonthlySIP, 0),
      totalInvestment,
      corpusGrowth,
      monthlyIncomeInRetirement,
      corpusDepletionAge
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatLakhs = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(1)} L`;
    } else {
      return formatCurrency(amount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TrendingDown className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Retirement Calculator</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your retirement corpus and calculate monthly savings required for financial independence
          </p>
        </div>

        <div className="grid xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Age */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    Current Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="18"
                    max="65"
                  />
                </div>

                {/* Retirement Age */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 mr-1" />
                    Planned Retirement Age
                  </label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="45"
                    max="75"
                  />
                </div>

                {/* Life Expectancy */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    Life Expectancy
                  </label>
                  <input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min="65"
                    max="100"
                  />
                  <p className="text-sm text-gray-500 mt-1">Average life expectancy: 75-85 years</p>
                </div>

                {/* Current Savings */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <PiggyBank className="h-4 w-4 mr-1" />
                    Current Retirement Savings
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="0"
                      step="10000"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">Retirement Goals</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Current Monthly Expenses */}
                <div className="md:col-span-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Current Monthly Expenses
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-medium">$</span>
                    <input
                      type="number"
                      value={currentMonthlyExpenses}
                      onChange={(e) => setCurrentMonthlyExpenses(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="1000"
                      step="500"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[3000, 5000, 8000, 12000].map(amount => (
                      <button
                        key={amount}
                        onClick={() => setCurrentMonthlyExpenses(amount)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          currentMonthlyExpenses === amount 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desired Income Ratio */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Desired Income in Retirement (% of current)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={desiredIncomeRatio}
                      onChange={(e) => setDesiredIncomeRatio(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="50"
                      max="120"
                      step="5"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <input
                    type="range"
                    value={desiredIncomeRatio}
                    onChange={(e) => setDesiredIncomeRatio(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                    min="50"
                    max="120"
                    step="5"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Most people need 70-90% of pre-retirement income
                  </p>
                </div>

                {/* Inflation Rate */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    Expected Inflation Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="2"
                      max="10"
                      step="0.5"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[3, 4, 6, 7].map(rate => (
                      <button
                        key={rate}
                        onClick={() => setInflationRate(rate)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                          inflationRate === rate 
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

              <div className="grid md:grid-cols-2 gap-6">
                {/* Pre-retirement Return */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Pre-retirement Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={preRetirementReturn}
                      onChange={(e) => setPreRetirementReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="6"
                      max="18"
                      step="0.5"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <input
                    type="range"
                    value={preRetirementReturn}
                    onChange={(e) => setPreRetirementReturn(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                    min="8"
                    max="15"
                    step="0.5"
                  />
                  <p className="text-sm text-gray-500 mt-1">Higher growth during accumulation phase</p>
                </div>

                {/* Post-retirement Return */}
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Percent className="h-4 w-4 mr-1" />
                    Post-retirement Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={postRetirementReturn}
                      onChange={(e) => setPostRetirementReturn(Number(e.target.value))}
                      className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                      min="4"
                      max="12"
                      step="0.5"
                    />
                    <span className="absolute right-3 top-3 text-gray-500 font-medium">%</span>
                  </div>
                  <input
                    type="range"
                    value={postRetirementReturn}
                    onChange={(e) => setPostRetirementReturn(Number(e.target.value))}
                    className="w-full mt-2 accent-blue-600"
                    min="6"
                    max="10"
                    step="0.5"
                  />
                  <p className="text-sm text-gray-500 mt-1">Conservative approach during retirement</p>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Investment Strategy:</p>
                    <p>
                      Typically, pre-retirement portfolios are more aggressive (equity-heavy) while 
                      post-retirement portfolios become conservative (debt-heavy) to preserve capital.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Retirement Corpus */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <p className="text-green-100 text-sm font-medium">Required Retirement Corpus</p>
                <p className="text-3xl font-bold mb-1">{formatLakhs(results.retirementCorpus)}</p>
                <p className="text-green-100 text-sm">
                  {formatCurrency(results.retirementCorpus)}
                </p>
              </div>
            </div>

            {/* Monthly SIP Required */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <p className="text-blue-100 text-sm font-medium">Monthly SIP Required</p>
                <p className="text-3xl font-bold">{formatCurrency(results.requiredMonthlySIP)}</p>
                <p className="text-blue-100 text-sm">
                  For {retirementAge - currentAge} years
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Monthly Expenses at Retirement</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(results.monthlyExpensesAtRetirement)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Monthly Income from Corpus</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(results.monthlyIncomeInRetirement)}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-center">
                  <p className="text-gray-600 text-sm font-medium">Total Investment Needed</p>
                  <p className="text-2xl font-bold text-blue-600">{formatLakhs(results.totalInvestment)}</p>
                </div>
              </div>
            </div>

            {/* Retirement Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Retirement Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Years to Retirement:</span>
                  <span className="font-semibold">{retirementAge - currentAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retirement Duration:</span>
                  <span className="font-semibold">{lifeExpectancy - retirementAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Age:</span>
                  <span className="font-semibold">{currentAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Retirement Age:</span>
                  <span className="font-semibold">{retirementAge} years</span>
                </div>
              </div>
            </div>

            {/* Investment Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Investment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Savings:</span>
                  <span className="font-semibold">{formatCurrency(currentSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Future Value of Current Savings:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(currentSavings * Math.pow(1 + preRetirementReturn / 100, retirementAge - currentAge))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Additional Corpus Needed:</span>
                  <span className="font-semibold text-blue-600">
                    {formatCurrency(Math.max(0, results.retirementCorpus - currentSavings * Math.pow(1 + preRetirementReturn / 100, retirementAge - currentAge)))}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-800 font-medium">Wealth Multiplier:</span>
                  <span className="font-bold">
                    {results.totalInvestment > 0 ? (results.retirementCorpus / results.totalInvestment).toFixed(1) : 0}x
                  </span>
                </div>
              </div>
            </div>

            {/* Corpus Sustainability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Corpus Sustainability</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Income Need:</span>
                  <span className="font-semibold">{formatCurrency(results.monthlyExpensesAtRetirement * (desiredIncomeRatio / 100))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Income Generated:</span>
                  <span className={`font-semibold ${results.monthlyIncomeInRetirement >= results.monthlyExpensesAtRetirement * (desiredIncomeRatio / 100) ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.monthlyIncomeInRetirement)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Surplus/Deficit:</span>
                  <span className={`font-semibold ${results.monthlyIncomeInRetirement >= results.monthlyExpensesAtRetirement * (desiredIncomeRatio / 100) ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(results.monthlyIncomeInRetirement - results.monthlyExpensesAtRetirement * (desiredIncomeRatio / 100))}
                  </span>
                </div>
                {results.corpusDepletionAge < lifeExpectancy && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-800">
                      ⚠️ Corpus may deplete around age {Math.round(results.corpusDepletionAge)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="mt-12 max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Retirement Analysis</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {retirementAge - currentAge}
                </div>
                <div className="text-sm text-gray-600">Years to Save</div>
              </div>
              
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {((results.monthlyExpensesAtRetirement / currentMonthlyExpenses).toFixed(1))}x
                </div>
                <div className="text-sm text-gray-600">Inflation Impact</div>
              </div>
              
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {((results.requiredMonthlySIP / currentMonthlyExpenses) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-gray-600">Of Current Expenses</div>
              </div>
              
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {lifeExpectancy - retirementAge}
                </div>
                <div className="text-sm text-gray-600">Retirement Years</div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Assumptions</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex justify-between">
                    <span>Inflation Rate:</span>
                    <span className="font-medium">{inflationRate}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Pre-retirement Return:</span>
                    <span className="font-medium">{preRetirementReturn}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Post-retirement Return:</span>
                    <span className="font-medium">{postRetirementReturn}%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Desired Income Ratio:</span>
                    <span className="font-medium">{desiredIncomeRatio}%</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Goals</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Build adequate retirement corpus
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Maintain lifestyle in retirement
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Beat inflation consistently
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Ensure corpus sustainability
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Action Items</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Start SIP of {formatCurrency(results.requiredMonthlySIP)}
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Review and adjust annually
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Increase SIP with salary hikes
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Diversify investment portfolio
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-2">Important Notes:</p>
                  <ul className="space-y-1">
                    <li>• This calculation assumes constant returns, which may vary in reality</li>
                    <li>• Consider healthcare inflation, which is typically higher than general inflation</li>
                    <li>• Factor in potential income sources like rental income, part-time work, or social security</li>
                    <li>• Review and adjust your retirement plan annually or after major life events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}