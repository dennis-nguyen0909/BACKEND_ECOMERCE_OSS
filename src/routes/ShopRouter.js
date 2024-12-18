const express = require("express");
const ShopController = require("../controllers/ShopController");
const router = express.Router();
const ShopRouter = (app) => {
  router.post("/create", ShopController.createNameShop);
  router.get("/get-all", ShopController.getAllShop);
  return app.use("/api/shop", router);
};

module.exports = ShopRouter;
