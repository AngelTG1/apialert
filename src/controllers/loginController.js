const userService = require('../services/userService');

exports.login = async (req, res) => {
    try {
        const { correo, contraseña } = req.body;
        
        if (!correo || contraseña === undefined) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
        }
        
        const { token, user } = await userService.authenticateUser(correo, contraseña);
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
