const { Op } = require("sequelize");
const { Cost } = require("../models/models");
const APIError = require("../utils/APIError");
const APIMessage = require("../utils/APIMessage");

class CostService {

    async create(value, categoryId, type, costGroupId, userId) {
        const newCost = await Cost.create({ value, categoryId, type, costGroupId, userId });
        return newCost;
    }

    async getAll(categoryId, type, costGroupId, userId, betweenDate) {
        let whereCheck = { costGroupId };

        if (userId) {
            whereCheck.userId = userId;
        }

        if (categoryId) {
            whereCheck.category = categoryId;
        }

        if (type) {
            whereCheck.type = type;
        }

        if (betweenDate) {
            whereCheck.createdAt = { [Op.between]: [new Date(betweenDate[0]), new Date(betweenDate[1])] }
        }

        const costs = await Cost.findAndCountAll({ where: whereCheck });

        return costs;
    }

    async getOne(id) {
        const cost = await Cost.findOne({ where: { id } });
        return cost;
    }

    async delete(id, userId) {
        const cost = await Cost.findOne({ where: { id } });
        if (!cost) {
            throw APIError.errorCandidateNotFound("cost", "id", id);
        }

        if (cost.userId !== userId) {
            throw APIError.errorHaveNotPermissions();
        }

        cost.destroy();

        return APIMessage.messageDeleted("cost", id);
    }
}

module.exports = new CostService();