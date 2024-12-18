const express = require("express");
const CloudinaryController = require("../controllers/CloudinaryController");
const router = express.Router();

const Cloudinary = (app) => {
  router.delete("/delete/:id", CloudinaryController.deleteImage);
  return app.use("/api/image", router);
};

module.exports = Cloudinary;
