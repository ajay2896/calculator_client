import CalculatorCard from '@/components/CalculatorCard';
import { Smartphone, Wifi, HardDrive, Monitor, Cpu, Database } from 'lucide-react';

const technologyCalculators = [
  {
    title: 'Data Transfer Calculator',
    description: 'Calculate file transfer times and bandwidth requirements',
    category: 'technology',
    slug: 'data-transfer-calculator',
    icon: HardDrive,
  },
  {
    title: 'Screen Resolution Calculator',
    description: 'Calculate pixel density, aspect ratios, and screen dimensions',
    category: 'technology',
    slug: 'screen-resolution-calculator',
    icon: Monitor,
  },
  {
    title: 'Network Speed Calculator',
    description: 'Calculate download/upload times and network performance metrics',
    category: 'technology',
    slug: 'network-speed-calculator',
    icon: Wifi,
  },
  {
    title: 'Storage Calculator',
    description: 'Calculate storage capacity, file sizes, and disk space requirements',
    category: 'technology',
    slug: 'storage-calculator',
    icon: Database,
  },
  {
    title: 'CPU Performance Calculator',
    description: 'Calculate CPU performance metrics and benchmark comparisons',
    category: 'technology',
    slug: 'cpu-calculator',
    icon: Cpu,
  },
  {
    title: 'Mobile Data Calculator',
    description: 'Calculate mobile data usage and plan requirements',
    category: 'technology',
    slug: 'mobile-data-calculator',
    icon: Smartphone,
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Smartphone className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Technology Calculators
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Calculate data transfer speeds, storage requirements, network performance, 
            and other technology-related metrics.
          </p>
        </div>
      </section>

      {/* Ad Space */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">Advertisement Space - Google AdSense</p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologyCalculators.map((calculator, index) => (
              <CalculatorCard
                key={index}
                title={calculator.title}
                description={calculator.description}
                category={calculator.category}
                slug={calculator.slug}
                icon={calculator.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}