const express = require("express");
const UserController = require("../controllers/UserController");
const {
  authUserMiddleware,
  authMiddleware,
} = require("../middleware/authMiddleware");
const router = express.Router();
const UserRouter = (app) => {
  router.post("/sign-up", UserController.createUser);
  router.post("/login", UserController.loginUser);
  router.put("/update-user/:id", authUserMiddleware, UserController.updateUser);
  router.delete("/delete-user/:id", authMiddleware, UserController.deleteUser);
  router.get("/getAll", authMiddleware, UserController.getAllUser);
  router.get("/getAllUser", authMiddleware, UserController.getAllUser);
  router.get(
    "/get-details/:id",
    authUserMiddleware,
    UserController.getDetailUser
  );
  router.post("/delete-many", authMiddleware, UserController.deleteManyUser);
  router.post("/refresh-token", UserController.refreshToken);
  return app.use("/api/user", router);
};

module.exports = UserRouter;
