import { useState } from 'react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderModal = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1,
  });

  if (!isOpen || !product) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here is where we would normally call the /api/orders backend
    // Since backend isn't integrated yet, we mock a successful order placement
    
    toast.success(`Order placed successfully for ${formData.quantity}x ${product.name}!`, {
      style: {
        background: '#1F3D2B',
        color: '#fff',
        borderRadius: '16px',
        padding: '16px',
        maxWidth: '400px'
      },
      iconTheme: {
        primary: '#A7D7A8',
        secondary: '#1F3D2B',
      },
    });

    // Reset and close
    setFormData({ name: '', phone: '', address: '', quantity: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 animate-slide-down border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#FAFDF7] border-b border-[#E8F5E9] p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-[#1F3D2B]">Complete Order</h2>
              <p className="text-[#A7D7A8] font-semibold text-sm mt-1">{product.name}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white rounded-full transition-colors text-gray-400 hover:text-gray-700 shadow-sm border border-transparent hover:border-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          
          <div className="flex gap-4 items-center bg-[#F8FAFC] p-4 rounded-2xl border border-gray-100">
             <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
             </div>
             <div>
                <p className="font-bold text-gray-900">{product.weight}</p>
                <p className="text-sm text-gray-500">Total: <span className="text-[#1F3D2B] font-bold text-lg">₹{product.price * formData.quantity}</span></p>
             </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
              />
            </div>

            <div className="flex gap-4">
              <div className="w-2/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input 
                  type="number" 
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  max="50"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all outline-none bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Full delivery address, Dehradun..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all outline-none resize-none bg-gray-50 focus:bg-white"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-colors shadow-lg shadow-[#1F3D2B]/20 pt-4"
          >
            Confirm Order & Pay upon Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
