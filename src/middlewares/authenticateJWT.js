const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'asd111d';

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: 'authentication requetirida' }); // Forbidden
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' }); // Forbidden
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;
