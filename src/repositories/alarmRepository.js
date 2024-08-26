const db = require('../db');

exports.createAlarm = (id, name, status) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO alarms (id, name, status) VALUES (?, ?, ?)', [id, name, status], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return reject(err);
            }
            resolve(id);
        });
    });
};

exports.deleteAlarm = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM alarms WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return reject(err);
            }
            if (result.affectedRows === 0) {
                return reject(new Error('No alarm found with the given ID'));
            }
            resolve(result);
        });
    });
};

exports.getAllAlarms = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM alarms', (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return reject(err);
            }
            resolve(results);
        });
    });
};
