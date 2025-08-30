'use client';

import { useState } from 'react';
import { Percent, Info, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function DiscountCalculatorPage() {
  const [originalPrice, setOriginalPrice] = useState(100);
  const [discountPercent, setDiscountPercent] = useState(20);
  const [results, setResults] = useState<any>(null);

  const calculateDiscount = () => {
    const discountAmount = (originalPrice * discountPercent) / 100;
    const finalPrice = originalPrice - discountAmount;
    const savings = discountAmount;

    setResults({
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
      savings: savings.toFixed(2),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Percent className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Discount Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate discounts, sale prices, and your savings instantly
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Calculate Your Discount
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="original-price">Original Price ($)</Label>
                  <Input
                    id="original-price"
                    type="number"
                    step="0.01"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="discount-percent">Discount Percentage (%)</Label>
                  <Input
                    id="discount-percent"
                    type="number"
                    step="0.1"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <Button 
                  onClick={calculateDiscount} 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-lg py-6"
                >
                  Calculate Discount
                </Button>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <div className="mt-8">
              <AdPlaceholder size="banner" />
            </div>
          </div>

          {/* Results & Info */}
          <div className="space-y-6">
            {/* Results */}
            {results && (
              <Card>
                <CardHeader>
                  <CardTitle>Discount Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Final Price</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${results.finalPrice}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Original Price</span>
                      <span className="font-semibold">${originalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Discount Amount</span>
                      <span className="font-semibold text-green-600">${results.discountAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">You Save</span>
                      <span className="font-semibold text-green-600">${results.savings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Shopping Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Compare prices across multiple stores</li>
                  <li>• Look for additional coupon codes</li>
                  <li>• Check for cashback offers</li>
                  <li>• Consider shipping costs in total price</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ad Space */}
            <AdPlaceholder size="square" />
          </div>
        </div>
      </div>
    </div>
  );
}