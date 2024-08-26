const db = require('../db');

exports.createUser = (id, nombre, primer_apellido, segundo_apellido, celular, correo, hash, pais, role, salt) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users (id, nombre, primer_apellido, segundo_apellido, celular, correo, contraseña, pais, role, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [id, nombre, primer_apellido, segundo_apellido, celular, correo, hash, pais, role, salt],
            (err, result) => {
                if (err) return reject(err);
                resolve(id);
            }
        );
    });
};

exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

exports.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) {
                return reject(new Error('No user found with the given ID'));
            }
            resolve(result);
        });
    });
};

exports.getUserByEmail = (correo) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE correo = ?', [correo], (err, result) => {
            if (err) return reject(err);
            if (result.length === 0) {
                return reject(new Error('No user found with the given email'));
            }
            resolve(result[0]);
        });
    });
};