const userService = require('../services/userService');

exports.createUser = async (req, res) => {
    try {
        const { nombre, primer_apellido, segundo_apellido, celular, correo, contraseña, pais, role } = req.body;
        const newUser = await userService.createUser(nombre, primer_apellido, segundo_apellido, celular, correo, contraseña, pais, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
