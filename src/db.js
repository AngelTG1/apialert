// src/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '23.21.77.212',
    user: 'Angel',
    password: '1980',
    database: 'alerta'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL');
});

module.exports = connection;
