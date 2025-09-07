'use client';

import { useState, useEffect } from 'react';
import { Calculator, Car, Info, DollarSign, Percent, Calendar } from 'lucide-react';

interface CalculationResult {
    emi: number;
    totalAmount: number;
    totalInterest: number;
}

export default function CarLoanCalculatorPage() {
    const [loanAmount, setLoanAmount] = useState<string>('500000');
    const [interestRate, setInterestRate] = useState<string>('10.5');
    const [loanTenure, setLoanTenure] = useState<string>('10');
    const [results, setResults] = useState<CalculationResult>({
        emi: 0,
        totalAmount: 0,
        totalInterest: 0
    });

    const calculateEMI = (): void => {
        const P = parseFloat(loanAmount) || 0;
        const R = (parseFloat(interestRate) || 0) / 100 / 12;
        const N = (parseFloat(loanTenure) || 0) * 12;

        if (P > 0 && R > 0 && N > 0) {
            const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
            const totalAmountValue = emiValue * N;
            const totalInterestValue = totalAmountValue - P;

            setResults({
                emi: Math.round(emiValue),
                totalAmount: Math.round(totalAmountValue),
                totalInterest: Math.round(totalInterestValue)
            });
        } else {
            setResults({
                emi: 0,
                totalAmount: 0,
                totalInterest: 0
            });
        }
    };

    useEffect(() => {
        calculateEMI();
    }, [loanAmount, interestRate, loanTenure]);

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(num);
    };

    const handleInputChange = (
        setter: React.Dispatch<React.SetStateAction<string>>,
        value: string
    ): void => {
        // Remove any non-numeric characters except decimal point
        const cleanValue = value.replace(/[^0-9.]/g, '');
        setter(cleanValue);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Car className="h-16 w-16 mx-auto mb-4 opacity-90" />
                    <h1 className="text-4xl font-bold mb-4">Car Loan Calculator</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Calculate car loan EMI and total cost of your vehicle financing with our free online calculator
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
                        <li className="text-gray-900 font-medium">Car Loan Calculator</li>
                    </ol>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calculator Form */}
                    <section className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <header className="flex items-center mb-6">
                                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                                <h2 className="text-2xl font-semibold text-gray-900">Calculate Your Car Loan EMI</h2>
                            </header>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label
                                        htmlFor="loan-amount"
                                        className="flex items-center text-sm font-medium text-gray-700 mb-2"
                                    >
                                        <DollarSign className="h-4 w-4 mr-1" />
                                        Car Price (₹)
                                    </label>
                                    <input
                                        id="loan-amount"
                                        type="text"
                                        inputMode="numeric"
                                        value={loanAmount}
                                        onChange={(e) => handleInputChange(setLoanAmount, e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg transition-colors"
                                        placeholder="Enter car price"
                                        aria-describedby="loan-amount-help"
                                    />
                                    <p id="loan-amount-help" className="text-xs text-gray-500 mt-1">
                                        Enter the total price of the car you want to purchase
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
                                        Annual interest rate offered by your bank or lender
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
                                        Number of years to repay the loan
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={calculateEMI}
                                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    aria-describedby="calculate-help"
                                >
                                    Calculate EMI
                                </button>
                                <p id="calculate-help" className="text-xs text-gray-500 text-center">
                                    Click to calculate your monthly EMI and total loan cost
                                </p>
                            </form>

                            {/* Results */}
                            {results.emi > 0 && (
                                <section className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Calculation Results</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                            <div className="text-2xl font-bold text-blue-600" aria-label={`Monthly EMI ${formatNumber(results.emi)}`}>
                                                {formatNumber(results.emi)}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">Monthly EMI</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                            <div className="text-2xl font-bold text-green-600" aria-label={`Total amount payable ${formatNumber(results.totalAmount)}`}>
                                                {formatNumber(results.totalAmount)}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">Total Amount Payable</div>
                                        </div>
                                        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                                            <div className="text-2xl font-bold text-orange-600" aria-label={`Total interest payable ${formatNumber(results.totalInterest)}`}>
                                                {formatNumber(results.totalInterest)}
                                            </div>
                                            <div className="text-sm text-gray-600 mt-1">Total Interest Payable</div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                    </section>

                    {/* Information Sidebar */}
                    <aside className="space-y-6">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <header className="flex items-center mb-4">
                                <Info className="h-6 w-6 text-blue-600 mr-2" />
                                <h3 className="text-xl font-semibold text-gray-900">How Car Loan EMI is Calculated</h3>
                            </header>
                            <div className="text-sm text-gray-600 space-y-3">
                                <p>
                                    Car Loan EMI (Equated Monthly Installment) is calculated using the standard loan formula:
                                </p>
                                <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                                    EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]
                                </div>
                                <dl className="space-y-2">
                                    <div>
                                        <dt className="font-semibold inline">P</dt>
                                        <dd className="inline"> = Principal loan amount (car price - down payment)</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold inline">R</dt>
                                        <dd className="inline"> = Monthly interest rate (annual rate ÷ 12 ÷ 100)</dd>
                                    </div>
                                    <div>
                                        <dt className="font-semibold inline">N</dt>
                                        <dd className="inline"> = Number of monthly installments (tenure in years × 12)</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Car Loan Tips</h3>
                            <ul className="space-y-3 text-sm text-gray-600">
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Compare interest rates from multiple lenders before finalizing your loan</p>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Consider making a higher down payment to reduce your EMI burden</p>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Check your credit score - higher scores typically get better interest rates</p>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>Factor in additional costs like insurance, registration, and maintenance</p>
                                </li>
                            </ul>
                        </div>

                        {/* Advertisement Placeholder */}
                        <div className="bg-gray-100 rounded-lg p-8 text-center">
                            <div className="text-gray-500 text-sm">Advertisement Space</div>
                        </div>
                    </aside>
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