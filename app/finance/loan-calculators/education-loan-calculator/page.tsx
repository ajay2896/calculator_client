'use client';

import { useState, useEffect } from 'react';
import { Calculator, GraduationCap, Info, Download, TrendingUp, PieChart, Globe, BookOpen, Clock, CreditCard, Percent, Calendar, DollarSign, MapPin } from 'lucide-react';

interface EducationLoanResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
  monthlyRate: number;
  loanTenureMonths: number;
  moratoriumInterest: number;
  totalAmountWithMoratorium: number;
}

interface EligibilityResult {
  maxLoanAmount: number;
  recommendedEmi: number;
  isEligible: boolean;
  incomeMultiplier: number;
  collateralRequired: boolean;
}

interface MoratoriumDetails {
  period: number;
  interestDuringMoratorium: number;
  totalInterestCapitalized: number;
  newPrincipal: number;
}

export default function EducationLoanCalculatorPage() {
  // Form state
  const [loanAmount, setLoanAmount] = useState<string>('1500000');
  const [interestRate, setInterestRate] = useState<string>('10.5');
  const [loanTenure, setLoanTenure] = useState<string>('10');
  const [moratoriumPeriod, setMoratoriumPeriod] = useState<string>('2');
  const [annualIncome, setAnnualIncome] = useState<string>('800000');
  const [studyDestination, setStudyDestination] = useState<string>('india');
  const [courseType, setCourseType] = useState<string>('engineering');
  
  // Results state
  const [results, setResults] = useState<EducationLoanResult | null>(null);
  const [eligibility, setEligibility] = useState<EligibilityResult | null>(null);
  const [moratoriumDetails, setMoratoriumDetails] = useState<MoratoriumDetails | null>(null);

  // SEO and Analytics tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: 'Education Loan EMI Calculator',
        page_location: window.location.href,
      });
    }
  }, []);

  const calculateEducationLoan = (): void => {
    const P = parseFloat(loanAmount) || 0;
    const annualRate = parseFloat(interestRate) || 0;
    const tenure = parseFloat(loanTenure) || 0;
    const moratorium = parseFloat(moratoriumPeriod) || 0;
    const income = parseFloat(annualIncome) || 0;

    if (P > 0 && annualRate > 0 && tenure > 0) {
      const R = annualRate / 12 / 100; // Monthly interest rate
      const moratoriumMonths = moratorium * 12;
      const repaymentMonths = tenure * 12;

      // Calculate interest during moratorium period
      const moratoriumInterest = moratorium > 0 ? P * (annualRate / 100) * moratorium : 0;
      const newPrincipal = P + moratoriumInterest; // Principal after moratorium (simple interest)

      // Calculate EMI on the new principal for repayment period
      let emi = 0;
      let totalAmount = 0;
      let totalInterest = 0;

      if (repaymentMonths > 0) {
        emi = (newPrincipal * R * Math.pow(1 + R, repaymentMonths)) / (Math.pow(1 + R, repaymentMonths) - 1);
        totalAmount = emi * repaymentMonths;
        totalInterest = totalAmount - newPrincipal;
      }

      const totalAmountWithMoratorium = totalAmount + moratoriumInterest;

      setResults({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principalAmount: P,
        monthlyRate: R,
        loanTenureMonths: repaymentMonths,
        moratoriumInterest: Math.round(moratoriumInterest),
        totalAmountWithMoratorium: Math.round(totalAmountWithMoratorium)
      });

      setMoratoriumDetails({
        period: moratorium,
        interestDuringMoratorium: Math.round(moratoriumInterest),
        totalInterestCapitalized: Math.round(moratoriumInterest),
        newPrincipal: Math.round(newPrincipal)
      });

      // Calculate eligibility based on study destination and course type
      if (income > 0) {
        const incomeMultiplier = getIncomeMultiplier(studyDestination, courseType);
        const maxLoanAmountValue = income * incomeMultiplier;
        const maxAffordableEmi = (income / 12) * 0.40; // 40% of monthly income
        const collateralRequired = P > (studyDestination === 'abroad' ? 2000000 : 750000);
        
        setEligibility({
          maxLoanAmount: Math.round(maxLoanAmountValue),
          recommendedEmi: Math.round(maxAffordableEmi),
          isEligible: emi <= maxAffordableEmi && P <= maxLoanAmountValue,
          incomeMultiplier,
          collateralRequired
        });
      }
    } else {
      setResults(null);
      setEligibility(null);
      setMoratoriumDetails(null);
    }
  };

  const getIncomeMultiplier = (destination: string, course: string): number => {
    let baseMultiplier = destination === 'abroad' ? 6 : 4;
    
    // Adjust based on course type
    const courseMultipliers: { [key: string]: number } = {
      'engineering': 1.2,
      'mba': 1.5,
      'medical': 1.3,
      'law': 1.0,
      'arts': 0.8,
      'science': 1.0,
      'management': 1.3,
      'ca': 1.1,
      'other': 1.0
    };

    return baseMultiplier * (courseMultipliers[course] || 1.0);
  };

  useEffect(() => {
    calculateEducationLoan();
  }, [loanAmount, interestRate, loanTenure, moratoriumPeriod, annualIncome, studyDestination, courseType]);

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

  const courseOptions = [
    { value: 'engineering', label: 'Engineering/Technology' },
    { value: 'mba', label: 'MBA/Management' },
    { value: 'medical', label: 'Medical/Healthcare' },
    { value: 'law', label: 'Law' },
    { value: 'ca', label: 'CA/Finance' },
    { value: 'science', label: 'Science/Research' },
    { value: 'arts', label: 'Arts/Humanities' },
    { value: 'other', label: 'Other Courses' }
  ];

  const destinationOptions = [
    { value: 'india', label: 'India' },
    { value: 'abroad', label: 'Study Abroad' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["WebApplication", "SoftwareApplication", "EducationalOrganization"],
            "name": "Education Loan EMI Calculator",
            "description": "Calculate education loan EMI for higher studies with moratorium period support. Free calculator for study abroad and India courses.",
            "url": "https://mreasycalcuators.com/finance/loan-calculators/education-loan-calculator",
            "applicationCategory": "EducationApplication",
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
              "Education Loan EMI Calculation",
              "Moratorium Period Support",
              "Study Abroad Loan Calculator",
              "Course-specific Eligibility",
              "Interest Capitalization Calculation"
            ],
            "educationalUse": "Financial Planning for Higher Education",
            "audience": {
              "@type": "Audience",
              "audienceType": "Students, Parents, Education Planners"
            }
          })
        }}
      />


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="h-16 w-16 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Education Loan Calculator 2025
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
            Calculate education loan EMI for higher studies in India & abroad. 
            Includes moratorium period, course-specific rates & study destinations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ Study Abroad Support</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ Moratorium Period</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ 50+ Banks</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ All Courses</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <nav className="bg-white border-b" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="text-sm text-gray-600 flex items-center space-x-2">
            <li><a href="/" className="hover:text-emerald-600 transition-colors">Home</a></li>
            <li>•</li>
            <li><a href="/finance" className="hover:text-emerald-600 transition-colors">Finance</a></li>
            <li>•</li>
            <li><a href="/finance/loan-calculators" className="hover:text-emerald-600 transition-colors">Loan Calculators</a></li>
            <li>•</li>
            <li className="text-gray-900 font-medium">Education Loan Calculator</li>
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
                <Calculator className="h-6 w-6 text-emerald-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Education Loan Calculator</h2>
              </header>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
                      Study Destination
                    </label>
                    <select
                      value={studyDestination}
                      onChange={(e) => setStudyDestination(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                    >
                      {destinationOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                      <BookOpen className="h-4 w-4 mr-1 text-emerald-600" />
                      Course Type
                    </label>
                    <select
                      value={courseType}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                    >
                      {courseOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="loan-amount"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <DollarSign className="h-4 w-4 mr-1 text-emerald-600" />
                      Total Education Cost (₹)
                    </label>
                    <input
                      id="loan-amount"
                      type="text"
                      inputMode="numeric"
                      value={loanAmount}
                      onChange={(e) => handleInputChange(setLoanAmount, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                      placeholder="Enter total cost"
                      aria-describedby="loan-amount-help"
                    />
                    <p id="loan-amount-help" className="text-xs text-gray-500 mt-1">
                      Tuition + Living + Travel expenses
                    </p>
                  </div>

                  <div>
                    <label 
                      htmlFor="interest-rate"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <Percent className="h-4 w-4 mr-1 text-emerald-600" />
                      Interest Rate (% p.a.)
                    </label>
                    <input
                      id="interest-rate"
                      type="text"
                      inputMode="decimal"
                      value={interestRate}
                      onChange={(e) => handleInputChange(setInterestRate, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                      placeholder="Enter interest rate"
                      aria-describedby="interest-rate-help"
                    />
                    <p id="interest-rate-help" className="text-xs text-gray-500 mt-1">
                      India: 8.5-12% | Abroad: 10.5-15%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="loan-tenure"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <Calendar className="h-4 w-4 mr-1 text-emerald-600" />
                      Repayment Tenure (Years)
                    </label>
                    <input
                      id="loan-tenure"
                      type="text"
                      inputMode="numeric"
                      value={loanTenure}
                      onChange={(e) => handleInputChange(setLoanTenure, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                      placeholder="Enter tenure"
                      aria-describedby="loan-tenure-help"
                    />
                    <p id="loan-tenure-help" className="text-xs text-gray-500 mt-1">
                      Range: 5 - 15 years
                    </p>
                  </div>

                  <div>
                    <label 
                      htmlFor="moratorium-period"
                      className="flex items-center text-sm font-medium text-gray-700 mb-2"
                    >
                      <Clock className="h-4 w-4 mr-1 text-emerald-600" />
                      Moratorium Period (Years)
                    </label>
                    <input
                      id="moratorium-period"
                      type="text"
                      inputMode="numeric"
                      value={moratoriumPeriod}
                      onChange={(e) => handleInputChange(setMoratoriumPeriod, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                      placeholder="Enter moratorium period"
                      aria-describedby="moratorium-help"
                    />
                    <p id="moratorium-help" className="text-xs text-gray-500 mt-1">
                      Course duration + 6 months
                    </p>
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="annual-income"
                    className="flex items-center text-sm font-medium text-gray-700 mb-2"
                  >
                    <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                    Annual Family Income (₹)
                  </label>
                  <input
                    id="annual-income"
                    type="text"
                    inputMode="numeric"
                    value={annualIncome}
                    onChange={(e) => handleInputChange(setAnnualIncome, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg transition-all"
                    placeholder="Enter annual income"
                    aria-describedby="annual-income-help"
                  />
                  <p id="annual-income-help" className="text-xs text-gray-500 mt-1">
                    Combined income of co-applicants for eligibility
                  </p>
                </div>

                <button
                  type="button"
                  onClick={calculateEducationLoan}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Calculate Education Loan EMI
                </button>
              </form>
            </div>

            {/* Information Cards */}
            <div className="mt-6 space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Info className="h-5 w-5 text-blue-600 mr-2" />
                  Education Loan with Moratorium
                </h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <p>Education loans offer moratorium period during course duration where you pay only interest or no payment at all.</p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-medium text-blue-900">Moratorium Benefits:</p>
                    <ul className="mt-2 space-y-1 text-xs list-disc list-inside">
                      <li>No EMI during study period</li>
                      <li>Focus on studies without financial stress</li>
                      <li>Start repayment after getting job</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-5 w-5 text-green-600 mr-2" />
                  Study Abroad vs India
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Study in India</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Up to ₹10 lakhs without collateral</li>
                      <li>• 8.5-12% interest rates</li>
                      <li>• Lower living costs</li>
                      <li>• Faster processing</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Study Abroad</h4>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li>• Up to ₹1.5 crore funding</li>
                      <li>• 10.5-15% interest rates</li>
                      <li>• Higher loan amounts</li>
                      <li>• Global career opportunities</li>
                    </ul>
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
                <header className="flex items-center mb-4">
                  <PieChart className="h-6 w-6 text-emerald-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Education Loan Results</h3>
                </header>

                {/* Main EMI Display */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-6 border-2 border-emerald-100">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {formatCurrency(results.emi)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">Monthly EMI (After Moratorium)</div>
                  </div>
                </div>

                {/* Moratorium Details */}
                {moratoriumDetails && moratoriumDetails.period > 0 && (
                  <div className="bg-orange-50 rounded-lg p-4 mb-6 border border-orange-200">
                    <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Moratorium Period Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Period:</span>
                        <div className="font-bold text-orange-700">{moratoriumDetails.period} years</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Interest During Moratorium:</span>
                        <div className="font-bold text-orange-700">{formatCurrency(moratoriumDetails.interestDuringMoratorium)}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Breakdown Cards */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                    <div className="text-lg font-bold text-blue-600">
                      {formatCurrency(results.principalAmount)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Original Loan Amount</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4 text-center border border-red-200">
                    <div className="text-lg font-bold text-red-600">
                      {formatCurrency(results.totalInterest + results.moratoriumInterest)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Total Interest</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Amount Payable:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(results.totalAmountWithMoratorium)}</span>
                  </div>
                  {moratoriumDetails && moratoriumDetails.period > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Amount After Moratorium:</span>
                      <span className="font-bold text-orange-600">{formatCurrency(moratoriumDetails.newPrincipal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Repayment Tenure:</span>
                    <span className="font-bold text-gray-900">{results.loanTenureMonths} months</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Monthly Interest Rate:</span>
                    <span className="font-bold text-gray-900">{(results.monthlyRate * 100).toFixed(3)}%</span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => {}}
                  className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Loan Statement</span>
                </button>
              </div>
            )}

            {/* Eligibility Results */}
            {eligibility && (
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <header className="flex items-center mb-4">
                  <GraduationCap className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">Loan Eligibility Analysis</h3>
                </header>

                <div className="space-y-4">
                  {/* Eligibility Status */}
                  <div className={`text-center p-4 rounded-lg border-2 ${
                    eligibility.isEligible 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-orange-200 bg-orange-50'
                  }`}>
                    <div className={`text-2xl font-bold mb-2 ${
                      eligibility.isEligible ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {eligibility.isEligible ? 'ELIGIBLE' : 'REVIEW REQUIRED'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Based on income and course type
                    </div>
                  </div>

                  {/* Eligibility Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Maximum Loan Amount:</span>
                      <span className="font-bold text-green-600">{formatCurrency(eligibility.maxLoanAmount)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Affordable EMI (40% rule):</span>
                      <span className="font-bold text-blue-600">{formatCurrency(eligibility.recommendedEmi)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Income Multiplier:</span>
                      <span className="font-bold text-purple-600">{eligibility.incomeMultiplier}x</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-600">Collateral Required:</span>
                      <span className={`font-bold ${eligibility.collateralRequired ? 'text-orange-600' : 'text-green-600'}`}>
                        {eligibility.collateralRequired ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>

                  {/* Course & Destination Info */}
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Study Destination:</span>
                        <div className="font-bold text-emerald-700 capitalize">{studyDestination}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Course Type:</span>
                        <div className="font-bold text-emerald-700 capitalize">
                          {courseOptions.find(c => c.value === courseType)?.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education Loan Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 text-emerald-600 mr-2" />
                Education Loan Tips
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Apply Early:</strong> Start loan application 6 months before course begins</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Co-applicant:</strong> Include high-income co-applicant for better eligibility</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Documentation:</strong> Keep admission letter, fee structure, and income proofs ready</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Tax Benefits:</strong> Interest paid is tax deductible under Section 80E</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Repayment:</strong> Consider prepayment after getting job to save interest</p>
                </div>
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="bg-white rounded-xl shadow-lg p-6 border">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 text-blue-600 mr-2" />
                Popular Study Destinations
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-700">Top Countries</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>🇺🇸 USA - $50-80k/year</li>
                    <li>🇬🇧 UK - £15-35k/year</li>
                    <li>🇨🇦 Canada - C$15-50k/year</li>
                    <li>🇦🇺 Australia - A$20-45k/year</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-green-700">India Options</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>🏛️ IITs/IIMs - ₹2-25L</li>
                    <li>🏥 Medical - ₹10-80L</li>
                    <li>⚖️ Law - ₹3-15L</li>
                    <li>💼 MBA - ₹5-25L</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Advertisement Space */}
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl p-6 text-center border">
              <div className="text-gray-500 text-sm mb-2">Education Loan Offers</div>
              <div className="text-gray-600 text-xs">Compare rates from top banks for your course</div>
            </div>
          </section>
        </div>

        {/* Bottom Content - FAQ and SEO Content */}
        <section className="mt-12 space-y-8">
          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Loan FAQ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What is moratorium period in education loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Moratorium period is the time during which you don't need to pay EMI. It typically covers 
                  course duration plus 6 months. Interest may accrue and get added to principal.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">How much education loan can I get?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For India studies: Up to ₹10 lakhs without collateral, ₹20 lakhs with collateral. 
                  For abroad: Up to ₹1.5 crores based on income and course.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Is collateral required for education loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For loans up to ₹7.5 lakhs (India) or ₹20 lakhs (abroad), no collateral required. 
                  Higher amounts may need property or FD as security.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Can I get tax benefits on education loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Yes, interest paid on education loan is eligible for tax deduction under Section 80E 
                  with no upper limit for 8 years or until loan is repaid.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">What courses are eligible for education loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Most professional courses like Engineering, Medical, MBA, CA, Law, and recognized 
                  diploma/degree courses from approved institutions are eligible.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">When should I start applying for education loan?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Apply 6 months before course starts. After admission confirmation, loan processing 
                  takes 2-4 weeks for approval and disbursement.
                </p>
              </div>
            </div>
          </div>

          {/* SEO Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 border">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Education Loan Calculator</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Our Education Loan Calculator is specifically designed for students and parents planning higher education 
                financing. Whether you're pursuing engineering, medical, MBA, or planning to study abroad, this calculator 
                helps you understand the true cost of educational financing with moratorium period considerations.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Key Features of Our Education Loan Calculator:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Accurate EMI calculations with moratorium period support</li>
                <li>Course-specific loan eligibility based on career prospects</li>
                <li>Study destination analysis (India vs Abroad)</li>
                <li>Interest capitalization during moratorium calculation</li>
                <li>Family income-based loan amount estimation</li>
                <li>Collateral requirement assessment</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Education Loan Types in India:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-emerald-700 mb-2">Domestic Education Loans</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Up to ₹10 lakhs without collateral</li>
                    <li>• Interest rates: 8.5% - 12%</li>
                    <li>• Faster processing and approval</li>
                    <li>• Lower documentation requirements</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Study Abroad Loans</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Up to ₹1.5 crores funding</li>
                    <li>• Interest rates: 10.5% - 15%</li>
                    <li>• Higher loan-to-income ratios</li>
                    <li>• Cover tuition + living expenses</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Understanding Moratorium Period:</h3>
              <p className="mb-4">
                The moratorium period is a unique feature of education loans where you don't pay EMIs during your course. 
                However, interest continues to accrue and gets added to the principal amount. This calculator helps you 
                understand the impact of moratorium on your total loan cost and post-graduation EMI burden.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-3">Tips for Education Loan Planning:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Research and compare interest rates from multiple banks and NBFCs</li>
                <li>Consider the total cost including living expenses, not just tuition fees</li>
                <li>Evaluate career prospects and expected salary post-graduation</li>
                <li>Understand moratorium terms and interest capitalization</li>
                <li>Keep all academic documents and income proofs ready</li>
                <li>Apply early to avoid last-minute rush and delays</li>
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
                <Calculator className="h-8 w-8 text-emerald-400" />
                <span className="text-xl font-semibold">mreasycalcuators</span>
              </div>
              <p className="text-gray-400 text-sm">
                India's most trusted education loan calculator with study abroad support.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Education Loans</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/education-loan-india" className="block hover:text-white">Education Loan India</a>
                <a href="/study-abroad-loans" className="block hover:text-white">Study Abroad Loans</a>
                <a href="/mba-loan-calculator" className="block hover:text-white">MBA Loan Calculator</a>
                <a href="/engineering-loan-calculator" className="block hover:text-white">Engineering Loan</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Study Destinations</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/usa-education-loan" className="block hover:text-white">USA Education Loan</a>
                <a href="/uk-education-loan" className="block hover:text-white">UK Education Loan</a>
                <a href="/canada-education-loan" className="block hover:text-white">Canada Education Loan</a>
                <a href="/australia-education-loan" className="block hover:text-white">Australia Education Loan</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <a href="/education-loan-guide" className="block hover:text-white">Education Loan Guide</a>
                <a href="/scholarship-finder" className="block hover:text-white">Scholarship Finder</a>
                <a href="/university-finder" className="block hover:text-white">University Finder</a>
                <a href="/contact" className="block hover:text-white">Contact Us</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 mreasycalcuators Education Finance. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}