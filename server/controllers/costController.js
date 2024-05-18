const costService = require("../services/costService");

class CostController {

    async create(req, res, next) {
        try {
            const { cost, category, type, costGroupId } = req.body;
            const userId = req.user.id;

            const newCost = await costService.create(cost, category, type, costGroupId, userId);
            return res.json({ newCost });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const { category, type, costGroupId, userId, betweenDate } = req.body;

            const costs = await costService.getAll(category, type, costGroupId, userId, betweenDate);
            return res.json({ costs });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.body;

            const cost = await costService.getOne(id);
            return res.json({ cost });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const userId = req.user.id;

            const message = await costService.delete(id, userId);
            return res.json({ message });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CostController();