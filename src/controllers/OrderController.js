const OrderService = require("../services/OrderService");
const getAllOrderDetailsByMonth = async (req, res) => {
  try {
    const month = req.params.month;
    const year = req.params.year;
    console.log("data", month, year);
    const response = await OrderService.getAllOrderDetailsByMonth(month, year);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      paymentMethod,
      itemsPrice,
      totalPrice,
      shippingPrice,
      fullName,
      address,
      city,
      phone,
      type,
    } = req.body;

    if (
      !paymentMethod ||
      !itemsPrice ||
      !totalPrice ||
      !shippingPrice ||
      !fullName ||
      !address ||
      !phone
    ) {
      return res.status(404).json({
        status: "Error",
        message: "Vui lòng nhập đầy đủ",
      });
    }

    const response = await OrderService.createOrder(req.body);
    return res.status(200).json({
      status: "Ok",
      data: response,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error,
    });
  }
};

const getAllOder = async (req, res) => {
  try {
    const response = await OrderService.getAllOder();
    return res.status(200).json({
      EC: 1,
      EM: "SUCCESS",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const response = await OrderService.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await OrderService.getAllType();
    return res.status(200).json({
      EC: 1,
      EM: "SUCCESS",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const getDetailOrder = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(200).json({
        EC: 0,
        EM: "ERR",
      });
    }
    const response = await OrderService.getDetailOrder(id);
    return res.status(200).json({
      EC: 1,
      EM: "SUCCESS",
      response,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};



module.exports = {
  getAllOrderDetailsByMonth,
  createOrder, getAllOder,
  getAllOrderDetails, getAllType,
  getDetailOrder
};
