const Router = require("express");

const costRouter = require("./costRouter");
const costGroupRouter = require("./costGroupRouter");
const userRouter = require("./userRouter");
const categoryRouter = require("./categoryRouter");

const router = new Router();

router.use("/cost", costRouter);
router.use("/cost-group", costGroupRouter);
router.use("/user", userRouter);
router.use("/category", categoryRouter);

module.exports = router;