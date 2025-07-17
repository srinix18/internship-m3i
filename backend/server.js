// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your route
const customerRoutes = require('./routes/Customer-routes');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Use your routes
app.use('/api/customers', customerRoutes);

// Root test route
app.get('/', (req, res) => {
  res.send('AI Realty Backend is running.');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
