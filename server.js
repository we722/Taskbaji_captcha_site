require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;
const CAPTCHA_API_KEY = process.env.CAPTCHA_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Sample User Schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  points: Number,
  referral: String,
});

const User = mongoose.model("User", userSchema);

// API Routes

// Root route
app.get("/", (req, res) => {
  res.send("Taskbaji CAPTCHA API is Running.");
});

// Admin login check
app.get("/admin-check", (req, res) => {
  const { email, password } = req.query;
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.send({ owner: true });
  } else {
    res.send({ owner: false });
  }
});

// Add more routes as needed (e.g. CAPTCHA verification, earning system, etc.)

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
