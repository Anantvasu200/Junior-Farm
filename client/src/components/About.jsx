import { MapPin, Sprout } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-[#1F3D2B] relative overflow-hidden">
      
      {/* Decorative leaf shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#A7D7A8]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A7D7A8]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white/5 p-2 backdrop-blur-sm border border-white/10">
               <div className="w-full h-full rounded-2xl bg-[#A7D7A8]/20 flex items-center justify-center border border-[#A7D7A8]/30 overflow-hidden">
                 <img src="/images/hero-bg.png" alt="Our farm" className="w-full h-full object-cover mix-blend-overlay opacity-60 hover:opacity-80 transition-opacity duration-700"/>
               </div>
            </div>
            {/* Info Badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-[240px]">
              <div className="bg-[#E8F5E9] p-3 rounded-full">
                <MapPin className="w-6 h-6 text-[#1F3D2B]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Located In</p>
                <p className="text-sm font-bold text-[#1F3D2B]">Dehradun, Uttarakhand</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <span className="flex items-center gap-2 text-[#A7D7A8] font-bold tracking-wider uppercase text-sm mb-4">
              <Sprout className="w-5 h-5" />
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Rooted in nature, <br/>
              grown for health.
            </h2>
            
            <div className="space-y-6 text-white/80 text-lg font-light leading-relaxed">
              <p>
                Nestled in the pristine foothills of the Himalayas, Junior's Farm was born from a simple vision: to grow the finest quality organic blueberries in India. 
              </p>
              <p>
                The cool climate and mineral-rich soils of Dehradun provide the perfect terroir for our berries, allowing them to develop a deep, complex flavor and maximum nutritional density.
              </p>
              <p>
                We blend traditional farming wisdom with modern agricultural science. No harsh pesticides, no cold-storage aging. Just pure, farm-fresh goodness delivered straight from our fields to your table.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#A7D7A8] pl-4">
                <p className="text-3xl font-bold text-white">100%</p>
                <p className="text-sm text-[#A7D7A8] font-medium mt-1">Naturally Grown</p>
              </div>
              <div className="border-l-2 border-[#A7D7A8] pl-4">
                <p className="text-3xl font-bold text-white">48hr</p>
                <p className="text-sm text-[#A7D7A8] font-medium mt-1">Farm to Home</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
