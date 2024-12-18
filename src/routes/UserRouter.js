const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();
const UserRouter = (app) => {
  router.post("/sign-up", UserController.createUser);
  return app.use("/api/user", router);
};

module.exports = UserRouter;
