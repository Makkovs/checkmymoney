const Router = require("express");

const costRouter = require("./costRouter");
const costGroupRouter = require("./costGroupRouter");
const userRouter = require("./userRouter");

const router = new Router();

router.use("/cost", costRouter);
router.use("/cost-group", costGroupRouter);
router.use("/user", userRouter);

module.exports = router;