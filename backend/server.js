const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '1001',
  database: process.env.DB_NAME || 'transitops',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
  connection.release();
});

// Get all trains
app.get('/trains', (req, res) => {
  const query = `
    SELECT 
      id,
      train_number,
      train_name,
      from_station,
      to_station,
      class,
      date,
      availability
    FROM trains
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ 
        error: 'Database error',
        message: err.message 
      });
    }

    if (!results || results.length === 0) {
      console.log('No trains found in database');
      return res.status(404).json({
        error: 'No trains found',
        message: 'No trains are currently available'
      });
    }

    console.log(`Found ${results.length} trains`);
    res.json(results);
  });
});

// Add a new train
app.post('/trains', (req, res) => {
  const { train_number, train_name, from_station, to_station, class: travel_class, date, availability, departure_time, arrival_time } = req.body;

  // Basic validation
  if (!train_number || !train_name || !from_station || !to_station || !travel_class || !date || availability == null || !departure_time || !arrival_time) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const insertQuery = `
    INSERT INTO trains 
      (train_number, train_name, from_station, to_station, class, date, availability, departure_time, arrival_time)
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.execute(insertQuery, [train_number, train_name, from_station, to_station, travel_class, date, availability, departure_time, arrival_time], (err, results) => {
    if (err) {
      console.error('Error inserting train:', err);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }

    res.status(201).json({ 
      message: 'Train added successfully',
      trainId: results.insertId
    });
  });
});

// Get all station names
app.get('/stations', (req, res) => {
  const query = 'SELECT station_name FROM stationname ORDER BY station_name';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ error: 'Error fetching stations' });
      return;
    }
    res.json(results);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Server error',
    message: err.message
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  pool.end(err => {
    if (err) console.error('Error closing pool:', err);
    process.exit();
  });
});

// Update train availability
app.put('/trains/:train_number', (req, res) => {
  const { train_number } = req.params;
  const { availability } = req.body;

  // Basic validation
  if (availability == null) {
    return res.status(400).json({ error: 'Availability is required' });
  }

  const updateQuery = `
    UPDATE trains
    SET availability = ?
    WHERE train_number = ?
  `;

  pool.execute(updateQuery, [availability, train_number], (err, results) => {
    if (err) {
      console.error('Error updating train:', err);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.json({ message: 'Train availability updated successfully' });
  });
});

// Delete a train
app.delete('/trains/:train_number', (req, res) => {
  const { train_number } = req.params;

  const deleteQuery = `
    DELETE FROM trains
    WHERE train_number = ?
  `;

  pool.execute(deleteQuery, [train_number], (err, results) => {
    if (err) {
      console.error('Error deleting train:', err);
      return res.status(500).json({ error: 'Database error', message: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Train not found' });
    }

    res.json({ message: 'Train deleted successfully' });
  });
});