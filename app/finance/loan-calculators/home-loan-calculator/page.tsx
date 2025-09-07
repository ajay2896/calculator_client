'use client';

import { useState, useEffect } from 'react';
import { Calculator, Home, Info, DollarSign, Percent, Calendar, PieChart, TrendingUp } from 'lucide-react';

interface CalculationResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
  loanToValue: number;
}

interface EligibilityResult {
  maxLoanAmount: number;
  recommendedEmi: number;
  isEligible: boolean;
  monthlyIncome: number;
}

export default function HomeLoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<string>('2500000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTenure, setLoanTenure] = useState<string>('20');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('75000');
  const [results, setResults] = useState<CalculationResult>({
    emi: 0,
    totalAmount: 0,
    totalInterest: 0,
    principalAmount: 0,
    loanToValue: 0
  });
  const [eligibility, setEligibility] = useState<EligibilityResult>({
    maxLoanAmount: 0,
    recommendedEmi: 0,
    isEligible: true,
    monthlyIncome: 0
  });

  const calculateEMI = (): void => {
    const P = parseFloat(loanAmount) || 0;
    const R = (parseFloat(interestRate) || 0) / 100 / 12;
    const N = (parseFloat(loanTenure) || 0) * 12;
    const income = parseFloat(monthlyIncome) || 0;

    if (P > 0 && R > 0 && N > 0) {
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmountValue = emiValue * N;
      const totalInterestValue = totalAmountValue - P;

      setResults({
        emi: Math.round(emiValue),
        totalAmount: Math.round(totalAmountValue),
        totalInterest: Math.round(totalInterestValue),
        principalAmount: P,
        loanToValue: 80 // Assuming 80% LTV ratio
      });

      // Calculate eligibility
      const maxAffordableEmi = income * 0.4; // 40% of income rule
      const maxLoanAmountValue = (maxAffordableEmi * (Math.pow(1 + R, N) - 1)) / (R * Math.pow(1 + R, N));
      
      setEligibility({
        maxLoanAmount: Math.round(maxLoanAmountValue),
        recommendedEmi: Math.round(maxAffordableEmi),
        isEligible: emiValue <= maxAffordableEmi,
        monthlyIncome: income
      });
    } else {
      setResults({
        emi: 0,
        totalAmount: 0,
        totalInterest: 0,
        principalAmount: 0,
        loanToValue: 0
      });
      setEligibility({
        maxLoanAmount: 0,
        recommendedEmi: 0,
        isEligible: true,
        monthlyIncome: 0
      });
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, monthlyIncome]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatNumberWithoutCurrency = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ): void => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setter(cleanValue);
  };

  const getEligibilityColor = (): string => {
    return eligibility.isEligible ? 'text-green-600' : 'text-red-600';
  };

  const getEligibilityStatus = (): string => {
    return eligibility.isEligible ? 'Eligible' : 'Not Eligible';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">LoanCalc</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/tools" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                TOOLS
              </a>
              <a href="/blog" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                BLOG
              </a>
              <a href="/about" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                ABOUT
              </a>
              <a href="/search" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors">
                SEARCH
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                SIGN IN
              </button>
            </nav>
            <button className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Home className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl font-bold mb-4">Home Loan Calculator</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Calculate home loan EMI, eligibility, and total interest payable for your dream home
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="text-sm text-gray-600 flex items-center space-x-2">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li>•</li>
            <li><a href="/finance" className="hover:text-blue-600">Finance</a></li>
            <li>•</li>
            <li><a href="/finance/loan-calculators" className="hover:text-blue-600">Loan & Credit Calculators</a></li>
            <li>•</li>
            <li className="text-gray-900 font-medium">Home Loan Calculator</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form - Left Side */}
          <section>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <header className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-semibold text-gray-900">Calculate Your Home Loan</h2>
              </header>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label 
                    htmlFor="loan-amount"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <Home className="h-4 w-4 mr-1" />
                    Home Loan Amount (₹)
                  </label>
                  <input
                    id="loan-amount"
                    type="text"
                    inputMode="numeric"
                    value={loanAmount}
                    onChange={(e) => handleInputChange(setLoanAmount, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                    placeholder="Enter home loan amount"
                    aria-describedby="loan-amount-help"
                  />
                  <p id="loan-amount-help" className="text-xs text-gray-500 mt-1">
                    Enter the loan amount you need for your home purchase
                  </p>
                </div>

                <div>
                  <label 
                    htmlFor="interest-rate"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <Percent className="h-4 w-4 mr-1" />
                    Annual Interest Rate (%)
                  </label>
                  <input
                    id="interest-rate"
                    type="text"
                    inputMode="decimal"
                    value={interestRate}
                    onChange={(e) => handleInputChange(setInterestRate, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                    placeholder="Enter interest rate"
                    aria-describedby="interest-rate-help"
                  />
                  <p id="interest-rate-help" className="text-xs text-gray-500 mt-1">
                    Current home loan interest rate offered by your lender
                  </p>
                </div>

                <div>
                  <label 
                    htmlFor="loan-tenure"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Loan Tenure (Years)
                  </label>
                  <input
                    id="loan-tenure"
                    type="text"
                    inputMode="numeric"
                    value={loanTenure}
                    onChange={(e) => handleInputChange(setLoanTenure, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                    placeholder="Enter loan tenure"
                    aria-describedby="loan-tenure-help"
                  />
                  <p id="loan-tenure-help" className="text-xs text-gray-500 mt-1">
                    Number of years to repay the home loan
                  </p>
                </div>

                <div>
                  <label 
                    htmlFor="monthly-income"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Monthly Income (₹)
                  </label>
                  <input
                    id="monthly-income"
                    type="text"
                    inputMode="numeric"
                    value={monthlyIncome}
                    onChange={(e) => handleInputChange(setMonthlyIncome, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                    placeholder="Enter monthly income"
                    aria-describedby="monthly-income-help"
                  />
                  <p id="monthly-income-help" className="text-xs text-gray-500 mt-1">
                    Your total monthly income for eligibility calculation
                  </p>
                </div>

                <button
                  type="button"
                  onClick={calculateEMI}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Calculate Home Loan EMI
                </button>
              </form>
            </div>

            {/* Information Section */}
            <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
              <header className="flex items-center mb-4">
                <Info className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">How Home Loan EMI is Calculated</h3>
              </header>
              <div className="text-sm text-gray-600 space-y-3">
                <p>
                  Home Loan EMI is calculated using the standard loan formula:
                </p>
                <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                  EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                </div>
                <dl className="space-y-2">
                  <div>
                    <dt className="font-semibold inline">P</dt>
                    <dd className="inline"> = Principal loan amount</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">R</dt>
                    <dd className="inline"> = Monthly interest rate (annual ÷ 12 ÷ 100)</dd>
                  </div>
                  <div>
                    <dt className="font-semibold inline">N</dt>
                    <dd className="inline"> = Number of monthly installments</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* Results - Right Side */}
          <section className="space-y-6">
            {/* EMI Results */}
            {results.emi > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <header className="flex items-center mb-4">
                  <PieChart className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">EMI Calculation Results</h3>
                </header>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {formatNumber(results.emi)}
                      </div>
                      <div className="text-sm text-gray-600">Monthly EMI</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-lg font-bold text-green-600">
                        {formatNumber(results.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Amount</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="text-lg font-bold text-orange-600">
                        {formatNumber(results.totalInterest)}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Total Interest</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Principal Amount:</span>
                      <span className="font-semibold">{formatNumber(results.principalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Interest Amount:</span>
                      <span className="font-semibold">{formatNumber(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Loan Tenure:</span>
                      <span className="font-semibold">{loanTenure} years</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Eligibility Results */}
            {eligibility.maxLoanAmount > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <header className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">Loan Eligibility</h3>
                </header>
                <div className="space-y-4">
                  <div className={`text-center p-4 rounded-lg border-2 ${eligibility.isEligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <div className={`text-2xl font-bold ${getEligibilityColor()} mb-2`}>
                      {getEligibilityStatus()}
                    </div>
                    <div className="text-sm text-gray-600">Based on your income</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Maximum Loan Amount:</span>
                      <span className="font-semibold text-green-600">{formatNumber(eligibility.maxLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Recommended EMI (40% of income):</span>
                      <span className="font-semibold text-blue-600">{formatNumber(eligibility.recommendedEmi)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Your Current EMI:</span>
                      <span className={`font-semibold ${eligibility.isEligible ? 'text-green-600' : 'text-red-600'}`}>
                        {formatNumber(results.emi)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Monthly Income:</span>
                      <span className="font-semibold text-gray-900">{formatNumber(eligibility.monthlyIncome)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Home Loan Tips */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Home Loan Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Maintain a credit score above 750 for better interest rates</p>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep your EMI under 40% of your monthly income</p>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Compare rates from multiple banks and NBFCs</p>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Consider prepayment options to reduce interest burden</p>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Factor in additional costs like registration and insurance</p>
                </li>
              </ul>
            </div>

            {/* Advertisement Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="text-gray-500 text-sm">Advertisement Space</div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer Advertisement */}
      <section className="bg-gray-100 py-8" aria-label="Advertisement section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-8 text-center shadow-sm">
            <div className="text-gray-500 text-sm">Advertisement Space - Google AdSense</div>
          </div>
        </div>
      </section>
    </div>
  );
}