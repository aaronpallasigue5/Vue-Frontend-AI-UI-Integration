// backend/index.js
import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());              // Enable CORS for frontend requests
app.use(express.json());      // Parse JSON bodies

// Environment port (Render sets process.env.PORT automatically)
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Example API route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Render will use PORT=${PORT} automatically when deployed`);
});