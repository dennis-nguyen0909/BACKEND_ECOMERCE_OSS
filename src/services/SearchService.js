const Search = require("../models/SearchModel");
const createProduct = (keyword) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (typeof keyword === "object") {
        keyword = JSON.stringify(keyword);
      }

      const search = Search.create({ keyword });
      if (search) {
        resolve({
          status: "Ok",
          message: "Create Search!!",
          data: search.keyword,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
const getAllSearch = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const searchHistory = await Search.find().sort({ timestamp: -1 });

      if (searchHistory) {
        resolve({
          status: "Ok",
          message: "Find Search Ok!!",
          searchHistory,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { createProduct, getAllSearch };
