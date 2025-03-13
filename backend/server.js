const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
require("dotenv").config(); // Load .env variables
const feedManagementRoutes = require("./routes/feedManagementRoutes"); // Feed Management routes
const path = require('path'); // Import path module
const labTestRoutes = require('./routes/labTestRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reproductiveHealthRoutes = require('./routes/reproductiveHealthRoutes');
const vaccinationRoutes = require('./routes/vaccinationRoutes');
const healthCheckRoutes = require('./routes/healthCheckRoutes');
const authRoutes = require('./routes/authRoutes'); 
const geminiRoutes = require('./routes/geminiRoutes');

// Create express app
const app = express();


// Load environment variables
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Atlas connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));


// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
app.use(bodyParser.json()); // Parse JSON request bodies

app.post("/test", (req, res) => {
  console.log("Request received from frontend:", req.body);
  res.json({ message: "Hello from backend!" });
});

// Serve images from the "images" folder under the "/images" endpoint
app.use('/images', express.static(path.join(__dirname, 'uploads'))); 

// Use animal routes
app.use("/api/animals", require("./routes/animalRoutes"));

// Use milk production routes
app.use("/api/milk-production", require("./routes/milkProductionRoutes"));

//Use feed management routes
app.use('/api', feedManagementRoutes);

//Use health records routes 
app.use('/api/labTests', labTestRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reproductiveHealth', reproductiveHealthRoutes);
app.use('/api/vaccinations', vaccinationRoutes);
app.use('/api/healthChecks', healthCheckRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gemini', geminiRoutes);

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Dairy Farm Management System API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});
