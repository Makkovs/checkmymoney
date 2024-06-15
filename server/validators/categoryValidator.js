const APIError = require("../utils/APIError");

class CategoryValidator {

    async validateCreate(req, res, next) {
        try {
            const { name, imgId, costGroupId } = req.body;

            if (!name || !costGroupId || !imgId) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateGetAll(req, res, next) {
        try {
            const { costGroupId } = req.query;

            if (!costGroupId) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateGetOne(req, res, next){
        try {
            const { id } = req.query;

            if (!id){
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error){
            next(error);
        }
    }

    async validateRename(req, res, next) {
        try {
            const { id, name } = req.body;

            if (!id || !name) {
                next(APIError.errorAlreadyExist());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateChangeIcon(req, res, next) {
        try {
            const { id, imgId } = req.body;

            if (!id || !imgId) {
                next(APIError.errorAlreadyExist());
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
                next(APIError.errorAlreadyExist());
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryValidator();