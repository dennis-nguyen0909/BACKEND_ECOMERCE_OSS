const Order = require("../models/OrderProductModel");
const Product = require("../models/ProductModel");
const bcrypt = require("bcrypt");
const EmailService = require("../services/EmailService");

const getAllOrderDetailsByMonth = (month, year) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order.find({
        createdAt: {
          $gte: new Date(year, month - 1, 1),
          $lt: new Date(year, month, 1),
        },
      }).sort({ createdAt: -1, updatedAt: -1 });

      if (!orders || orders.length === 0) {
        resolve({
          status: "ERR",
          message: "No orders found for the specified month and year",
        });
      }

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: orders,
      });
    } catch (error) {
      reject(error);
    }
  });
};



module.exports = {
  getAllOrderDetailsByMonth,
};
