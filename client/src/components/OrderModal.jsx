import { useState, useEffect } from 'react';
import { X, ChevronLeft, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 
  'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 
  'Lakshadweep', 'Puducherry'
];

const OrderModal = ({ isOpen, onClose, product, initialStep = 1, initialOrderId = null }) => {
  const [step, setStep] = useState(initialStep);
  const [quantity, setQuantity] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [orderDbId, setOrderDbId] = useState(initialOrderId || '');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  // Form Inputs
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [deliveryData, setDeliveryData] = useState({
    address: '',
    landmark: '',
    city: '',
    state: 'Uttarakhand', // Default state
    pincode: '',
  });

  // Sync step and orderId if initial overrides change (e.g. from page reload)
  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      if (initialOrderId) {
        setOrderDbId(initialOrderId);
      }
    }
  }, [isOpen, initialStep, initialOrderId]);

  // Step 5: Fetch order details
  useEffect(() => {
    if (step === 5 && orderDbId) {
      setIsLoadingOrder(true);
      
      const fetchOrder = async () => {
        try {
          const res = await fetch(`${BACKEND_URL}/api/orders/${orderDbId}`);
          if (!res.ok) throw new Error('Order not found');
          const data = await res.json();
          setOrderData(data);
          setOrderId(data.orderId);
          setIsLoadingOrder(false);
        } catch (error) {
          console.error('Error loading order:', error);
          toast.error('Could not fetch order details');
          setIsLoadingOrder(false);
        }
      };

      fetchOrder();
    }
  }, [step, orderDbId]);

  if (!isOpen || !product) return null;

  const total = product.price * quantity;

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  // Step 2 validation
  const validateContact = () => {
    if (!contactData.name.trim()) return toast.error('Full Name is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) return toast.error('Please enter a valid email');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(contactData.phone)) return toast.error('Please enter a valid 10-digit Indian phone number');
    handleNextStep();
  };

  // Step 3 validation & draft checkout creation
  const validateDeliveryAndCheckout = async () => {
    if (!deliveryData.address.trim()) return toast.error('Address is required');
    if (!deliveryData.city.trim()) return toast.error('City is required');
    if (!deliveryData.state) return toast.error('State is required');
    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(deliveryData.pincode)) return toast.error('Please enter a valid 6-digit Pincode');

    // Create Draft Order in backend
    try {
      setIsProcessing(true);
      const orderPayload = {
        product: {
          name: product.name,
          sku: `JF-BLUE-${product.weight.replace(/[^0-9]/g, '')}`,
          pricePerUnit: product.price,
          quantity: quantity,
        },
        contact: {
          ...contactData,
          phone: `+91${contactData.phone}` // Format phone with +91
        },
        delivery: deliveryData
      };

      const response = await fetch(`${BACKEND_URL}/api/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to create order draft');
      }

      const data = await response.json();
      setOrderDbId(data.order._id);
      setOrderId(data.order.orderId);
      
      // Advance to Payment step
      handleNextStep();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Error creating checkout draft');
    } finally {
      setIsProcessing(false);
    }
  };

  // Razorpay Checkout execution
  const handleRazorpayPayment = async () => {
    if (!orderDbId) {
      return toast.error('Checkout context missing. Please try again.');
    }

    setIsProcessing(true);

    try {
      // 1. Request Razorpay Order details from backend
      const response = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderDbId, amount: total })
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve checkout order details from server.');
      }

      const paymentData = await response.json();
      const { razorpayOrderId, amount, currency, keyId } = paymentData;

      // 2. Configure Razorpay checkout options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || keyId,
        amount,
        currency,
        name: "Junior's Farm",
        description: 'Premium organic blueberries grown in Dehradun',
        image: '/WhatsApp_Image_2026-03-28_at_6.25.43_PM-removebg-preview.png',
        order_id: razorpayOrderId,
        prefill: {
          name: contactData.name,
          email: contactData.email,
          contact: `+91${contactData.phone}`
        },
        theme: { 
          color: '#1F3D2B' // Brand forest green
        },
        handler: async (response) => {
          // 3. Verify signature on backend
          try {
            setIsProcessing(true);
            const verifyResponse = await fetch(`${BACKEND_URL}/api/payments/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderDbId
              })
            });

            const verifyResult = await verifyResponse.json();
            if (verifyResult.success) {
              toast.success('Payment verified successfully!');
              setStep(5); // Move to success timeline
            } else {
              toast.error(verifyResult.message || 'Payment signature verification failed.');
            }
          } catch (err) {
            console.error('Error verifying payment:', err);
            toast.error('Could not verify payment with backend.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            setIsProcessing(false);
          }
        }
      };

      // 4. Open Razorpay iframe popup
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        throw new Error('Razorpay SDK failed to load. Please refresh the page.');
      }

    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error launching Razorpay.');
      setIsProcessing(false);
    }
  };

  // Timeline stage mapping
  const stages = [
    { key: 'pending', label: 'Order Placed' },
    { key: 'paid', label: 'Payment Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'out_for_delivery', label: 'Out for Delivery' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStageIndex = (status) => {
    const map = {
      'pending': 0,
      'paid': 1,
      'processing': 2,
      'shipped': 3,
      'out_for_delivery': 4,
      'delivered': 5
    };
    return map[status] ?? 0;
  };

  const currentStageIndex = orderData ? getStageIndex(orderData.orderStatus) : 0;

  // Step sliding transitions
  const stepVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1F3D2B]/50 backdrop-blur-md animate-fade-in"
        onClick={step === 5 || isProcessing ? undefined : onClose}
      ></div>

      {/* Modal Box */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl relative z-10 border border-[#E8F5E9] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="bg-[#FAFDF7] border-b border-[#E8F5E9] px-6 py-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            {step > 1 && step < 5 && !isProcessing && (
              <button 
                onClick={handlePrevStep} 
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-500 mr-1"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#1F3D2B]">
                {step === 5 ? 'Order Placed!' : 'Fresh Checkout'}
              </h2>
              {step < 5 && <p className="text-xs text-[#A7D7A8] font-bold uppercase tracking-wider">Step {step} of 4</p>}
            </div>
          </div>
          {step < 5 && !isProcessing && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-700 shadow-sm border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stepper Progress Bar */}
        {step < 5 && (
          <div className="w-full h-1.5 bg-[#E8F5E9] flex">
            <div 
              className="h-full bg-[#1F3D2B] transition-all duration-500" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial="enter"
              animate="center"
              exit="exit"
              variants={stepVariants}
              className="space-y-6"
            >
              {/* STEP 1: QUANTITY SELECTOR */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex gap-4 items-center bg-[#FAFDF7] p-5 rounded-3xl border border-[#E8F5E9]">
                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shrink-0 border border-gray-100 flex items-center justify-center p-2">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1F3D2B] text-lg">{product.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">Weight: <span className="font-bold text-gray-900">{product.weight}</span></p>
                      <p className="text-sm text-gray-500">Price per unit: <span className="font-semibold text-[#1F3D2B]">₹{product.price}</span></p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-5 bg-gray-50 rounded-3xl border border-gray-100">
                    <span className="font-bold text-gray-700">Choose Quantity</span>
                    <div className="flex items-center gap-4">
                      <button 
                        type="button"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 rounded-full bg-white text-[#1F3D2B] border border-gray-200 flex items-center justify-center font-bold text-xl hover:bg-[#E8F5E9] transition-colors shadow-sm"
                      >
                        -
                      </button>
                      <span className="font-bold text-xl w-6 text-center">{quantity}</span>
                      <button 
                        type="button"
                        onClick={() => setQuantity(prev => Math.min(20, prev + 1))}
                        className="w-10 h-10 rounded-full bg-white text-[#1F3D2B] border border-gray-200 flex items-center justify-center font-bold text-xl hover:bg-[#E8F5E9] transition-colors shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 px-1">
                    <span className="text-gray-500 font-medium">Grand Total</span>
                    <span className="text-3xl font-extrabold text-[#1F3D2B]">₹{total}/-</span>
                  </div>

                  <button
                    onClick={handleNextStep}
                    className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-2xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-all duration-300 shadow-lg shadow-[#1F3D2B]/20 cursor-pointer"
                  >
                    Continue to Contact Info
                  </button>
                </div>
              )}

              {/* STEP 2: CONTACT INFORMATION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={contactData.name}
                        onChange={(e) => setContactData(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        value={contactData.email}
                        onChange={(e) => setContactData(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">+91</span>
                        <input 
                          type="tel" 
                          required
                          placeholder="9876543210"
                          value={contactData.phone}
                          onChange={(e) => setContactData(p => ({ ...p, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                          className="w-full pl-14 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">10-digit mobile number for delivery confirmation.</p>
                    </div>
                  </div>

                  <button
                    onClick={validateContact}
                    className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-2xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-all duration-300 shadow-lg shadow-[#1F3D2B]/20 cursor-pointer"
                  >
                    Continue to Delivery Address
                  </button>
                </div>
              )}

              {/* STEP 3: DELIVERY ADDRESS */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
                      <textarea 
                        required
                        rows="2"
                        placeholder="House/Flat No, Street, Area..."
                        value={deliveryData.address}
                        onChange={(e) => setDeliveryData(p => ({ ...p, address: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all resize-none bg-gray-50 focus:bg-white"
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Landmark (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Near Big Temple"
                        value={deliveryData.landmark}
                        onChange={(e) => setDeliveryData(p => ({ ...p, landmark: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-1/2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Dehradun"
                          value={deliveryData.city}
                          onChange={(e) => setDeliveryData(p => ({ ...p, city: e.target.value }))}
                          className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode</label>
                        <input 
                          type="text" 
                          required
                          placeholder="248001"
                          value={deliveryData.pincode}
                          onChange={(e) => setDeliveryData(p => ({ ...p, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) }))}
                          className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <select 
                        value={deliveryData.state}
                        onChange={(e) => setDeliveryData(p => ({ ...p, state: e.target.value }))}
                        className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A7D7A8] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                      >
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={validateDeliveryAndCheckout}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-2xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-all duration-300 shadow-lg shadow-[#1F3D2B]/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Saving Checkout...
                      </>
                    ) : (
                      'Proceed to Payment'
                    )}
                  </button>
                </div>
              )}

              {/* STEP 4: PAYMENT (RAZORPAY popup) */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Detailed Order Review Card */}
                  <div className="bg-[#FAFDF7] p-6 rounded-3xl border border-[#E8F5E9] space-y-4">
                    <h4 className="font-bold text-[#1F3D2B] border-b border-[#E8F5E9] pb-2 text-lg">Review Order details</h4>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Product:</span>
                        <span className="font-bold text-gray-900">{product.name} × {quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Weight:</span>
                        <span className="font-semibold text-gray-800">{product.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contact:</span>
                        <span className="font-semibold text-gray-800">{contactData.name} ({contactData.phone})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ship to:</span>
                        <span className="font-semibold text-gray-800 text-right max-w-[65%] truncate">{deliveryData.address}, {deliveryData.city}</span>
                      </div>
                    </div>

                    <div className="border-t border-[#E8F5E9] pt-3 flex justify-between font-extrabold text-lg text-[#1F3D2B]">
                      <span>Amount Payable</span>
                      <span>₹{total}/-</span>
                    </div>
                  </div>

                  <button
                    onClick={handleRazorpayPayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-2xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-all duration-300 shadow-lg shadow-[#1F3D2B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Launching Secure Payment...
                      </>
                    ) : (
                      `Pay ₹${total} via Razorpay`
                    )}
                  </button>
                </div>
              )}

              {/* STEP 5: ORDER CONFIRMATION & TIMELINE */}
              {step === 5 && (
                <div className="space-y-6">
                  {isLoadingOrder || !orderData ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4">
                      <Loader2 className="w-8 h-8 animate-spin text-[#1F3D2B]" />
                      <p className="text-gray-500 font-medium text-sm">Fetching order details...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Success Card Header */}
                      <div className="text-center py-4">
                        <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto text-[#1F3D2B] mb-4">
                          <CheckCircle2 className="w-10 h-10 fill-[#A7D7A8]/30" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#1F3D2B]">Thank you for your order!</h3>
                        <p className="text-gray-500 text-sm mt-1">Order ID: <span className="font-mono font-bold text-[#1F3D2B]">{orderData.orderId}</span></p>
                      </div>

                      {/* Summary Block */}
                      <div className="bg-[#FAFDF7] p-5 rounded-3xl border border-[#E8F5E9] space-y-3">
                        <div className="flex justify-between items-center text-sm border-b border-[#E8F5E9]/50 pb-2">
                          <span className="text-gray-500">Product:</span>
                          <span className="font-semibold text-[#1F3D2B]">{orderData.product.name} ({orderData.product.quantity} punnet)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-[#E8F5E9]/50 pb-2">
                          <span className="text-gray-500">Paid Amount:</span>
                          <span className="font-bold text-[#1F3D2B]">₹{orderData.product.totalAmount} ({orderData.payment.status.toUpperCase()})</span>
                        </div>
                        <div className="flex justify-between items-center text-sm pb-1">
                          <span className="text-gray-500">Expected Delivery:</span>
                          <span className="font-semibold text-gray-800">
                            {new Date(orderData.expectedDelivery).toLocaleDateString('en-IN', {
                              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Tracking Header */}
                      <div>
                        <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">Order Timeline</h4>
                        
                        {/* Timeline */}
                        <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                          {stages.map((stage, idx) => {
                            const isCompleted = idx < currentStageIndex;
                            const isActive = idx === currentStageIndex;
                            const isPending = idx > currentStageIndex;

                            return (
                              <div key={stage.key} className="relative flex items-start">
                                {/* Timeline Bullet */}
                                <div className="absolute -left-[30px] top-0.5 z-10 bg-white">
                                  {isCompleted && (
                                    <div className="w-6 h-6 bg-[#1F3D2B] text-white rounded-full flex items-center justify-center border-2 border-[#1F3D2B]">
                                      <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                  )}
                                  {isActive && (
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1F3D2B] bg-[#FAFDF7] relative">
                                      <span className="w-2.5 h-2.5 bg-[#1F3D2B] rounded-full animate-ping absolute"></span>
                                      <span className="w-2.5 h-2.5 bg-[#1F3D2B] rounded-full relative"></span>
                                    </div>
                                  )}
                                  {isPending && (
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-gray-200 bg-white">
                                      <Circle className="w-3 h-3 text-gray-200 fill-gray-100" />
                                    </div>
                                  )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col">
                                  <span className={`text-sm font-bold ${
                                    isActive ? 'text-[#1F3D2B]' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    {stage.label}
                                  </span>
                                  {isActive && (
                                    <span className="text-xs text-[#A7D7A8] font-semibold mt-0.5">
                                      {orderData.payment.status === 'pending' ? 'Awaiting bank confirmation...' : 'In progress'}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        onClick={onClose}
                        className="w-full py-4 bg-[#1F3D2B] text-white font-bold rounded-2xl hover:bg-[#A7D7A8] hover:text-[#1F3D2B] transition-all duration-300 shadow-lg shadow-[#1F3D2B]/20 cursor-pointer text-center"
                      >
                        Back to Homepage
                      </button>

                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default OrderModal;
