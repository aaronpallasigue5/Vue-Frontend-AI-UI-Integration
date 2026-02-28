import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Essential for reading JSON from your Vite app

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect(err => {
  if (err) console.error('Database connection failed:', err.message);
  else console.log('Database connected successfully!');
});

// GET: Fetches data to show on your website
app.get('/test-db', (req, res) => {
  connection.query('SELECT * FROM lab6 ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results); 
  });
});

// POST: Receives data from your Vite app and saves it to Railway
app.post('/add-mood', (req, res) => {
  const { mood } = req.body; 
  const sql = "INSERT INTO lab6 (message) VALUES (?)";
  
  connection.query(sql, [mood], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Data saved!", id: result.insertId });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));