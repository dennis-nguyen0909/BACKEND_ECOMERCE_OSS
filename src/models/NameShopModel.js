const mongoose = require("mongoose");

const nameShop = new mongoose.Schema(
  {
    name: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("NameShop", nameShop);
module.exports = Shop;
