import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react'; // ✅ Import type instead of component

interface CalculatorCardProps {
  title: string;
  description: string;
  category: string;
  slug: string;
  icon: LucideIcon; // ✅ Correct type usage
}

const CalculatorCard = ({ title, description, category, slug, icon: Icon }: CalculatorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <Button asChild className="w-full">
        <Link href={`/${category}/${slug}`}>
          Open Calculator →
        </Link>
      </Button>
    </div>
  );
};

export default CalculatorCard;
