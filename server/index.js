import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import mongoose from 'mongoose';
import orderRoutes from './routes/orders.js';
import paymentRoutes from './routes/payments.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Main Routes
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Database Connection
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/junior-farm';
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Global Error Handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
