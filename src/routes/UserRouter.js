const express = require("express");
const UserController = require("../controllers/UserController");
const { authUserMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();
const UserRouter = (app) => {
  router.post("/sign-up", UserController.createUser);
  router.post("/login", UserController.loginUser);
  router.put("/update-user/:id", authUserMiddleware, UserController.updateUser);
  return app.use("/api/user", router);
};

module.exports = UserRouter;
