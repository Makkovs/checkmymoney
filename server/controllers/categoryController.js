const categoryService = require("../services/categoryService");

class CategoryController {

    async createCategory(req, res, next) {
        try {
            const { name, imgId, costGroupId } = req.body;
            const userId = req.user.id;

            const category = await categoryService.createCategory(name, imgId, costGroupId, userId);

            return res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const { costGroupId } = req.query;
            const userId = req.user.id;

            const categories = await categoryService.getAll(costGroupId, userId);
            return res.json(categories);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const userId = req.user.id;

            const category = await categoryService.getOne(id, userId);
            return res.json(category);
        } catch (error) {
            next(error);
        }
    }

    async renameCategory(req, res, next) {
        try {
            const { id, name } = req.body;
            const userId = req.user.id;

            const message = await categoryService.rename(id, name, userId);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }

    async changeIcon(req, res, next) {
        try {
            const { id, imgId } = req.body;
            const userId = req.user.id;

            const message = await categoryService.changeIcon(id, imgId, userId);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const { id } = req.body;
            const userId = req.user.id;

            const message = await categoryService.deleteCategory(id, userId);
            return res.json(message);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = new CategoryController();