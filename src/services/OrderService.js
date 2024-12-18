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

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    const {
      paymentMethod,
      itemsPrice,
      totalPrice,
      shippingPrice,
      fullName,
      address,
      city,
      phone,
      user,
      orderItems,
      isPaid,
      PaidAt,
      email,
    } = data;
    try {
      const promise = orderItems?.map(async (order) => {
        const productData = await Product.findOneAndUpdate(
          {
            _id: order.product, // lấy ra id sản phẩm
            countInStock: { $gte: order.amount }, // số lượng có sẵn
          },
          {
            $inc: {
              countInStock: -order.amount, // số lượng đang có trừ đi sản phẩm mua
              selled: +order.amount, // cập nhật số lượng đã bán đi
            },
          },
          { new: true }
        );
        if (productData) {
          return {
            status: "Ok",
            message: " SuccessFully!!",
          };
        } else {
          return {
            status: "Error",
            id: order.product,
          };
        }
      });
      const result = await Promise.all(promise);
      const newData = result && result.filter((item) => item?.id);
      if (newData.length) {
        const arrId = [];
        newData.forEach((item) => {
          arrId.push(item.id);
        });
        resolve({
          EC: 0,
          ES: "ERROR",
          EM: "Số lượng kho đã hết",
        });
      } else {
        const addOrder = await Order.create({
          shippingAddress: {
            fullName,
            address,
            city,
            phone,
          },
          orderItems,
          paymentMethod,
          itemsPrice,
          totalPrice,
          shippingPrice,
          user: user,
          isPaid,
          PaidAt,
        });
        if (addOrder) {
          await EmailService.sendEmailCreateOrder(
            email,
            orderItems,
            totalPrice,
            paymentMethod,
            isPaid,
            PaidAt
          );
          resolve({
            EC: 1,
            ES: "SUCCESS",
            EM: "Mua thành công",
            addOrder,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOder = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allOrder = await Order.find().sort({
        createdAt: -1,
        updatedAt: -1,
      });
      resolve({
        status: "OK",
        message: "Success",
        data: allOrder,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const getAllOrderDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.find({
        user: id,
      }).sort({ createdAt: -1, updatedAt: -1 });
      if (order === null) {
        resolve({
          status: "ERR",
          message: "The order is not defined",
        });
      }

      resolve({
        status: "OK",
        message: "SUCESSS",
        data: order,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Order.aggregate([
        {
          $unwind: "$orderItems", // Tách các mục trong mảng orderItems
        },
        {
          $group: {
            _id: "$orderItems.type", // Nhóm theo loại sản phẩm
            count: { $sum: 1 }, // Đếm số lượng đơn hàng trong từng nhóm
          },
        },
        {
          $project: {
            _id: 0, // Ẩn trường _id
            type: "$_id", // Đổi tên trường _id thành type
            count: 1, // Giữ trường count
          },
        },
      ]);

      resolve({
        status: "OK",
        message: "Success",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};
const getDetailOrder = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById({
        _id: id,
      });
      resolve({
        EC: 1,
        EM: "SUCCESS",
        data: order,
      });
    } catch (err) {
      reject(err);
    }
  });
};


module.exports = {
  getAllOrderDetailsByMonth,
   createOrder, getAllOder,
   getAllOrderDetails, getAllType,
   getDetailOrder
};
