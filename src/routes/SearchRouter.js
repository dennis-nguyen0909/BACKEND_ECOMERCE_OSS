const express = require("express");
const router = express.Router();
const SearchController = require("../controllers/SearchController");

const SearchRouter = (app) => {
  router.post("/create", SearchController.createSearch);
  router.get("/getAll", SearchController.getAllSearch);
  return app.use("/api/search", router);
};
module.exports = SearchRouter;
