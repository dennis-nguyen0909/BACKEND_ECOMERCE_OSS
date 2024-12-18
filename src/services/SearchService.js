const Search = require('../models/SearchModel')
const createProduct = (keyword) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (typeof keyword === 'object') {
                keyword = JSON.stringify(keyword);
            }

            const search = Search.create({ keyword });
            if (search) {
                resolve({
                    status: 'Ok',
                    message: "Create Search!!",
                    data: search.keyword
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { createProduct}