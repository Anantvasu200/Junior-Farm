import { ShieldCheck, FileText, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1F3D2B] text-white pt-24 pb-8 border-t border-[#E8F5E9] relative overflow-hidden">
      
      {/* Animated Leaves Background */}
      <div className="absolute top-10 left-[10%] opacity-20" style={{ animation: 'float-slow 8s ease-in-out infinite' }}>
        <Leaf className="w-16 h-16 text-[#A7D7A8]" style={{ animation: 'sway 4s ease-in-out infinite' }} />
      </div>
      <div className="absolute bottom-20 right-[15%] opacity-10" style={{ animation: 'float-slow 12s ease-in-out infinite reverse' }}>
        <Leaf className="w-24 h-24 text-[#A7D7A8]" style={{ animation: 'sway 6s ease-in-out infinite -2s' }} />
      </div>
      <div className="absolute top-32 right-[40%] opacity-[0.15]" style={{ animation: 'float-slow 10s ease-in-out infinite 2s' }}>
        <Leaf className="w-12 h-12 text-[#A7D7A8]" style={{ animation: 'sway 5s ease-in-out infinite -1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-10 border-b border-white/10 pb-12">
          
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/WhatsApp_Image_2026-03-28_at_6.25.43_PM-removebg-preview.png" 
                alt="Junior's Farm Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-lg bg-white/10 rounded-full p-2"
              />
            </div>
            <p className="text-[#A7D7A8] text-sm md:text-base max-w-sm leading-relaxed">
              Premium hand-picked blueberries from the misty hills of Dehradun. Organically grown, hygienically packed.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-x-12 gap-y-4">
             <div className="flex flex-col gap-3">
                <span className="font-semibold text-white/50 uppercase tracking-widest text-xs mb-1">Explore</span>
                <a href="#home" className="text-white/80 hover:text-[#A7D7A8] font-medium transition-colors">Home</a>
                <a href="#products" className="text-white/80 hover:text-[#A7D7A8] font-medium transition-colors">Products</a>
             </div>
             <div className="flex flex-col gap-3">
                <span className="font-semibold text-white/50 uppercase tracking-widest text-xs mb-1">Company</span>
                <a href="#about" className="text-white/80 hover:text-[#A7D7A8] font-medium transition-colors">Our Story</a>
                <a href="#contact" className="text-white/80 hover:text-[#A7D7A8] font-medium transition-colors">Contact</a>
             </div>
          </div>
        </div>

        {/* Legal & Certifications */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 text-sm">
          
          <p className="text-white/50 order-2 lg:order-1">
             &copy; {new Date().getFullYear()} Junior's Farm. All rights reserved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 order-1 lg:order-2">
            
            {/* FSSAI Badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/15 transition-colors cursor-default">
              <div className="p-1.5 bg-[#A7D7A8]/20 rounded-full">
                 <ShieldCheck className="w-4 h-4 text-[#A7D7A8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 leading-tight">FSSAI Certified</span>
                <span className="font-mono font-medium text-white/90 leading-none mt-0.5">22626029000172</span>
              </div>
            </div>

            {/* GST Badge */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 hover:bg-white/15 transition-colors cursor-default">
              <div className="p-1.5 bg-[#A7D7A8]/20 rounded-full">
                 <FileText className="w-4 h-4 text-[#A7D7A8]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold text-white/50 leading-tight">GST Registration</span>
                <span className="font-mono font-medium text-white/90 leading-none mt-0.5">05DKGPS2264M1ZQ</span>
              </div>
            </div>

          </div>

        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
