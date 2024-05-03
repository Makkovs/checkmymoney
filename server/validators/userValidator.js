const APIError = require("../utils/APIError");

class UserValidator {

    async validateCreate(req, res, next) {
        try {
            const { name, login, password } = req.body;

            if (!name || !login || !password) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateLogin(req, res, next) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateGetOne(req, res, next) {
        try {
            const { login, id } = req.body;

            if (!login && !id) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserValidator();