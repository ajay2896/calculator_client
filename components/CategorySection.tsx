import Link from "next/link";
import type { LucideIcon } from "lucide-react"; // ✅ import type, not component

interface Category {
  id: string;
  name: string;
  icon: LucideIcon; // ✅ now correct
  description: string;
  color: string;
  count: number;
}

interface CategorySectionProps {
  category: Category;
}

const CategorySection = ({ category }: CategorySectionProps) => {
  const IconComponent = category.icon;

  return (
    <Link href={`/${category.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group-hover:border-blue-200">
        <div
          className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {category.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {category.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-medium text-sm group-hover:underline">
            View Tools →
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium">
            {category.count} tools
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategorySection;
