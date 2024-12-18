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
  router.post("/create", OrderController.createOrder);
  router.get("/get-all-order", OrderController.getAllOder);
  
  return app.use("/api/order", router);
};



module.exports = OrderRouter;
