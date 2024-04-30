const Router = require("express");

const router = new Router();

router.post("/create");
router.get("/login");
router.get("/get-one");
router.get("/auth");

module.exports = router;
