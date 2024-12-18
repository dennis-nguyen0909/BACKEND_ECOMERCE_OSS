const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middleware/authMiddleware");
const OrderRouter = (app) => {
  router.get(
    "/get-by-month/:month&:year",
    OrderController.getAllOrderDetailsByMonth
  );
  

  return app.use("/api/order", router);
};

router.post("/create", OrderController.createOrder);

module.exports = OrderRouter;
