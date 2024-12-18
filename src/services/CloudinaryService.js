const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dxtz2g7ga",
  api_key: "953156321132996",
  api_secret: "As23z_TAML8DqymuQA5Mw-KIk14",
});

const deleteCloudinaryImage = (publicId) => {
  return new Promise((resolve, reject) => {});
};

module.exports = { deleteCloudinaryImage };
