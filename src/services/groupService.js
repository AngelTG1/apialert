// src/services/groupService.js
const groupRepository = require('../repositories/groupRepository');

exports.createGroup = async (name, amount, status) => {
    const existingGroup = await groupRepository.findGroupByName(name);
    if (existingGroup) {
        throw new Error('Group name already exists');
    }

    const groupId = await groupRepository.createGroup(name, amount, status);
    return { id: groupId, name, amount, status };
};

exports.getAllGroups = () => {
    return groupRepository.getAllGroups();
};
