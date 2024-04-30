const Router = require("express");

const router = new Router();

router.post("/create");
router.get("/get-all");
router.get("/get-one");
router.delete("/delete");

module.exports = router;
