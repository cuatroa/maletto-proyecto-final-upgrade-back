const express = require("express");

const usersRouter = require("./user.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Server alive!");
});

router.use("/user.routes", usersRouter);

module.exports = router;
