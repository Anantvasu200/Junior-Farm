import { useState, useEffect } from 'react';
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
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [initialStep, setInitialStep] = useState(1);
  const [initialOrderId, setInitialOrderId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('orderId');
    if (orderId) {
      setInitialOrderId(orderId);
      setInitialStep(5);
      // Create a dummy placeholder product. The OrderModal will fetch the actual details in Step 5.
      setSelectedProduct({ name: 'Loading Order...', price: 0, image: '', highlights: [] });
      setIsOrderModalOpen(true);
    }
  }, []);

  const handleOrderNow = (product) => {
    setSelectedProduct(product);
    setInitialStep(1);
    setInitialOrderId(null);
    setIsOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
    setSelectedProduct(null);
    setInitialStep(1);
    setInitialOrderId(null);
    // Clear URL parameters when modal is closed to prevent reopening on reload
    if (window.location.search.includes('orderId')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#A7D7A8] selection:text-[#1F3D2B]">
      
      <Toaster position="top-center" reverseOrder={false} />
      
      <Navbar />
      
      <main>
        <Hero />
        <WhyChooseUs />
        <ProductSection onOrderNow={handleOrderNow} />
        <About />
        <Packaging />
        <Contact />
      </main>

      <Footer />

      <OrderModal 
        isOpen={isOrderModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        initialStep={initialStep}
        initialOrderId={initialOrderId}
      />

    </div>
  );
}

export default App;
