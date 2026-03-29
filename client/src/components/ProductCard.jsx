const ProductCard = ({ product, onOrder }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full hover:-translate-y-2">
      
      {/* Target Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F8FAFC] p-8 flex items-center justify-center">
        {product.inStock === false && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Out of Stock
            </span>
          </div>
        )}
        {product.inStock && product.harvestedThisWeek && (
          <div className="absolute top-4 left-4 z-10 animate-pulse-badge">
            <span className="bg-[#1F3D2B] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-[#A7D7A8]/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#A7D7A8] rounded-full"></span>
              Harvested this week
            </span>
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1F3D2B] transition-colors">{product.name}</h3>
            <span className="text-sm font-medium text-[#A7D7A8] bg-[#E8F5E9] px-2 py-0.5 rounded-md mt-1 inline-block">
              {product.weight}
            </span>
          </div>
          <p className="text-2xl font-bold tracking-tight text-[#1F3D2B]">₹{product.price}</p>
        </div>

        <p className="text-gray-600 text-sm mb-6 mt-4 flex-grow line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <ul className="space-y-2 mb-6 text-sm text-gray-500">
          {product.highlights.map((highlight, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#A7D7A8] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <button 
          onClick={() => onOrder(product)}
          disabled={!product.inStock}
          className={`w-full py-3.5 rounded-xl font-bold shadow-sm transition-all text-sm tracking-wide ${
            product.inStock 
              ? 'bg-[#1F3D2B] text-white hover:bg-[#A7D7A8] hover:text-[#1F3D2B] hover:shadow-md active:scale-95' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {product.inStock ? 'Order Now' : 'Currently Unavailable'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
