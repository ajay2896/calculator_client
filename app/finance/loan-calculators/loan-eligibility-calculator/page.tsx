'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface LoanEligibilityResult {
  eligible: boolean;
  maxLoanAmount: number;
  monthlyEMI: number;
  debtToIncomeRatio: number;
  creditScore: number;
  eligibilityPercentage: number;
}

const LoanEligibilityCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('');
  const [existingEMIs, setExistingEMIs] = useState<string>('');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [loanTenure, setLoanTenure] = useState<string>('24');
  const [interestRate, setInterestRate] = useState<string>('12');
  const [creditScore, setCreditScore] = useState<string>('750');
  const [result, setResult] = useState<LoanEligibilityResult | null>(null);

  const calculateEligibility = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const expenses = parseFloat(monthlyExpenses) || 0;
    const existingEMI = parseFloat(existingEMIs) || 0;
    const requestedAmount = parseFloat(loanAmount) || 0;
    const tenure = parseInt(loanTenure) || 24;
    const rate = parseFloat(interestRate) || 12;
    const credit = parseInt(creditScore) || 750;

    // Calculate monthly EMI for requested loan
    const monthlyRate = rate / (12 * 100);
    const emi = requestedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);

    // Calculate debt-to-income ratio
    const totalEMI = emi + existingEMI;
    const debtToIncomeRatio = (totalEMI / income) * 100;

    // Calculate disposable income
    const disposableIncome = income - expenses - existingEMI;

    // Eligibility criteria
    const maxDebtRatio = 50; // Maximum 50% debt-to-income ratio
    const minCreditScore = 650;
    const minDisposableIncome = income * 0.3; // At least 30% should remain after all expenses

    // Calculate maximum eligible loan amount
    const maxEMIAffordable = (income * maxDebtRatio / 100) - existingEMI;
    const maxLoanAmount = maxEMIAffordable * (Math.pow(1 + monthlyRate, tenure) - 1) / 
                         (monthlyRate * Math.pow(1 + monthlyRate, tenure));

    // Determine eligibility
    const eligible = debtToIncomeRatio <= maxDebtRatio && 
                    credit >= minCreditScore && 
                    disposableIncome >= minDisposableIncome &&
                    emi <= maxEMIAffordable;

    // Calculate eligibility percentage
    const ratioScore = Math.max(0, 100 - (debtToIncomeRatio / maxDebtRatio) * 100);
    const creditScoreNormalized = Math.min(100, ((credit - minCreditScore) / (850 - minCreditScore)) * 100);
    const incomeScore = Math.min(100, (disposableIncome / minDisposableIncome) * 100);
    const eligibilityPercentage = (ratioScore + creditScoreNormalized + incomeScore) / 3;

    setResult({
      eligible,
      maxLoanAmount: Math.max(0, maxLoanAmount),
      monthlyEMI: emi,
      debtToIncomeRatio,
      creditScore: credit,
      eligibilityPercentage: Math.min(100, eligibilityPercentage)
    });
  };

  useEffect(() => {
    if (monthlyIncome && loanAmount) {
      calculateEligibility();
    }
  }, [monthlyIncome, monthlyExpenses, existingEMIs, loanAmount, loanTenure, interestRate, creditScore]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getEligibilityColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getEligibilityIcon = (eligible: boolean) => {
    return eligible ? (
      <CheckCircle className="w-6 h-6 text-green-600" />
    ) : (
      <XCircle className="w-6 h-6 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Loan Eligibility Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Check your loan eligibility based on income and expenses. Get instant results with detailed analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <Calculator className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Loan Details</h2>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Income
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly Expenses
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={monthlyExpenses}
                      onChange={(e) => setMonthlyExpenses(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="2000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Existing EMIs
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={existingEMIs}
                      onChange={(e) => setExistingEMIs(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Credit Score
                  </label>
                  <input
                    type="number"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="750"
                    min="300"
                    max="850"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requested Loan Amount
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Tenure (months)
                  </label>
                  <select
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="12">12 months</option>
                    <option value="24">24 months</option>
                    <option value="36">36 months</option>
                    <option value="48">48 months</option>
                    <option value="60">60 months</option>
                    <option value="72">72 months</option>
                    <option value="84">84 months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12"
                    step="0.1"
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Eligibility Results</h2>
            </div>

            {result ? (
              <div className="space-y-6">
                {/* Eligibility Status */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Eligibility Status</h3>
                    {getEligibilityIcon(result.eligible)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">
                      {result.eligible ? 'Eligible' : 'Not Eligible'}
                    </span>
                    <span className={`text-lg font-semibold ${getEligibilityColor(result.eligibilityPercentage)}`}>
                      {result.eligibilityPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-3 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        result.eligibilityPercentage >= 80 ? 'bg-green-500' :
                        result.eligibilityPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min(100, result.eligibilityPercentage)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-600 font-medium">Monthly EMI</div>
                    <div className="text-xl font-bold text-blue-900">
                      {formatCurrency(result.monthlyEMI)}
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-sm text-purple-600 font-medium">Max Loan Amount</div>
                    <div className="text-xl font-bold text-purple-900">
                      {formatCurrency(result.maxLoanAmount)}
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">Detailed Analysis</h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Debt-to-Income Ratio</span>
                      <span className={`font-semibold ${
                        result.debtToIncomeRatio <= 50 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.debtToIncomeRatio.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Credit Score</span>
                      <span className={`font-semibold ${
                        result.creditScore >= 750 ? 'text-green-600' :
                        result.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {result.creditScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Recommendations</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {result.debtToIncomeRatio > 50 && (
                          <li>• Reduce existing EMIs or increase income to improve debt-to-income ratio</li>
                        )}
                        {result.creditScore < 750 && (
                          <li>• Improve credit score for better loan terms and eligibility</li>
                        )}
                        {!result.eligible && (
                          <li>• Consider a smaller loan amount: {formatCurrency(result.maxLoanAmount)}</li>
                        )}
                        {result.eligible && (
                          <li>• You're eligible! Consider comparing rates from multiple lenders</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your details to check loan eligibility</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How Loan Eligibility is Calculated</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Income Analysis</h4>
              <p className="text-gray-600 text-sm">
                We analyze your monthly income and existing financial obligations to determine your repayment capacity.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Credit Assessment</h4>
              <p className="text-gray-600 text-sm">
                Your credit score plays a crucial role in determining eligibility and interest rates.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Risk Evaluation</h4>
              <p className="text-gray-600 text-sm">
                We ensure your debt-to-income ratio stays within safe limits for financial stability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanEligibilityCalculator;