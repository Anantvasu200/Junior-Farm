const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ error: 'Validation Error', details: messages });
  }

  // Mongoose Cast Error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Resource Not Found', details: `Invalid field value for: ${err.path}` });
  }

  // Mongoose duplicate key error
  if (err.code && err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate Key Error', details: 'A resource with this key already exists.' });
  }

  // Razorpay API errors
  if (err.error && err.error.description) {
    return res.status(err.statusCode || 400).json({ error: 'Payment Gateway Error', details: err.error.description });
  }

  // General server error fallback
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred on the server.'
  });
};

export default errorHandler;
