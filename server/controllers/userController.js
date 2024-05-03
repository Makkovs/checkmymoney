const userService = require("../services/userService");

class UserController {

    async create(req, res, next) {
        try {
            const { name, login, password } = req.body;

            const token = await userService.create(name, login, password);
            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { login, password } = req.body;

            const token = await userService.login(login, password);
            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const { login, id } = req.body;

            const user = await userService.getOne(login, id);
            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async checkToken(req, res, next) {
        try {
            const token = await userService.checkToken(req.user.id, req.user.name);
            return res.json({ token });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();