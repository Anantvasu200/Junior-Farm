import express from 'express';
import { checkoutOrder, getOrderById, getOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/checkout', checkoutOrder);
router.get('/:id', getOrderById);
router.get('/:id/status', getOrderStatus);

export default router;
