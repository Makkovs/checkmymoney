const { CostGroup, Category, Cost } = require("../models/models");
const APIError = require("../utils/APIError");
const APIMessage = require("../utils/APIMessage");

class CategoryService {

    async #checkIsMember(userId, costGroupId) {
        const costGroup = await CostGroup.findOne({ where: { id: costGroupId } });
        if (!costGroup) {
            APIError.errorCandidateNotFound("costGroup", "id", costGroupId)
        }

        const user = await costGroup.getUsers({ where: { id: userId } });
        if (user.length > 0) {
            throw APIError.errorHaveNotPermissions();
        }
    }

    async #checkIsOwner(userId, costGroupId) {
        const costGroup = await CostGroup.findOne({ where: { id: costGroupId } });
        if (!costGroup) {
            APIError.errorCandidateNotFound("costGroup", "id", costGroupId)
        }

        if (costGroup.ownerId !== userId) {
            throw APIError.errorHaveNotPermissions();
        }
    }

    async createCategory(name, imgId, costGroupId, userId) {
        this.#checkIsOwner(userId, costGroupId);

        const nameCandidate = await Category.findOne({ where: { name, costGroupId } });
        if (nameCandidate) {
            throw APIError.errorAlreadyExist("category");
        }

        const category = await Category.create({ name, imgId, costGroupId, isStandart: false });
        return category;
    }

    async getAll(costGroupId, userId) {
        await this.#checkIsMember(userId, costGroupId);

        const categories = await Category.findAll({ where: { id: costGroupId } });
        return categories;
    }

    async rename(id, name, userId) {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            throw APIError.errorCandidateNotFound("category", "id", id);
        }

        await this.#checkIsOwner(userId, category.costGroupId);

        await category.update({ name });
        return APIMessage.messageRenamed("category", id, name);
    }

    async changeIcon(id, imgId, userId) {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            throw APIError.errorCandidateNotFound("cateogory", "id", id);
        }

        await this.#checkIsOwner(userId, category.costGroupId);

        await category.update({ imgId });
        return APIMessage.messageIconChanged("category", id, imgId);
    }

    async deleteCategory(id, userId) {
        const category = await Category.findOne({ where: { id } });
        if (!category) {
            throw APIError.errorCandidateNotFound("category", "id", id);
        }

        await this.#checkIsOwner(userId, category.costGroupId);

        await category.destroy();
        return APIMessage.messageDeleted("category", id);
    }
}

module.exports = new CategoryService();