const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const SECRET_KEY = process.env.SECRET_KEY || 'asd111d';

// Función para crear un hash de la contraseña
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return { salt, hash };
}

// Función para verificar la contraseña
function verifyPassword(storedPassword, storedSalt, passwordAttempt) {
    const hash = crypto.pbkdf2Sync(passwordAttempt, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedPassword === hash;
}

exports.createUser = async (nombre, primer_apellido, segundo_apellido, celular, correo, contraseña, pais, role = 'global') => {
    const id = uuidv4();
    const { salt, hash } = hashPassword(contraseña);
    await userRepository.createUser(id, nombre, primer_apellido, segundo_apellido, celular, correo, hash, pais, role, salt);
    return { id, nombre, primer_apellido, segundo_apellido, celular, correo, pais, role };
};

exports.authenticateUser = async (correo, passwordAttempt) => {
    const user = await userRepository.getUserByEmail(correo);
    
    if (!user) {
        throw new Error('User not found');
    }

    const { contraseña: storedPassword, salt, id } = user;
    const isValid = verifyPassword(storedPassword, salt, passwordAttempt);
    
    if (!isValid) {
        throw new Error('Invalid password');
    }

    // Generar JWT
    const token = jwt.sign({ id, correo, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    
    return { token, user: { id, nombre: user.nombre, primer_apellido: user.primer_apellido, correo: user.correo, role: user.role } };
};

exports.getAllUsers = () => {
    return userRepository.getAllUsers();
};

exports.deleteUser = async (id) => {
    try {
        await userRepository.deleteUser(id);
        return { message: 'User deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};
