'use client';

import { useState, useEffect } from 'react';
import { Calculator, User, Info, Download, TrendingUp, PieChart, Shield, Clock, CreditCard, Percent, Calendar, DollarSign } from 'lucide-react';

interface PersonalLoanResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
  monthlyRate: number;
  loanTenureMonths: number;
}

interface EligibilityResult {
  maxLoanAmount: number;
  recommendedEmi: number;
  isEligible: boolean;
  debtToIncomeRatio: number;
  creditScoreRequired: number;
}

interface AmortizationEntry {
  month: number;
  emiAmount: number;
  principalComponent: number;
  interestComponent: number;
  outstandingBalance: number;
}

export default function PersonalLoanCalculatorPage() {
  // Form state
  const [loanAmount, setLoanAmount] = useState<string>('300000');
  const [interestRate, setInterestRate] = useState<string>('14.0');
  const [loanTenure, setLoanTenure] = useState<string>('3');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('50000');
  const [currentEmi, setCurrentEmi] = useState<string>('0');
  
  // Results state
  const [results, setResults] = useState<PersonalLoanResult | null>(null);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationEntry[]>([]);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // SEO and Analytics tracking
  useEffect(() => {
    // Track page view for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Personal Loan EMI Calculator',
        page_location: window.location.href,
      });
    }
  }, []);

  const calculatePersonalLoan = (): void => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const tenure = parseFloat(loanTenure) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    const existingEmi = parseFloat(currentEmi) || 0;

    if (P > 0 && annualRate > 0 && tenure > 0) {
      const R = annualRate / 12 / 100; // Monthly interest rate
      const N = tenure * 12; // Total months

      // Calculate EMI using the standard formula
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmountValue = emiValue * N;
      const totalInterestValue = totalAmountValue - P;

      setResults({
        emi: Math.round(emiValue),
        totalAmount: Math.round(totalAmountValue),
        totalInterest: Math.round(totalInterestValue),
        principalAmount: P,
        monthlyRate: R,
        loanTenureMonths: N
      });

      // Calculate eligibility
      if (income > 0) {
        const totalExistingEmi = existingEmi + emiValue;
        const debtToIncomeRatio = (totalExistingEmi / income) * 100;
        const maxAffordableEmi = income * 0.5; // 50% of income for personal loans
        const maxLoanAmountValue = (maxAffordableEmi * (Math.pow(1 + R, N) - 1)) / (R * Math.pow(1 + R, N));
        
        setEligibility({
          maxLoanAmount: Math.round(maxLoanAmountValue),
          recommendedEmi: Math.round(maxAffordableEmi),
          isEligible: totalExistingEmi <= maxAffordableEmi,
          debtToIncomeRatio: Math.round(debtToIncomeRatio * 100) / 100,
          creditScoreRequired: debtToIncomeRatio > 40 ? 750 : 700
        });
      }

      // Generate amortization schedule
      generateAmortizationSchedule(P, R, N, emiValue);
    } else {
      setResults(null);
      setEligibility(null);
      setAmortizationSchedule([]);
    }
  };

  const generateAmortizationSchedule = (principal: number, monthlyRate: number, months: number, emi: number): void => {
    const schedule: AmortizationEntry[] = [];
    let outstandingBalance = principal;

    for (let month = 1; month <= months; month++) {
      const interestComponent = outstandingBalance * monthlyRate;
      const principalComponent = emi - interestComponent;
      outstandingBalance = Math.max(0, outstandingBalance - principalComponent);

      schedule.push({
        month,
        emiAmount: Math.round(emi),
        principalComponent: Math.round(principalComponent),
        interestComponent: Math.round(interestComponent),
        outstandingBalance: Math.round(outstandingBalance)
      });
    }

    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculatePersonalLoan();
  }, [loanAmount, interestRate, loanTenure, monthlyIncome, currentEmi]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string
  ): void => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setter(cleanValue);
  };

  const downloadAmortizationSchedule = (): void => {
    if (amortizationSchedule.length === 0) return;

    const csvContent = [
      ['Month', 'EMI Amount', 'Principal', 'Interest', 'Outstanding Balance'],
      ...amortizationSchedule.map(entry => [
        entry.month,
        entry.emiAmount,
        entry.principalComponent,
        entry.interestComponent,
        entry.outstandingBalance
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'personal-loan-amortization-schedule.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "SoftwareApplication", "FinancialProduct"],
            "name": "Personal Loan EMI Calculator",
            "description": "Calculate personal loan EMI, total interest, and eligibility instantly. Free online calculator with detailed amortization schedule.",
            "url": "https://mreasycalcuators.com/finance/loan-calculators/personal-loan-calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR"
            },
            "provider": {
              "@type": "Organization",
              "name": "mreasycalcuators",
              "url": "https://mreasycalcuators.com"
            },
            "featureList": [
              "EMI Calculation",
              "Interest Calculation", 
              "Loan Eligibility Check",
              "Amortization Schedule",
              "Downloadable Reports"
            ],
            "screenshot": "https://mreasycalcuators.com/images/personal-loan-calculator-screenshot.jpg"
          })
        }}
      />



      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <User className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Personal Loan EMI Calculator 2025
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Calculate your personal loan EMI, total interest, and loan eligibility instantly. 
            Compare rates from 50+ banks and NBFCs to get the best deal.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ Instant Results</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ 50+ Banks</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ No Registration</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ 100% Free</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="text-sm text-gray-600 flex items-center space-x-2">
            <li><a href="/" className="hover:text-purple-600 transition-colors">Home</a></li>
            <li>•</li>
            <li><a href="/finance" className="hover:text-purple-600 transition-colors">Finance</a></li>
            <li>•</li>
            <li><a href="/finance/loan-calculators" className="hover:text-purple-600 transition-colors">Loan Calculators</a></li>
            <li>•</li>
            <li className="text-gray-900 font-medium">Personal Loan Calculator</li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form - Left Side */}
          <section>
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <header className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Personal Loan Calculator</h2>
              </header>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="loan-amount"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <DollarSign className="h-4 w-4 mr-1 text-purple-600" />
                      Loan Amount (₹)
                    </label>
                    <input
                      id="loan-amount"
                      type="text"
                      inputMode="numeric"
                      value={loanAmount}
                      onChange={(e) => handleInputChange(setLoanAmount, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                      placeholder="Enter loan amount"
                      aria-describedby="loan-amount-help"
                    />
                    <p id="loan-amount-help" className="text-xs text-gray-500 mt-1">
                      Min: ₹50,000 | Max: ₹50,00,000
                    </p>
                  </div>

                  <div>
                    <label 
                      htmlFor="interest-rate"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <Percent className="h-4 w-4 mr-1 text-purple-600" />
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      id="interest-rate"
                      type="text"
                      inputMode="decimal"
                      value={interestRate}
                      onChange={(e) => handleInputChange(setInterestRate, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                      placeholder="Enter interest rate"
                      aria-describedby="interest-rate-help"
                    />
                    <p id="interest-rate-help" className="text-xs text-gray-500 mt-1">
                      Typical range: 10.99% - 24%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="loan-tenure"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <Calendar className="h-4 w-4 mr-1 text-purple-600" />
                      Loan Tenure (Years)
                    </label>
                    <input
                      id="loan-tenure"
                      type="text"
                      inputMode="numeric"
                      value={loanTenure}
                      onChange={(e) => handleInputChange(setLoanTenure, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                      placeholder="Enter tenure"
                      aria-describedby="loan-tenure-help"
                    />
                    <p id="loan-tenure-help" className="text-xs text-gray-500 mt-1">
                      Range: 1 - 5 years
                    </p>
                  </div>

                  <div>
                    <label 
                      htmlFor="monthly-income"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <TrendingUp className="h-4 w-4 mr-1 text-purple-600" />
                      Monthly Income (₹)
                    </label>
                    <input
                      id="monthly-income"
                      type="text"
                      inputMode="numeric"
                      value={monthlyIncome}
                      onChange={(e) => handleInputChange(setMonthlyIncome, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                      placeholder="Enter monthly income"
                      aria-describedby="monthly-income-help"
                    />
                    <p id="monthly-income-help" className="text-xs text-gray-500 mt-1">
                      For eligibility calculation
                    </p>
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="current-emi"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <CreditCard className="h-4 w-4 mr-1 text-purple-600" />
                    Current EMI Obligations (₹)
                  </label>
                  <input
                    id="current-emi"
                    type="text"
                    inputMode="numeric"
                    value={currentEmi}
                    onChange={(e) => handleInputChange(setCurrentEmi, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg transition-all"
                    placeholder="Existing loan EMIs"
                    aria-describedby="current-emi-help"
                  />
                  <p id="current-emi-help" className="text-xs text-gray-500 mt-1">
                    Total of all existing loan EMIs (optional)
                  </p>
                </div>

                <button
                  type="button"
                  onClick={calculatePersonalLoan}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Calculate Personal Loan EMI
                </button>
              </form>
            </div>

            {/* Information Cards */}
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  Personal Loan EMI Formula
                </h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <p>Personal Loan EMI is calculated using the reducing balance method:</p>
                  <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                    EMI = [P × R × (1+R)^N] ÷ [(1+R)^N - 1]
                  </div>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <p><strong>P</strong> = Principal loan amount</p>
                    <p><strong>R</strong> = Monthly interest rate (Annual Rate ÷ 12 ÷ 100)</p>
                    <p><strong>N</strong> = Loan tenure in months</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  Personal Loan Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>No collateral required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Quick approval process</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Flexible tenure options</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Multiple end-use options</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results Section - Right Side */}
          <section className="space-y-6">
            {/* EMI Results */}
            {results && (
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <header className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <PieChart className="h-6 w-6 text-purple-600 mr-2" />
                    EMI Calculation Results
                  </h3>
                  <button
                    onClick={() => setShowAmortization(!showAmortization)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {showAmortization ? 'Hide' : 'Show'} Schedule
                  </button>
                </header>

                {/* Main EMI Display */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-purple-100">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      {formatCurrency(results.emi)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Monthly EMI</div>
                  </div>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(results.principalAmount)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Principal Amount</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-200">
                    <div className="text-lg font-bold text-orange-600">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Total Interest</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Amount Payable:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(results.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Monthly Interest Rate:</span>
                    <span className="font-bold text-gray-900">{(results.monthlyRate * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Loan Tenure:</span>
                    <span className="font-bold text-gray-900">{results.loanTenureMonths} months</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Interest vs Principal Ratio:</span>
                    <span className="font-bold text-gray-900">
                      {Math.round((results.totalInterest / results.principalAmount) * 100)}% : {Math.round((results.principalAmount / results.totalAmount) * 100)}%
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadAmortizationSchedule}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  disabled={amortizationSchedule.length === 0}
                >
                  <Download className="h-4 w-4" />
                  <span>Download Amortization Schedule</span>
                </button>
              </div>
            )}

            {/* Eligibility Results */}
            {eligibility && (
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <header className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Loan Eligibility Analysis</h3>
                </header>

                <div className="space-y-4">
                  {/* Eligibility Status */}
                  <div className={`text-center p-4 rounded-lg border-2 ${
                    eligibility.isEligible 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      eligibility.isEligible ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {eligibility.isEligible ? 'ELIGIBLE' : 'CHECK ELIGIBILITY'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on 50% income rule
                    </div>
                  </div>

                  {/* Eligibility Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Maximum Loan Amount:</span>
                      <span className="font-bold text-green-600">{formatCurrency(eligibility.maxLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Recommended EMI:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(eligibility.recommendedEmi)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Your Debt-to-Income Ratio:</span>
                      <span className={`font-bold ${
                        eligibility.debtToIncomeRatio <= 40 ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {eligibility.debtToIncomeRatio}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Recommended Credit Score:</span>
                      <span className="font-bold text-purple-600">{eligibility.creditScoreRequired}+</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Schedule */}
            {showAmortization && amortizationSchedule.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <header className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <Clock className="h-6 w-6 text-blue-600 mr-2" />
                    Amortization Schedule
                  </h3>
                  <span className="text-sm text-gray-500">First 12 months</span>
                </header>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left p-2 font-semibold">Month</th>
                        <th className="text-right p-2 font-semibold">EMI</th>
                        <th className="text-right p-2 font-semibold">Principal</th>
                        <th className="text-right p-2 font-semibold">Interest</th>
                        <th className="text-right p-2 font-semibold">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.slice(0, 12).map((entry) => (
                        <tr key={entry.month} className="border-b hover:bg-gray-50">
                          <td className="p-2 font-medium">{entry.month}</td>
                          <td className="p-2 text-right">{formatCurrency(entry.emiAmount)}</td>
                          <td className="p-2 text-right text-green-600">{formatCurrency(entry.principalComponent)}</td>
                          <td className="p-2 text-right text-orange-600">{formatCurrency(entry.interestComponent)}</td>
                          <td className="p-2 text-right font-medium">{formatCurrency(entry.outstandingBalance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {amortizationSchedule.length > 12 && (
                  <p className="text-center text-sm text-gray-500 mt-3">
                    Showing first 12 months. Download complete schedule above.
                  </p>
                )}
              </div>
            )}

            {/* Personal Loan Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                Personal Loan Tips & Guidelines
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Credit Score:</strong> Maintain 750+ for best interest rates and quick approvals</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Income Stability:</strong> 2+ years job/business history improves eligibility</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>EMI Rule:</strong> Keep total EMIs under 50% of monthly income</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Compare Rates:</strong> Check offers from multiple lenders before deciding</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Prepayment:</strong> Consider loans with flexible prepayment options</p>
                </div>
              </div>
            </div>

            {/* Advertisement Space */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 text-center border">
              <div className="text-gray-500 text-sm mb-2">Featured Loan Offers</div>
              <div className="text-gray-600 text-xs">Compare personal loans from top banks</div>
            </div>
          </section>
        </div>

        {/* Bottom Content - FAQ and SEO Content */}
        <section className="mt-12 space-y-8">
          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What is a personal loan EMI?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  EMI (Equated Monthly Installment) is the fixed amount you pay monthly to repay your personal loan, 
                  including both principal and interest components.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How is personal loan interest calculated?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Personal loan interest is calculated using the reducing balance method, where interest is charged 
                  only on the outstanding principal amount.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What factors affect personal loan eligibility?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Credit score, monthly income, employment history, existing debts, age, and bank relationship 
                  are key factors determining your personal loan eligibility.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I prepay my personal loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Yes, most personal loans allow prepayment. Check with your lender for any prepayment charges 
                  and minimum tenure requirements.
                </p>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Personal Loan EMI Calculator</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Our Personal Loan EMI Calculator is a comprehensive financial tool designed to help you make informed 
                borrowing decisions. Whether you need funds for debt consolidation, home renovation, medical emergencies, 
                or any personal requirements, this calculator provides accurate EMI calculations instantly.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Benefits of Using Our Calculator:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Instant and accurate EMI calculations using standard banking formulas</li>
                <li>Comprehensive eligibility analysis based on income and debt ratios</li>
                <li>Detailed amortization schedule with month-wise payment breakdown</li>
                <li>Downloadable reports for financial planning and bank submissions</li>
                <li>Mobile-responsive design for calculations on any device</li>
                <li>No registration required - completely free to use</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">How Personal Loans Work in India:</h3>
              <p className="mb-4">
                Personal loans are unsecured loans offered by banks and NBFCs without requiring collateral. 
                Interest rates typically range from 10.99% to 24% per annum, depending on your credit profile. 
                Loan amounts can range from ₹50,000 to ₹50 lakhs with tenures from 1 to 5 years.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Tips for Getting the Best Personal Loan:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Maintain a credit score above 750 for the best interest rates</li>
                <li>Compare offers from multiple lenders before finalizing</li>
                <li>Check for processing fees, prepayment charges, and other hidden costs</li>
                <li>Ensure your EMI doesn't exceed 40-50% of your monthly income</li>
                <li>Read all terms and conditions carefully before signing</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-8 w-8 text-purple-400" />
                <span className="text-xl font-semibold">mreasycalcuators</span>
              </div>
              <p className="text-gray-400 text-sm">
                India's most trusted financial calculator platform with 50+ free tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Loan Calculators</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/finance/loan-calculators/home-loan-calculator" className="block hover:text-white">Home Loan EMI</a>
                <a href="/finance/loan-calculators/car-loan-calculator" className="block hover:text-white">Car Loan EMI</a>
                <a href="/finance/loan-calculators/personal-loan-calculator" className="block hover:text-white">Personal Loan EMI</a>
                <a href="/finance/loan-calculators/education-loan-calculator" className="block hover:text-white">Education Loan EMI</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Investment Tools</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/investment/sip-calculator" className="block hover:text-white">SIP Calculator</a>
                <a href="/investment/fd-calculator" className="block hover:text-white">FD Calculator</a>
                <a href="/investment/ppf-calculator" className="block hover:text-white">PPF Calculator</a>
                <a href="/investment/nps-calculator" className="block hover:text-white">NPS Calculator</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/blog" className="block hover:text-white">Financial Blog</a>
                <a href="/guides" className="block hover:text-white">Loan Guides</a>
                <a href="/compare" className="block hover:text-white">Compare Loans</a>
                <a href="/contact" className="block hover:text-white">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 mreasycalcuators. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}