const Router = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const categoryValidator = require("../validators/categoryValidator");
const categoryController = require("../controllers/categoryController");

const router = new Router();

router.post("/create", authMiddleware, categoryValidator.validateCreate, categoryController.createCategory);
router.get("/get-all", authMiddleware, categoryValidator.validateGetAll, categoryController.getAll);
router.patch("/rename", authMiddleware, categoryValidator.validateRename, categoryController.renameCategory);
router.patch("/change-icon", authMiddleware, categoryValidator.validateChangeIcon, categoryController.changeIcon);
router.delete("/delete", authMiddleware, categoryValidator.validateDelete, categoryController.deleteCategory);

module.exports = router;
