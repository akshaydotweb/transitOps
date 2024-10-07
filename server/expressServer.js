// server.js
const express = require('express');
const mysql = require('mysql2');  // Import MySQL

const app = express();
const port = 3001;

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

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the Train Management System');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
