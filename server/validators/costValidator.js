const APIError = require("../utils/APIError");

class CostValidator {

    async validateCreate(req, res, next) {
        try {
            const { cost, category, type } = req.body;

            if (!cost || !category || !type) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async valdiateGetAll (req, res, next) {
        try {
            const { category, type, costGroupId, userId } = req.body;

            if (!costGroupId){
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateGetOne(req, res, next) {
        try {
            const { id } = req.body;

            if (!id) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateDelete(req, res, next) {
        try {
            const { id } = req.body;

            if (!id) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CostValidator();