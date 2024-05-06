const APIError = require("../utils/APIError");

class CostGroupValidator {

    async validateCreate(req, res, next) {
        try {
            const { name } = req.body;

            if (!name) {
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

    async validateAddMember(req, res, next) {
        try {
            const { id, memberId } = req.body;

            if (!id || !memberId) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateRemoveMember(req, res, next) {
        try {
            const { id, memberId } = req.body;

            if (!id || !memberId) {
                next(APIError.errorUndefinedArg());
            }

            next();
        } catch (error) {
            next(error);
        }
    }

    async validateRename(req, res, next) {
        try {
            const { id, name } = req.body;

            if (!id || !name) {
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

module.exports = new CostGroupValidator();