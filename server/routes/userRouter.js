const Router = require("express");

const userValidator = require("../validators/userValidator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/create", userValidator.validateCreate, userController.create);
router.post("/login", userValidator.validateLogin, userController.login);
router.get("/get-one", userValidator.validateGetOne, userController.getOne);
router.post("/auth", authMiddleware, userController.checkToken);

module.exports = router;
