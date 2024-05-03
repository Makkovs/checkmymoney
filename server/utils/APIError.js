class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    };
};

class CustomApiError {
    static errorUndefinedArg() {
        return new ApiError("One of the arguments was undefined!", 400);
    };

    static errorCandidateNotFound(candidate, item, itemValue) {
        return new ApiError(`${candidate} with ${item} ${itemValue} was not found!`, 404);
    };

    static errorAlreadyExist(item) {
        return new ApiError(`This ${item} already exists!`, 409);
    };

    static errorHaveNotPermissions() {
        return new ApiError("Insufficient permissions to perform the request!", 403);
    };

    static errorUnLogged() {
        return new ApiError("Login to your account to perform the request!", 401);
    };

    static errorIncorrectPassword() {
        return new ApiError("Incorrect password!", 401);
    };
};

module.exports = CustomApiError;