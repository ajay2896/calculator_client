import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react"; // ✅ use `type` import for clarity

interface CalculatorCardProps {
  title: string;
  description: string;
  category: string;
  slug: string;
  icon: LucideIcon;
}

const CalculatorCard = ({
  title,
  description,
  category,
  slug,
  icon: Icon,
}: CalculatorCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200">
      {/* Icon */}
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {description}
      </p>

      {/* CTA Button */}
      <Button asChild className="w-full">
        <Link href={`/${category}/${slug}`} prefetch>
          Open Calculator →
        </Link>
      </Button>
    </div>
  );
};

export default CalculatorCard;
