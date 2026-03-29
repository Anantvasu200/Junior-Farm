import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

// Temporary mock data since MongoDB is not integrated yet
const mockProducts = [
  {
    id: '1',
    name: 'Fresh Premium Blueberries',
    weight: '125g Pack',
    description: 'Perfect for snacking, adding to yogurt, or baking. Our 125g punnet is packed with juicy, antioxidant-rich berries.',
    highlights: ['Premium hand-picked', 'Hygienically packed', 'Zero chemical wash'],
    image: '/images/blueberry-125g.png',
    price: 199,
    inStock: true,
    harvestedThisWeek: true,
  },
  {
    id: '2',
    name: 'Gourmet Blueberries',
    weight: '250g Pack',
    description: 'The family pack. Freshly plucked berries that provide a natural immunity boost for your entire household.',
    highlights: ['Rich in antioxidants', 'Farm fresh guaranteed', 'Ideal for meal prep'],
    image: '/images/blueberry-250g.png',
    price: 349,
    inStock: true,
    harvestedThisWeek: true,
  }
];

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 h-full">
    <div className="aspect-square bg-gray-200 animate-shimmer"></div>
    <div className="p-6">
      <div className="h-6 w-3/4 bg-gray-200 animate-shimmer rounded mb-2"></div>
      <div className="h-4 w-1/4 bg-gray-200 animate-shimmer rounded mb-6"></div>
      <div className="h-20 w-full bg-gray-200 animate-shimmer rounded mb-6"></div>
      <div className="h-12 w-full bg-gray-200 animate-shimmer rounded-xl"></div>
    </div>
  </div>
);

const ProductSection = ({ onOrder }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    const fetchProducts = async () => {
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1500);
    };
    
    fetchProducts();
  }, []);

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <span className="text-[#A7D7A8] font-bold tracking-wider uppercase text-sm mb-2 block">Our Harvest</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F3D2B] tracking-tight">
              Fresh from the <br className="hidden md:block"/> fields to you.
            </h2>
          </div>
          <p className="text-gray-500 mt-6 md:mt-0 font-medium border-l-2 border-[#A7D7A8] pl-4">
            Grown with love, harvested with care. <br/>Limited daily stock available.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOrder={onOrder}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default ProductSection;
