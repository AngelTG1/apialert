// src/services/alarmService.js
const alarmRepository = require('../repositories/alarmRepository');
const { v4: uuidv4 } = require('uuid')

exports.createAlarm = async (name, status) => {
    const id = uuidv4();
    try {
        await alarmRepository.createAlarm(id, name, status);
        return { id, name, status };
    } catch (error) {
        throw new Error(`Failed to create alarm: ${error.message}`);
    }
};

exports.getAllAlarms = () => {
    return alarmRepository.getAllAlarms();
};

exports.deleteAlarm = async (id) => {
    try {
        await alarmRepository.deleteAlarm(id);
        return { message: 'Alarm deleted successfully' };
    } catch (error) {
        throw new Error(`Failed to delete alarm: ${error.message}`);
    }
};