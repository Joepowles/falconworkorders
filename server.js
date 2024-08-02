const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

// Serve static files from the public directory
app.use(express.static('public'));

// Register endpoint
app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
    db.query(query, [username, hashedPassword, email], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, results) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }

        if (results.length === 0) {
            res.json({ success: false, message: 'User not found' });
            return;
        }

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            res.json({ success: false, message: 'Incorrect password' });
            return;
        }

        res.json({ success: true, user: { id: user.id, username: user.username, email: user.email } });
    });
});

// Create work order endpoint
app.post('/api/workorders', (req, res) => {
    const { description } = req.body;
    const userId = 1; // This should be dynamically assigned based on the logged-in user

    const query = 'INSERT INTO workorders (user_id, description, status) VALUES (?, ?, ?)';
    db.query(query, [userId, description, 'Pending'], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Get all work orders endpoint
app.get('/api/workorders', (req, res) => {
    const query = 'SELECT * FROM workorders';
    db.query(query, (err, results) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true, workOrders: results });
    });
});

// Update work order endpoint
app.put('/api/workorders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const query = 'UPDATE workorders SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Delete work order endpoint
app.delete('/api/workorders/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM workorders WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
