// server.js
const express = require('express');
const mysql = require('mysql2');  // Import MySQL
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection pool
const db = mysql.createConnection({
    host: 'localhost',     
    user: 'root',      
    password: '1001',  
    database: 'transitops',
	port : 3306
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// API endpoint to fetch station names
app.get('/stations', (req, res) => {
    const query = 'SELECT station_name FROM stations';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching station names:', err);
            res.status(500).send('An error occurred while fetching station names');
        } else {
            const stationNames = result.map((station) => station.station_name);
            res.status(200).json(stationNames);
        }
    });
});

// API endpoint to submit form data
app.post('/submit-form', (req, res) => {
    const { from, to, departureDate, returnDate, passengers, travelClass } = req.body;
    
    const query = 'INSERT INTO form_data (from_station, to_station, departure_date, return_date, passengers, travel_class) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [from, to, departureDate, returnDate, passengers, travelClass], (err, result) => {
        if (err) {
            console.error('Error inserting form data:', err);
            res.status(500).send('An error occurred while inserting form data');
        } else {
            res.sendStatus(200);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});