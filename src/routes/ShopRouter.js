const express = require("express");
const ShopController = require("../controllers/ShopController");
const router = express.Router();
const ShopRouter = (app) => {
  router.post("/create", ShopController.createNameShop);
  router.get("/get-all", ShopController.getAllShop);
  router.get("/get-shop/:id", ShopController.getShopById);
  return app.use("/api/shop", router);
};

module.exports = ShopRouter;
