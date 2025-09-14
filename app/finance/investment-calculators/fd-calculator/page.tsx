"use client";

import React, { useState, useEffect } from "react";
import {
  Calculator,
  IndianRupee,
  Percent,
  Clock,
  BarChart3,
  TrendingUp,
  Info,
  CheckCircle,
} from "lucide-react";

// Utility: Format currency in INR
const formatCurrency = (value: number | string) => {
  if (!value) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));
};

export default function FDCalculator() {
  // States
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [tenure, setTenure] = useState(5);
  const [compounding, setCompounding] = useState("yearly");
  const [results, setResults] = useState<any>(null);

  // Popular FD Schemes (Static Example)
  const popularFDSchemes = [
    { bank: "SBI", tenure: "5 Years", rate: "6.50%" },
    { bank: "HDFC Bank", tenure: "3 Years", rate: "7.10%" },
    { bank: "ICICI Bank", tenure: "2 Years", rate: "7.25%" },
    { bank: "Axis Bank", tenure: "1 Year", rate: "6.90%" },
  ];

  // Compounding frequency map
  const compoundingMap: any = {
    monthly: 12,
    quarterly: 4,
    "half-yearly": 2,
    yearly: 1,
  };

  // Calculation
  useEffect(() => {
    if (principal && rate && tenure && compounding) {
      const n = compoundingMap[compounding];
      const r = rate / 100;
      const A = principal * Math.pow(1 + r / n, n * tenure);
      const interestEarned = A - principal;
      const totalReturns = ((A - principal) / principal) * 100;

      setResults({
        maturityAmount: Math.round(A),
        interestEarned: Math.round(interestEarned),
        totalReturns: totalReturns.toFixed(2),
      });
    }
  }, [principal, rate, tenure, compounding]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Calculator Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
            <div className="flex items-center space-x-3 mb-8">
              <Calculator className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">FD Calculator</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Input Form */}
              <div className="space-y-6">
                {/* Principal */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <IndianRupee className="h-4 w-4" />
                    <span>Principal Amount</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                      placeholder="Enter amount"
                    />
                    <div className="absolute right-3 top-3 text-gray-500">₹</div>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="10000000"
                    step="1000"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full mt-3 accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>₹1K</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Rate */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <Percent className="h-4 w-4" />
                    <span>Annual Interest Rate</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      step="0.1"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                      placeholder="Interest rate"
                    />
                    <div className="absolute right-3 top-3 text-gray-500">%</div>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full mt-3 accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3%</span>
                    <span>12%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <Clock className="h-4 w-4" />
                    <span>Tenure (Years)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      step="0.5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                      placeholder="Years"
                    />
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full mt-3 accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>6M</span>
                    <span>10Y</span>
                  </div>
                </div>

                {/* Compounding */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                    <BarChart3 className="h-4 w-4" />
                    <span>Compounding Frequency</span>
                  </label>
                  <select
                    value={compounding}
                    onChange={(e) => setCompounding(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none text-lg font-semibold"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="half-yearly">Half-Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {results && (
                  <>
                    <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Maturity Amount</h3>
                        <TrendingUp className="h-5 w-5" />
                      </div>
                      <div className="text-3xl font-bold mb-2">
                        {formatCurrency(results.maturityAmount)}
                      </div>
                      <div className="text-emerald-100 text-sm">
                        Total returns: {results.totalReturns}%
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Breakdown</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Principal Amount</span>
                          <span className="font-semibold">{formatCurrency(principal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interest Earned</span>
                          <span className="font-semibold text-emerald-600">
                            {formatCurrency(results.interestEarned)}
                          </span>
                        </div>
                        <div className="border-t pt-4">
                          <div className="flex justify-between">
                            <span className="text-gray-900 font-semibold">Maturity Amount</span>
                            <span className="font-bold text-lg">
                              {formatCurrency(results.maturityAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-2xl p-6">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-2">Investment Tip</h4>
                          <p className="text-yellow-700 text-sm">
                            Consider diversifying your investments across different tenure
                            FDs to balance returns and liquidity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular FD Schemes */}
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Popular FD Schemes</h3>
            <div className="space-y-4">
              {popularFDSchemes.map((scheme, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{scheme.bank}</div>
                    <div className="text-sm text-gray-600">{scheme.tenure}</div>
                  </div>
                  <div className="text-emerald-600 font-bold">{scheme.rate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">FD Investment Tips</h3>
            <div className="space-y-3">
              {[
                "Compare interest rates across different banks",
                "Consider tax implications on FD interest",
                "Look for special rates for senior citizens",
                "Evaluate penalty charges for premature withdrawal",
                "Consider laddering FDs for better liquidity",
              ].map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            About Fixed Deposit Calculator
          </h2>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              Our Fixed Deposit Calculator helps you calculate the maturity amount and
              interest earnings for your FD investments. Whether you're planning for
              short-term goals or long-term wealth creation, this tool provides accurate
              calculations based on compound interest formulas.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">
              How Fixed Deposit Interest is Calculated
            </h3>
            <p className="text-gray-700 mb-4">
              Fixed Deposit interest is calculated using the compound interest formula:
              A = P(1 + r/n)^(nt), where:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>A = Final maturity amount</li>
              <li>P = Principal amount invested</li>
              <li>r = Annual interest rate</li>
              <li>n = Number of compounding periods per year</li>
              <li>t = Time period in years</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Benefits of Using Our FD Calculator
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Accurate maturity amount calculation</li>
                  <li>Compare different FD schemes</li>
                  <li>Plan investment tenure effectively</li>
                  <li>Understand compound interest impact</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Free and easy to use</li>
                  <li>Real-time calculations</li>
                  <li>Mobile-friendly interface</li>
                  <li>No registration required</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Types of Fixed Deposits
            </h3>
            <p className="text-gray-700 mb-4">
              Banks offer various types of Fixed Deposits including Regular FDs, Tax Saving
              FDs, Senior Citizen FDs, and Flexi FDs. Each type has different interest
              rates and features to suit various investment needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
