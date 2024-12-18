const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    //#1 Lấy data được truyền từ controller
    const { email, name, password, confirmPassword, phone } = data;
    try {
      //#2 Tạo mới user và kiểm tra nếu user da tồn tại trong db thì không đc tạo
      const checkUserExist = await User.findOne({
        email: email,
      });
      if (checkUserExist !== null) {
        resolve({
          status: "Error",
          message: "User is exist!!",
        });
      }
      const hashPass = bcrypt.hashSync(password, 10);
      const createNewUser = await User.create({
        name,
        email,
        password: hashPass,
        // confirmPassword: hashPass,
        phone,
      });
      if (createNewUser) {
        resolve({
          status: "Ok",
          message: "Create User SuccessFully!!",
          data: createNewUser,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    //#1 Lấy data được truyền từ controller
    const { email, password } = userLogin;
    try {
      //#2 Kiểm tra nếu user đã tồn tại trong db thì cho login
      const checkUserExist = await User.findOne({
        email: email,
      });
      if (checkUserExist === null) {
        resolve({
          status: "Error",
          message: "Tài khoản của bạn không tồn tại !!",
          EC: 0,
        });
      }
      const comparePassword = bcrypt.compareSync(
        password,
        checkUserExist.password
      );

      //#3 giải pass đã bcrypt
      if (comparePassword === false) {
        resolve({
          status: "Error",
          message: "Tài khoản hoặc password không đúng!",
          EC: 0,
        });
      }
      //#4 tạo access_token và trả về
      const access_token = await generalAccessToken({
        id: checkUserExist.id,
        isAdmin: checkUserExist.isAdmin,
        isEmployee: checkUserExist.isEmployee,
      });

      //#5 tạo refresh_token để khi access_token hết hạn thì sẽ lấy refresh_token
      const refresh_token = await generalRefreshToken({
        id: checkUserExist.id,
        isAdmin: checkUserExist.isAdmin,
        isEmployee: checkUserExist.isEmployee,
      });

      resolve({
        status: "Ok",
        message: "Login Success!!",
        EC: 1,
        access_token,
        refresh_token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
