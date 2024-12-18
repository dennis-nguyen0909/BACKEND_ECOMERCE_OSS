const UserService = require("../services/UserService");
const JWTservice = require("../services/JWTservice");
const createUser = async (req, res) => {
  try {
    //#1. Lấy ra dữ liệu & validation
    const { email, password, confirmPassword } = req.body;

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Password regex

    const isCheckEmail = regexEmail.test(email);
    const isCheckPassword = regexPassword.test(password);

    if (!email || !password || !confirmPassword) {
      return res.status(200).json({
        status: "Error",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(200).json({
        status: "Error",
        message: "The email is required ....@gmail.com",
      });
    } else if (!isCheckPassword) {
      return res.status(200).json({
        status: "Error",
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    } else if (password !== confirmPassword) {
      return res.status(200).json({
        status: "Error",
        message: "Passwords don't match!",
      });
    }

    //#2 truyền qua service xử lý logic
    const data = await UserService.createUser(req.body);
    return res.status(200).json({
      message: data,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
};
