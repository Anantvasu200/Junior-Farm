import Razorpay from 'razorpay';
import crypto from 'crypto';
import mongoose from 'mongoose';
import Order from '../models/Order.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payments/create-order
export const createOrder = async (req, res) => {
  const { orderId, amount } = req.body;

  if (!orderId || !amount) {
    return res.status(400).json({ error: 'Order ID and amount are required.' });
  }

  const amountInPaise = Math.round(amount * 100);
  if (amountInPaise < 100) {
    return res.status(400).json({ error: 'Minimum payable amount is ₹1 (100 paise).' });
  }

  // Find order in database by either custom orderId or database _id
  const order = await Order.findOne({
    $or: [
      { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null },
      { orderId: orderId }
    ]
  });

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Create Razorpay order option
  const options = {
    amount: amountInPaise, // amount in paise (e.g. ₹239 = 23900 paise)
    currency: 'INR',
    receipt: order.orderId,
    notes: { 
      orderId: order.orderId,
      dbId: order._id.toString()
    }
  };

  const razorpayOrder = await razorpay.orders.create(options);

  // Save the Razorpay Order ID to the order
  order.payment.razorpayOrderId = razorpayOrder.id;
  await order.save();

  res.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    keyId: process.env.RAZORPAY_KEY_ID
  });
};

// POST /api/payments/verify
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
    return res.status(400).json({ success: false, message: 'Missing payment verification details.' });
  }

  // HMAC SHA256 signature verification
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Payment verification failed' });
  }

  // Find order in database by either custom orderId or database _id
  const order = await Order.findOne({
    $or: [
      { _id: mongoose.Types.ObjectId.isValid(orderId) ? orderId : null },
      { orderId: orderId }
    ]
  });

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Update order fields to paid status
  order.payment.razorpayOrderId = razorpay_order_id;
  order.payment.razorpayPaymentId = razorpay_payment_id;
  order.payment.status = 'paid';
  order.payment.amountPaid = order.product.totalAmount;
  order.payment.method = req.body.method || 'upi';
  order.orderStatus = 'paid';
  await order.save();

  res.json({ success: true, message: 'Payment verified successfully' });
};
