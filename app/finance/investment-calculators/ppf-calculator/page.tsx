"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Calculator,
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  Users,
  Info,
  Shield,
} from "lucide-react";

export default function Calculator401k() {
  const [annualSalary, setAnnualSalary] = useState(75000);
  const [contributionPercent, setContributionPercent] = useState(10);
  const [employerMatch, setEmployerMatch] = useState(50);
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [salaryGrowth, setSalaryGrowth] = useState(3);

  const [results, setResults] = useState<{
    totalContributions: number;
    employerContributions: number;
    totalBalance: number;
    yearlyBreakdown: any[];
  }>({
    totalContributions: 0,
    employerContributions: 0,
    totalBalance: 0,
    yearlyBreakdown: [],
  });

  useEffect(() => {
    calculateReturns();
  }, [
    annualSalary,
    contributionPercent,
    employerMatch,
    employerMatchLimit,
    currentAge,
    retirementAge,
    annualReturn,
    currentBalance,
    salaryGrowth,
  ]);

  const calculateReturns = () => {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) return;

    let balance = currentBalance;
    let totalEmployeeContributions = 0;
    let totalEmployerContributions = 0;
    let yearlyBreakdown: any[] = [];
    let currentSalary = annualSalary;

    const contributionLimit2024 = 23000;
    const catchUpLimit = 7500;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const age = currentAge + year - 1;

      let annualContribution = (currentSalary * contributionPercent) / 100;
      const maxContribution =
        age >= 50
          ? contributionLimit2024 + catchUpLimit
          : contributionLimit2024;
      annualContribution = Math.min(annualContribution, maxContribution);

      const matchEligiblePercent = Math.min(
        contributionPercent,
        employerMatchLimit
      );
      let employerContribution =
        (currentSalary * matchEligiblePercent * employerMatch) / 10000;
      employerContribution = Math.min(employerContribution, maxContribution);

      balance += annualContribution + employerContribution;
      balance = balance * (1 + annualReturn / 100);

      totalEmployeeContributions += annualContribution;
      totalEmployerContributions += employerContribution;

      if (year % 5 === 0 || year === yearsToRetirement || year <= 5) {
        yearlyBreakdown.push({
          year: currentAge + year,
          age: currentAge + year,
          salary: currentSalary,
          balance: balance,
          annualContribution,
          employerContribution,
          totalContributions:
            totalEmployeeContributions + totalEmployerContributions,
        });
      }

      currentSalary = currentSalary * (1 + salaryGrowth / 100);
    }

    setResults({
      totalContributions: totalEmployeeContributions,
      employerContributions: totalEmployerContributions,
      totalBalance: balance,
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

  const monthlyRetirementIncome = (results.totalBalance * 0.04) / 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              401(k) Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Plan your retirement with employer matching and tax-advantaged
            savings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-2 text-blue-600" /> Your Details
            </h2>
            <div className="space-y-5">
              {/* Salary */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" /> Annual
                  Salary
                </label>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Contribution */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Percent className="h-5 w-5 mr-2 text-purple-600" /> Employee
                  Contribution (%)
                </label>
                <input
                  type="number"
                  value={contributionPercent}
                  onChange={(e) =>
                    setContributionPercent(Number(e.target.value))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Employer Match */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <Users className="h-5 w-5 mr-2 text-blue-600" /> Employer
                  Match (%)
                </label>
                <input
                  type="number"
                  value={employerMatch}
                  onChange={(e) => setEmployerMatch(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Age */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-pink-600" /> Current
                    Age
                  </label>
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="flex items-center text-gray-700 font-medium mb-2">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Return */}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" /> Annual
                  Return (%)
                </label>
                <input
                  type="number"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-green-600" /> Results
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-gray-600">Projected Retirement Balance</p>
                <p className="text-3xl font-bold text-blue-700">
                  {formatCurrency(results.totalBalance)}
                </p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-gray-600">Employer Contributions</p>
                <p className="text-2xl font-bold text-green-700">
                  {formatCurrency(results.employerContributions)}
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-gray-600">Your Contributions</p>
                <p className="text-2xl font-bold text-purple-700">
                  {formatCurrency(results.totalContributions)}
                </p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-gray-600">Estimated Monthly Income (4%)</p>
                <p className="text-2xl font-bold text-orange-700">
                  {formatCurrency(monthlyRetirementIncome)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Projection Table */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Growth Projection
          </h2>
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Age</th>
                <th className="px-4 py-2 border">Salary</th>
                <th className="px-4 py-2 border">Balance</th>
                <th className="px-4 py-2 border">Employee</th>
                <th className="px-4 py-2 border">Employer</th>
              </tr>
            </thead>
            <tbody>
              {results.yearlyBreakdown.map((year, idx) => (
                <tr key={idx} className="text-center">
                  <td className="px-4 py-2 border">{year.age}</td>
                  <td className="px-4 py-2 border">
                    {formatCurrency(year.salary)}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatCurrency(year.balance)}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatCurrency(year.annualContribution)}
                  </td>
                  <td className="px-4 py-2 border">
                    {formatCurrency(year.employerContribution)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <Info className="h-6 w-6 mr-2 text-blue-600" /> Understanding Your
            401(k)
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>
              Contributions are tax-deferred and reduce your taxable income.
            </li>
            <li>
              Employer matching is essentially free money — contribute enough to
              get the full match.
            </li>
            <li>
              Investment growth compounds over time — start early for maximum
              benefit.
            </li>
            <li>
              Contribution limits change annually ($23,000 in 2024, plus $7,500
              catch-up for age 50+).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
