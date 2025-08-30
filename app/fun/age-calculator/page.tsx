'use client';

import { useState } from 'react';
import { Calendar, Info, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [results, setResults] = useState<any>(null);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    
    const ageInMs = today.getTime() - birth.getTime();
    const ageInDays = Math.floor(ageInMs / (1000 * 60 * 60 * 24));
    const ageInHours = Math.floor(ageInMs / (1000 * 60 * 60));
    const ageInMinutes = Math.floor(ageInMs / (1000 * 60));
    
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    const days = today.getDate() - birth.getDate();
    
    let adjustedYears = years;
    let adjustedMonths = months;
    let adjustedDays = days;
    
    if (adjustedDays < 0) {
      adjustedMonths--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      adjustedDays += lastMonth.getDate();
    }
    
    if (adjustedMonths < 0) {
      adjustedYears--;
      adjustedMonths += 12;
    }

    // Next birthday
    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setResults({
      years: adjustedYears,
      months: adjustedMonths,
      days: adjustedDays,
      totalDays: ageInDays,
      totalHours: ageInHours,
      totalMinutes: ageInMinutes,
      daysToNextBirthday,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-rose-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Age Calculator
          </h1>
          <p className="text-lg opacity-90">
            Calculate your exact age in years, months, days, and more
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
                  <Calendar className="w-5 h-5" />
                  Calculate Your Age
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="birth-date">Date of Birth</Label>
                  <Input
                    id="birth-date"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="text-lg"
                  />
                </div>
                
                <Button 
                  onClick={calculateAge} 
                  className="w-full bg-pink-600 hover:bg-pink-700 text-lg py-6"
                >
                  Calculate Age
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
                  <CardTitle>Your Age Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-pink-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-gray-600">You are</p>
                    <p className="text-2xl font-bold text-pink-600">
                      {results.years} years old
                    </p>
                    <p className="text-sm text-gray-600">
                      {results.months} months, {results.days} days
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Total Days</span>
                      <span className="font-semibold">{results.totalDays.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Total Hours</span>
                      <span className="font-semibold">{results.totalHours.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">Total Minutes</span>
                      <span className="font-semibold">{results.totalMinutes.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Days to Next Birthday</span>
                      <span className="font-semibold text-pink-600">{results.daysToNextBirthday}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Fun Facts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Did you know? The average human heart beats about 100,000 times per day. 
                  Use our age calculator to discover interesting facts about your life journey!
                </p>
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