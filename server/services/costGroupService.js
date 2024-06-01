const { CostGroup, User } = require("../models/models");
const APIError = require("../utils/APIError");
const APIMessage = require("../utils/APIMessage");

class CostGroupService {

    async create(name, userId) {
        const costGroup = await CostGroup.create({ name, ownerId: userId });
        const owner = await User.findOne({ where: { id: userId } });
        costGroup.addUser(owner);
        return costGroup;
    }

    async getAll(userId) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw APIError.errorUnLogged();
        }

        const groups = await user.getCostGroups();

        return groups;
    }

    async getOne(id) {
        const costGroup = await CostGroup.findOne({ where: { id } });
        return costGroup;
    }

    async addMember(id, memberId, userId) {
        const group = await CostGroup.findOne({ where: id });
        if (!group) {
            throw APIError.errorCandidateNotFound("group", "id", id);
        }

        if (group.ownerId !== userId) {
            throw APIError.errorHaveNotPermissions();
        }

        const member = await User.findOne({ where: { id: memberId } });
        if (!member) {
            throw APIError.errorCandidateNotFound("user", "id", memberId);
        }

        await group.addUser(member);
        return APIMessage.messagePutMember("CostGroup", id, memberId);
    }

    async removeMember(id, memberId, userId) {
        const group = await CostGroup.findOne({ where: id });
        if (!group) {
            throw APIError.errorCandidateNotFound("group", "id", id);
        }

        if (group.userId !== userId) {
            throw APIError.errorHaveNotPermissions();
        }

        await group.removeUser(memberId);
        return APIMessage.messageRemoveMember("CostGroup", id, memberId);
    }

    async rename(id, name, userId) {
        const candidate = await CostGroup.findOne({ where: id });
        if (!candidate) {
            throw APIError.errorCandidateNotFound("CostGroup", "id", id);
        }

        if (userId !== candidate.userId) {
            throw APIError.errorHaveNotPermissions();
        }

        await CostGroup.update({ name: name }, { where: { id } });
        return APIMessage.messageRenamed("CostGroup", id, name);
    }

    async delete(id, userId) {
        const candidate = await CostGroup.findOne({ where: id });
        if (!candidate) {
            throw APIError.errorCandidateNotFound("CostGroup", "id", id);
        }

        if (userId !== candidate.userId) {
            throw APIError.errorHaveNotPermissions();
        }

        await candidate.destroy();
        return APIMessage.messageDeleted("CostGroup", id);
    }
}

module.exports = new CostGroupService();