const alarmService = require('../services/alarmService');

exports.createAlarm = async (req, res) => {
    try {
        const { name, status } = req.body;
        if (!name || !status) {
            return res.status(400).json({ error: "Name and status are required" });
        }
        const newAlarm = await alarmService.createAlarm(name, status);
        res.status(201).json(newAlarm);
    } catch (error) {
        res.status(500).json({ error: `Failed to create alarm: ${error.message}` });
    }
};

exports.getAllAlarms = async (req, res) => {
    try {
        const alarms = await alarmService.getAllAlarms();
        res.status(200).json(alarms);
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve alarms: ${error.message}` });
    }
};

exports.deleteAlarm = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }
        await alarmService.deleteAlarm(id);
        res.status(200).json({ message: 'Alarm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete alarm: ${error.message}` });
    }
};
