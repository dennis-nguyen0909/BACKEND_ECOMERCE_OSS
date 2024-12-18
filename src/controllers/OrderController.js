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



module.exports = {
  createOrder,
  getAllOrderDetailsByMonth,
};
