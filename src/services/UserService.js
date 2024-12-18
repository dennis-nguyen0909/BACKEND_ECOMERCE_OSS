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

module.exports = {
  createUser,
};
