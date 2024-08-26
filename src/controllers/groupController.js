// src/controllers/groupController.js
const groupService = require('../services/groupService');

exports.createGroup = async (req, res) => {
    try {
        const { name, amount, status } = req.body;
        const newGroup = await groupService.createGroup(name, amount, status);
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroups();
        res.json(groups);
    } catch (error) {
        console.error("Error al obtener los grupos:", error);
        res.status(500).json({ error: error.message });
    }
};
