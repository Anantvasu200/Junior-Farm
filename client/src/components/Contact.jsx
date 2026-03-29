import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-[#FAFDF7] border-t border-[#E8F5E9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[#A7D7A8] font-bold tracking-widest uppercase text-sm mb-4 block">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F3D2B] mb-6 tracking-tight">Let's Talk Berries</h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Have questions about bulk orders, deliveries, or farm tours? We're always here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* WhatsApp Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 text-[#25D366]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-500 mb-6 font-medium text-sm flex-grow">Fastest way to reach us</p>
            <a 
              href="https://wa.me/918076805096" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 w-full bg-[#f0f8f2] text-[#20bd5a] font-semibold border border-[#25D366]/20 rounded-xl hover:bg-[#25D366] hover:text-white transition-colors"
            >
               +91 8076805096
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#E1306C]/10 rounded-full flex items-center justify-center mb-6 text-[#E1306C]">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Instagram</h3>
            <p className="text-gray-500 mb-6 font-medium text-sm flex-grow">Follow our farm journeys</p>
            <a 
              href="https://instagram.com/juniors_farmm" 
              target="_blank" 
              rel="noreferrer"
              className="px-6 py-3 w-full bg-[#fdf0f4] text-[#E1306C] font-semibold border border-[#E1306C]/20 rounded-xl hover:bg-[#E1306C] hover:text-white transition-colors"
            >
               @juniors_farmm
            </a>
          </div>

          {/* Location Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-14 h-14 bg-[#1F3D2B]/10 rounded-full flex items-center justify-center mb-6 text-[#1F3D2B]">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                 <circle cx="12" cy="10" r="3"/>
               </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Location</h3>
            <p className="text-gray-500 mb-6 font-medium text-sm flex-grow">Dehradun</p>
            <div className="px-6 py-3 w-full bg-[#f2f5f3] text-[#1F3D2B] font-semibold border border-[#1F3D2B]/10 rounded-xl cursor-default">
               Uttarakhand, India
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
