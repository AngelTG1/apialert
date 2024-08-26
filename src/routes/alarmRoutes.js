// src/routes/alarmRoutes.js
const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarmController');
const authenticateJWT = require('../middlewares/authenticateJWT')

router.post('/alarms', authenticateJWT, alarmController.createAlarm);
router.get('/alarms', alarmController.getAllAlarms);
router.delete('/alarms/:id', alarmController.deleteAlarm);

module.exports = router;
