import { ShieldCheck, Leaf, Truck, Package, HeartHandshake } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Leaf className="w-8 h-8 text-[#1F3D2B]" />,
      title: 'Farm Fresh Produce',
      description: 'Harvested at peak ripeness and delivered fast to ensure maximum flavor and nutrition.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#1F3D2B]" />,
      title: 'Premium Quality',
      description: 'Hand-picked, sorted, and graded to ensure only the finest blueberries reach you.'
    },
    {
      icon: <Truck className="w-8 h-8 text-[#1F3D2B]" />,
      title: 'Direct from Farm',
      description: 'No middlemen. Straight from our fields in Dehradun right to your doorstep.'
    },
    {
      icon: <Package className="w-8 h-8 text-[#1F3D2B]" />,
      title: 'Hygienic Packaging',
      description: 'Food-grade ventilated punnets that preserve freshness without compromising safety.'
    },
    {
      icon: <HeartHandshake className="w-8 h-8 text-[#1F3D2B]" />,
      title: 'Trusted Local Brand',
      description: 'A proudly Indian agricultural endeavor rooted in the heart of Uttarakhand.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-[#FAFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1F3D2B] mb-4">The Junior's Farm Difference</h2>
          <p className="text-gray-600 text-lg">
            We believe in quality over quantity. Here is why our blueberries stand out from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-2xl shadow-sm border border-[#E8F5E9] transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-16 h-16 bg-[#A7D7A8]/30 rounded-2xl flex items-center justify-center mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
