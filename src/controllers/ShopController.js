const express = require("express");
const router = express.Router();
const ShopService = require("../services/ShopService");
const createNameShop = async (req, res) => {
  try {
    const { name } = req.body;
    console.log("name", name);
    const response = await ShopService.createNameShop(name);
    return res.status(200).json({ response });
  } catch (e) {
    return res.status(500).json({
      EM: "Error",
    });
  }
};

module.exports = { createNameShop };
