const { CostGroup, User } = require("../models/models");
const APIError = require("../utils/APIError");
const APIMessage = require("../utils/APIMessage");

class CostGroupService {

    async create(name, userId) {
        const costGroup = await CostGroup.create({ name, userId });
        return costGroup;
    }

    async getAll(userId) {
        const costGroups = await CostGroup.findAll({ where: { userId } });
        return costGroups;
    }

    async getOne(id) {
        const costGroup = await CostGroup.findOne({ where: { id } });
        return costGroup;
    }

    async addMember(id, memberId, userId) {
        const group = await CostGroup.findOne({ where: id });
        if (!group) {
            APIError.errorCandidateNotFound("group", "id", id);
        }

        if (group.userId !== userId) {
            APIError.errorHaveNotPermissions();
        }

        const member = await User.findOne({ where: { id: memberId } });
        if (!member) {
            APIError.errorCandidateNotFound("user", "id", memberId);
        }

        await group.addUser(member);
        return APIMessage.messagePutMember("CostGroup", id, memberId);
    }

    async removeMember(id, memberId, userId) {
        const group = await CostGroup.findOne({ where: id });
        if (!group) {
            APIError.errorCandidateNotFound("group", "id", id);
        }

        if (group.userId !== userId) {
            APIError.errorHaveNotPermissions();
        }

        await group.removeUser(memberId);
        return APIMessage.messageRemoveMember("CostGroup", id, memberId);
    }

    async rename(id, name, userId) {
        const candidate = await CostGroup.findOne({ where: id });
        if (!candidate) {
            APIError.errorCandidateNotFound("CostGroup", "id", id);
        }

        if (userId !== candidate.userId) {
            APIError.errorHaveNotPermissions();
        }

        await CostGroup.update({ name: name }, { where: { id } });
        return APIMessage.messageRenamed("CostGroup", id, name);
    }

    async delete(id, userId) {
        const candidate = await CostGroup.findOne({ where: id });
        if (!candidate) {
            APIError.errorCandidateNotFound("CostGroup", "id", id);
        }

        if (userId !== candidate.userId) {
            APIError.errorHaveNotPermissions();
        }

        await candidate.destroy();
        return APIMessage.messageDeleted("CostGroup", id);
    }
}

module.exports = new CostGroupService();