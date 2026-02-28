import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// Load environment variables from .env file (for local) or Render settings (for production)
dotenv.config();

// 1. Create MySQL connection using Render Environment Variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,      // Should be caboose.proxy.rlwy.net
  user: process.env.DB_USER,      // Should be root
  password: process.env.DB_PASSWORD,  // Your long Railway password
  database: process.env.DB_NAME,  // Should be railway
  port: process.env.DB_PORT       // Should be 12979
});

// 2. Connect to the Database
connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully!');
  }
});

const app = express();

// 3. Middleware
app.use(cors());               // Allow requests from your frontend
app.use(express.json());       // Allow JSON data in requests

// 4. Port Configuration for Render
const PORT = process.env.PORT || 3000;

// 5. Routes
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// THE UPDATED TEST ROUTE: This reads data from your 'lab6' table
app.get('/test-db', (req, res) => {
  connection.query('SELECT * FROM lab6', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    // This will return the row you added (e.g., {"id": 101})
    res.json(results); 
  });
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Render will use PORT=${PORT} automatically when deployed`);
});