const jwt = require("jsonwebtoken");
const APIError = require("../utils/APIError");

module.exports = function (req, res, next) {
    if (req.method == "OPTIONS") {
        next();
    };

    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            next(APIError.errorUnLogged());
            return;
        };
        
        const token = authHeader.split(" ")[1];
        if (!token) {
            next(APIError.errorUnLogged());
            return;
        };
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    };
};