import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: () => `JF-${Date.now()}`
  },
  product: {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    pricePerUnit: { type: Number, required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true }
  },
  contact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  delivery: {
    address: { type: String, required: true },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  payment: {
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending'
    },
    method: { type: String },
    amountPaid: { type: Number }
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'paid', 'processing', 'shipped', 'out_for_delivery', 'delivered'],
    default: 'pending'
  },
  expectedDelivery: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

// Calculate expected delivery (7 days from creation) before saving
OrderSchema.pre('save', function (next) {
  if (!this.expectedDelivery) {
    this.expectedDelivery = new Date(this.createdAt.getTime() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
