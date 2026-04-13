import { CheckCircle2 } from 'lucide-react';

const Packaging = () => {
  const specs = [
    'Food-grade transparent PET punnets',
    'Engineered ventilation for maximum freshness',
    'Tamper-evident sealing',
    'Clear, minimal FSSAI compliant labeling',
    '100% recyclable materials'
  ];

  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FAFDF7] rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 border border-[#E8F5E9]">
          
          <div className="lg:w-1/2 relative z-10 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1F3D2B] mb-6">
              Packaged to protect <br/> what matters.
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Blueberries are delicate. Our bespoke punnet packaging ensures they survive the journey from our farm to your fridge without bruising, while allowing them to breathe perfectly.
            </p>
            
            <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
              {specs.map((spec, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#A7D7A8] shrink-0 fill-[#A7D7A8]/20" />
                  <span className="text-gray-700 font-medium">{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 relative z-10">
            <div className="relative aspect-square max-w-md mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#A7D7A8]/30 to-transparent rounded-full blur-3xl mix-blend-multiply"></div>
              <img 
                src="/images/blueberry-250g-nolabel.png" 
                alt="Junior's Farm Packaging" 
                className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-700 hover:-translate-y-2"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-transform duration-700 group-hover:-translate-y-2">
                <img 
                  src="/WhatsApp_Image_2026-03-28_at_6.25.43_PM-removebg-preview.png" 
                  alt="Junior's Farm Logo" 
                  className="w-40 h-40 object-contain drop-shadow-lg opacity-95"
                />
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default Packaging;
