// src/app.js
const express = require('express');
const cors = require('cors');
const groupRoutes = require('./routes/groupRoutes');
const alarmRoutes = require('./routes/alarmRoutes');
const userRoutes = require('./routes/userRoutes')
const authRouts = require('./routes/authRoutes')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());  // express.json() ya maneja la carga de JSON

// Rutas
app.use('/api', groupRoutes);
app.use('/api', alarmRoutes);
app.use('/api', userRoutes);
app.use('/api', authRouts)

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
