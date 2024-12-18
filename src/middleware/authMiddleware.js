const jwt = require("jsonwebtoken");
require("dotenv").config();
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) {
      return res.status(404).json({
        message: "The authentication/Lỗi verify",
        status: "Error",
        err,
      });
    }
    if (user?.isAdmin) {
      // nếu có quyền là admin cho đi tiếp
      next();
    } else {
      return res.status(404).json({
        message: "Không có quyền admin",
        status: "Error",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authentication",
        status: "Error",
      });
    }
    if (user?.isAdmin || user?.id === userId) {
      // nếu có quyền là admin cho đi tiếp
      next();
    } else {
      return res.status(404).json({
        message: "Không có quyền admin",
        status: "Error",
      });
    }
  });
};
module.exports = { authMiddleware, authUserMiddleware };
