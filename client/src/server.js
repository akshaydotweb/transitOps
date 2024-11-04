const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1001',
  database: 'transitops'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.get('/trains', (req, res) => {
  connection.query('SELECT * FROM trains', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/stations', (req, res) => {
    connection.query('SELECT station_name FROM stations', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});