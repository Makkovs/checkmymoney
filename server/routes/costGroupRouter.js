const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const costGroupValidator = require("../validators/costGroupValidator");
const costGroupController = require("../controllers/costGroupController");


const router = new Router();

router.post("/create", authMiddleware, costGroupValidator.validateCreate, costGroupController.create);
router.get("/get-all", authMiddleware, costGroupController.getAll);
router.get("/get-one", costGroupValidator.validateGetOne, costGroupController.getOne);
router.put("/add-member", authMiddleware, costGroupValidator.validateAddMember, costGroupController.addMember);
router.patch("/remove-member", authMiddleware, costGroupValidator.validateRemoveMember, costGroupController.removeMember);
router.patch("/rename", authMiddleware, costGroupValidator.validateRename, costGroupController.rename);
router.delete("/delete", authMiddleware, costGroupValidator.validateDelete, costGroupController.delete);

module.exports = router;
