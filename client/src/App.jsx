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
import OrderModal from './components/OrderModal';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenOrderModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300); // Wait for transition
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#A7D7A8] selection:text-[#1F3D2B]">
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <Navbar />
      
      <main>
        <Hero />
        <WhyChooseUs />
        <ProductSection onOrder={handleOpenOrderModal} />
        <About />
        <Packaging />
        <Contact />
      </main>

      <Footer />

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        product={selectedProduct} 
      />

    </div>
  );
}

export default App;
