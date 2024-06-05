const costGroupService = require("../services/costGroupService");

class CostGroupController {

    async create(req, res, next) {
        try {
            const { name } = req.body;
            const userId = req.user.id;

            const costGroup = await costGroupService.create(name, userId);

            return res.json({ costGroup });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const userId = req.user.id;

            const costGroups = await costGroupService.getAll(userId);

            return res.json({ costGroups });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;

            const costGroup = await costGroupService.getOne(id);

            return res.json({ costGroup });
        } catch (error) {
            next(error);
        }
    }

    async addMember(req, res, next) {
        try {
            const { id, memberId } = req.body;
            const userId = req.user.id;

            const message = await costGroupService.addMember(id, memberId, userId);
            return res.json({ message });
        } catch (error) {
            next(error);
        }
    }

    async removeMember(req, res, next) {
        try {
            const { id, memberId } = req.body;
            const userId = req.userId;

            const message = await costGroupService.removeMember(id, memberId, userId);
            return res.json({ message });
        } catch (error) {
            next(error);
        }
    }

    async rename(req, res, next) {
        try {
            const { id, name } = req.body;
            const userId = req.userId;

            const message = await costGroupService.rename(id, name, userId);
            return res.json({ message });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const userId = req.userId;

            const message = await costGroupService.delete(id, userId);
            return res.json({ message });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CostGroupController();