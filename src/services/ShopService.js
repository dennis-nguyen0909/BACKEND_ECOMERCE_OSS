const Shop = require("../models/NameShopModel");
const createNameShop = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const shop = await Shop.create({
        name,
      });
      console.log("shop", shop);
      if (shop) {
        resolve({
          status: "Ok",
          message: "Create Search!!",
          data: shop,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllShop = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const shop = await Shop.find().sort({ createdAt: -1 });
      if (shop) {
        resolve({
          status: "Ok",
          message: "get all success!!",
          data: shop,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = { createNameShop, getAllShop };
