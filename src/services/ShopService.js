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

module.exports = { createNameShop };
