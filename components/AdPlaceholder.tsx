interface AdPlaceholderProps {
  size?: 'banner' | 'rectangle' | 'square' | 'leaderboard';
  className?: string;
}

const AdPlaceholder = ({ size = 'rectangle', className = '' }: AdPlaceholderProps) => {
  const sizeClasses = {
    banner: 'h-24 md:h-32',
    rectangle: 'h-64',
    square: 'h-64 max-w-64 mx-auto',
    leaderboard: 'h-24',
  };

  return (
    <div className={`bg-gray-200 rounded-lg flex items-center justify-center ${sizeClasses[size]} ${className}`}>
      <div className="text-center">
        <p className="text-gray-500 text-sm font-medium">Advertisement</p>
        <p className="text-gray-400 text-xs mt-1">Google AdSense</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;