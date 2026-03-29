const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-bg.png" 
          alt="Lush blueberry farm in Dehradun" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#1F3D2B]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto stagger-children">
        <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium tracking-wider mb-6 border border-white/30">
          Hand-picked in Dehradun, UK
        </span>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
          Fresh From Farm <br/>
          <span className="text-[#A7D7A8]">To Your Table</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Premium organic blueberries grown in the mist-kissed hills of Dehradun. 
          Experience nature's antioxidant-rich superfood, hygienically packed for your family.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#products" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#A7D7A8] text-[#1F3D2B] font-bold text-lg transition-transform hover:scale-105 hover:bg-white shadow-lg"
          >
            Shop Fresh Produce
          </a>
          <a 
            href="#about" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white font-semibold text-lg border border-white/30 transition-all hover:bg-white/20"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-pulse">
        <a href="#about" className="flex flex-col items-center text-white/70 hover:text-white transition-colors">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      
    </section>
  );
};

export default Hero;
