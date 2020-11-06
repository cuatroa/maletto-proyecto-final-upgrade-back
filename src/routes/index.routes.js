const express = require("express");
//se estipula la constante que se vincula a las rutas
const userRouter = require("./user.routes");
const bookingRouter = require("./booking.routes");
const locationSpaceRouter = require("./locationSpace.routes");
const reviewRouter = require("./review.routes");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Server alive!");
});

//Entramos aquí cuando vamos a http://localhost:3001/user
//.use = es para la utilidad de las rutas - para exportar datos
router.use("/user", userRouter);
router.use("/locationSpace", locationSpaceRouter);
router.use("/booking", bookingRouter);
router.use("/review", reviewRouter);

module.exports = router;