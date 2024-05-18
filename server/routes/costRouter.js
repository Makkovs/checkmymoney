const Router = require("express");

const costController = require("../controllers/costController");
const costValidator = require("../validators/costValidator");
const authMiddleware = require("../middlewares/authMiddleware");

const router = new Router();

router.post("/create", authMiddleware, costValidator.validateCreate, costController.create);
router.get("/get-all", costValidator.valdiateGetAll, costController.getAll);
router.get("/get-one", costValidator.validateGetOne, costController.getOne);
router.delete("/delete", authMiddleware, costValidator.validateDelete, costController.delete);

module.exports = router;
