'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search calculators..."
          className="w-full pl-12 pr-24 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;