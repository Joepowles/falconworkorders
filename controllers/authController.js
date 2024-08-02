const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
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
};

exports.login = (req, res) => {
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
};
