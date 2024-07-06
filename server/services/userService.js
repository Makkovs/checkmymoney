const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const APIError = require("../utils/APIError");
const hashPassword = require("../utils/hashPassword");
const generateJwt = require("../utils/generateJWT");

class UserService {

    async create(name, login, password) {
        const candidate = await User.findOne({ where: { login } });
        if (candidate) {
            throw APIError.errorAlreadyExist("user");
        }

        const passwordHash = await hashPassword(password);
        const user = await User.create({
            name, login, password: passwordHash
        });

        const token = generateJwt(user.id, user.name);
        return token;
    }

    async login(login, password) {
        const candidate = await User.findOne({ where: { login } })
        if (!candidate) {
            throw APIError.errorIncorrectPassword();
        }

        const comparedPassword = bcrypt.compareSync(password, candidate.password);
        if (!comparedPassword) {
            throw APIError.errorIncorrectPassword();
        }

        const token = generateJwt(candidate.id, candidate.name);
        return token;
    }

    async getOne(login, id) {
        let user;
        if (id) {
            user = await User.findOne({ where: { id } });
        } else {
            user = await User.findOne({ where: { login } });
        }

        if (!user) {
            throw APIError.errorCandidateNotFound("user", "login | id", `${login} | ${id}`);
        }

        return { id: user.id, name: user.name }; //Maybe + costs
    }

    async checkToken(id, name) {
        const token = generateJwt(id, name);
        return token;
    }
}

module.exports = new UserService();