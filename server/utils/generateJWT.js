const jwt = require("jsonwebtoken");

const generateJwt = (id, name) => {
    return jwt.sign(
        { id, name },
        process.env.SECRET_KEY,
        { expiresIn: '48h' }
    );
};

module.exports = generateJwt;