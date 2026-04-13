import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import WhyChooseUs from './components/WhyChooseUs';
import About from './components/About';
import Packaging from './components/Packaging';
import Contact from './components/Contact';
import Footer from './components/Footer';
function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#A7D7A8] selection:text-[#1F3D2B]">
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <Navbar />
      
      <main>
        <Hero />
        <WhyChooseUs />
        <ProductSection />
        <About />
        <Packaging />
        <Contact />
      </main>

      <Footer />

    </div>
  );
}

export default App;
