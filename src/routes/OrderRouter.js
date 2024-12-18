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
  router.get(
    "/get-all-order/:id",
    authUserMiddleware,
    OrderController.getAllOrderDetails
  );
  router.get("/get-all-type", OrderController.getAllType);

  return app.use("/api/order", router);
};



module.exports = OrderRouter;
