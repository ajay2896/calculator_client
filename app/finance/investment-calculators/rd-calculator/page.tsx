"use client";

import React, { useState, useEffect } from "react";
import {
  Coins,
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  Info,
} from "lucide-react";

export default function RegularSavingsCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(500);
  const [annualInterestRate, setAnnualInterestRate] = useState(4.5);
  const [tenureYears, setTenureYears] = useState(5);
  const [results, setResults] = useState<{
    totalDeposits: number;
    maturityAmount: number;
    totalInterest: number;
    monthlyBreakdown: {
      year: number;
      totalDeposited: number;
      accumulatedValue: number;
    }[];
  }>({
    totalDeposits: 0,
    maturityAmount: 0,
    totalInterest: 0,
    monthlyBreakdown: [],
  });

  useEffect(() => {
    calculateReturns();
  }, [monthlyDeposit, annualInterestRate, tenureYears]);

  const calculateReturns = () => {
    const monthlyRate = annualInterestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const totalDeposits = monthlyDeposit * totalMonths;

    let maturityAmount = 0;
    let breakdown: {
      year: number;
      totalDeposited: number;
      accumulatedValue: number;
    }[] = [];

    for (let month = 1; month <= totalMonths; month++) {
      const monthsToMaturity = totalMonths - month + 1;
      const depositMaturityValue =
        monthlyDeposit * Math.pow(1 + monthlyRate, monthsToMaturity);
      maturityAmount += depositMaturityValue;

      if (month % 12 === 0 || month === totalMonths) {
        breakdown.push({
          year: Math.ceil(month / 12),
          totalDeposited: monthlyDeposit * month,
          accumulatedValue: maturityAmount,
        });
      }
    }

    const totalInterest = maturityAmount - totalDeposits;

    setResults({
      totalDeposits,
      maturityAmount,
      totalInterest,
      monthlyBreakdown: breakdown,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Coins className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Regular Savings Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your savings growth with regular monthly deposits and
            compound interest
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 h-fit">
            <div className="flex items-center mb-6">
              <Calculator className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">
                Calculation Parameters
              </h2>
            </div>

            <div className="space-y-6">
              {/* Monthly Deposit */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Monthly Deposit Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    value={monthlyDeposit}
                    onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min={1}
                    step={50}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  {[250, 500, 1000, 2000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setMonthlyDeposit(amount)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        monthlyDeposit === amount
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Percent className="h-4 w-4 mr-1" />
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={annualInterestRate}
                    onChange={(e) =>
                      setAnnualInterestRate(Number(e.target.value))
                    }
                    className="w-full px-4 py-3 pr-8 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                    min={0.1}
                    max={20}
                    step={0.1}
                  />
                  <span className="absolute right-3 top-3 text-gray-500 font-medium">
                    %
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[3.5, 4.5, 5.5, 6.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setAnnualInterestRate(rate)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        annualInterestRate === rate
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Tenure */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  Investment Period (Years)
                </label>
                <input
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-lg font-medium"
                  min={1}
                  max={30}
                />
                <input
                  type="range"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full mt-2 accent-blue-600"
                  min={1}
                  max={30}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>30 years</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">How it works:</p>
                  <p>
                    Each monthly deposit earns compound interest from the
                    deposit date until maturity. Earlier deposits earn more
                    interest as they have more time to compound.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">
                      Maturity Amount
                    </p>
                    <p className="text-3xl font-bold">
                      {formatCurrency(results.maturityAmount)}
                    </p>
                  </div>
                  <TrendingUp className="h-12 w-12 text-green-200" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-medium">
                      Total Deposits
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {formatCurrency(results.totalDeposits)}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm font-medium">
                      Total Interest
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Investment Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Months:</span>
                    <span className="font-semibold">
                      {tenureYears * 12} months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Effective Annual Return:
                    </span>
                    <span className="font-semibold">
                      {(
                        ((results.maturityAmount / results.totalDeposits - 1) *
                          100) /
                        tenureYears
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Interest to Deposit Ratio:
                    </span>
                    <span className="font-semibold">
                      {(
                        (results.totalInterest / results.totalDeposits) *
                        100
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Year-wise Breakdown */}
            {results.monthlyBreakdown.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Year-wise Growth
                </h3>
                <div className="space-y-3">
                  {results.monthlyBreakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          Year {item.year}
                        </p>
                        <p className="text-sm text-gray-600">
                          Deposited: {formatCurrency(item.totalDeposited)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">
                          {formatCurrency(item.accumulatedValue)}
                        </p>
                        <p className="text-sm text-gray-600">
                          +
                          {formatCurrency(
                            item.accumulatedValue - item.totalDeposited
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Understanding Regular Savings Accounts
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Disciplined saving habit
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Compound interest benefits
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Flexible deposit amounts
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    FDIC insured safety
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Monthly deposit commitment
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Fixed or variable interest rates
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Automatic transfers available
                  </li>
                  <li className="flex items-start">
                    <span className="h-1.5 w-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Early withdrawal penalties may apply
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
