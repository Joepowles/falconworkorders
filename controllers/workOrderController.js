const db = require('../config/db');

exports.createWorkOrder = (req, res) => {
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
};

exports.getWorkOrders = (req, res) => {
    const query = 'SELECT * FROM workorders';
    db.query(query, (err, results) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true, workOrders: results });
    });
};

exports.updateWorkOrder = (req, res) => {
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
};

exports.deleteWorkOrder = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM workorders WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            res.json({ success: false, message: err.message });
            return;
        }
        res.json({ success: true });
    });
};
