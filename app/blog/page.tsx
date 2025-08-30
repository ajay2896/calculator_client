import { Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    title: 'How to Choose the Right Loan for Your Needs',
    excerpt: 'Understanding different types of loans and how to calculate which option works best for your financial situation.',
    date: '2025-01-15',
    author: 'Financial Expert',
    category: 'Finance',
    slug: 'choosing-right-loan',
  },
  {
    title: 'Understanding BMI and Health Metrics',
    excerpt: 'Learn how to interpret your BMI results and other important health calculations for better wellness.',
    date: '2025-01-12',
    author: 'Health Specialist',
    category: 'Health',
    slug: 'understanding-bmi-health-metrics',
  },
  {
    title: 'Construction Cost Estimation Guide',
    excerpt: 'A comprehensive guide to estimating construction costs and using calculators effectively for your projects.',
    date: '2025-01-10',
    author: 'Construction Expert',
    category: 'Construction',
    slug: 'construction-cost-estimation',
  },
  {
    title: 'Math Made Easy: Percentage Calculations',
    excerpt: 'Master percentage calculations with practical examples and tips for everyday use.',
    date: '2025-01-08',
    author: 'Math Teacher',
    category: 'Math',
    slug: 'math-percentage-calculations',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Calculator Blog
          </h1>
          <p className="text-xl opacity-90">
            Tips, guides, and insights about using calculators effectively
          </p>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Advertisement Space - Google AdSense</p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="outline" className="group">
                    Read More 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}