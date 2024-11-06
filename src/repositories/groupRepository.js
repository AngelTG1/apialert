// src/repositories/groupRepository.js
const db = require('../db');

exports.createGroup = (name, amount, status) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO groupss (name, amount, status) VALUES (?, ?, ?)', [name, amount, status], (err, result) => {
            if (err) return reject(err);
            resolve(result.insertId);
        });
    });
};

exports.findGroupByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM groupss WHERE name = ?', [name], (err, results) => {
            if (err) return reject(err);
            resolve(results[0]);
        });
    });
};

exports.getAllGroups = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM groupss', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};


