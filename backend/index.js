import mysql from 'mysql2';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors()); 
app.use(express.json()); 

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// GET: Fetches entries to display in the list
app.get('/test-db', (req, res) => {
  connection.query('SELECT * FROM lab6 ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST: Adds Name, Email, and Mood to Railway
app.post('/add-mood', (req, res) => {
  const { name, email, mood } = req.body;
  const sql = "INSERT INTO lab6 (name, email, message) VALUES (?, ?, ?)";
  
  connection.query(sql, [name, email, mood], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: result.insertId });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));