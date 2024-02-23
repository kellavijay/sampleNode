const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const cors = require('cors');



// MySQL Configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'spsoft',
  database: 'sptest'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
// Routes
app.post('/register', (req, res) => {
  const { username, email, password_hash } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
  db.query(sql, [username, email, password_hash], (err, result) => {
    if (err) {
        console.log(err);
      res.status(500).json({ error: 'Failed to register user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
