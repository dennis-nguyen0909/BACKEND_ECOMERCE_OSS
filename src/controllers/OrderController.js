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



module.exports = {
  getRevenueByMonth,
  createOrder,
  getAllOder,
  getDetailOrder,
  cancelOrderProduct,
  deleteManyOrder,
  getAllType,
  getAllOrderDetails,
  confirmOrder,
  getAllOrderDetailsByMonth,
};
