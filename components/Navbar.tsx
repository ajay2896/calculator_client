'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: 'Finance', href: '/finance' },
    { name: 'Math', href: '/math' },
    { name: 'Health', href: '/health' },
    { name: 'Construction', href: '/construction' },
    { name: 'Shopping', href: '/shopping' },
    { name: 'Technology', href: '/technology' },
    { name: 'Fun', href: '/fun' },
  ];

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FreeCalc</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <Button variant="ghost" className="font-medium">
                TOOLS
              </Button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 font-medium">
              BLOG
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              ABOUT
            </Link>
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
              SEARCH
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
              SIGN IN
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="border-b pb-2 mb-2">
              <p className="text-gray-500 text-sm font-medium px-3 py-2">TOOLS</p>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-6 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              BLOG
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              ABOUT
            </Link>
            <div className="px-3 py-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                SIGN IN
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;