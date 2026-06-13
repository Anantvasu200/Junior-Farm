import Order from '../models/Order.js';

// Create a pending draft order
export const checkoutOrder = async (req, res) => {
  const { product, contact, delivery } = req.body;

  if (!product || !contact || !delivery) {
    return res.status(400).json({ error: 'Missing required checkout information.' });
  }

  const pricePerUnit = Number(product.pricePerUnit);
  const quantity = Number(product.quantity);
  const totalAmount = pricePerUnit * quantity;

  // Create new order
  const order = new Order({
    product: {
      name: product.name,
      sku: product.sku,
      pricePerUnit,
      quantity,
      totalAmount
    },
    contact: {
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    },
    delivery: {
      address: delivery.address,
      landmark: delivery.landmark,
      city: delivery.city,
      state: delivery.state,
      pincode: delivery.pincode
    },
    payment: {
      status: 'pending'
    },
    orderStatus: 'pending'
  });

  await order.save();

  res.status(201).json({ order });
};

// Get full order details by Database ID
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.status(200).json(order);
};

// Poll current order + payment status
export const getOrderStatus = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id).select('orderStatus payment.status');

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.status(200).json({
    orderStatus: order.orderStatus,
    paymentStatus: order.payment.status
  });
};
