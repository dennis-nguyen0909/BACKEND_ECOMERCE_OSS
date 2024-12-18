const Product = require('../models/ProductModel')
const bcrypt = require('bcrypt');
const createProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = data
        let newSize;

        // Xử lý trường hợp 'type' là 'Giày'
        if (type === "Giày") {
            newSize = ['36', '37', '38', '39', '40', '41', '42', '43'];
        }
        // Xử lý trường hợp 'type' là 'Áo'
        else if (type === "Áo" || type === "Quần") {
            newSize = ['S', 'M', 'L', 'XL'];
        }
        // Xử lý trường hợp khác
        else if (type === "Nón") {
            newSize = ['Size 1', 'Size 2']; // Hoặc bất kỳ giá trị mặc định nào bạn muốn
        } else {
            newSize = ['One Size']
        }
        try {
            const checkProductExist = await Product.findOne({
                name: name
            })
            if (checkProductExist !== null) {
                resolve({
                    status: 'Ok',
                    message: "Product Name is exist!!",
                })
            }
            const createNewProduct = await Product.create({
                name, image, type, price, countInStock: Number(countInStock), rating, description, discount, size: newSize
            })
            if (createNewProduct) {
                resolve({
                    status: 'Ok',
                    message: "Create Product SuccessFully!!",
                    data: createNewProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdProduct = await Product.findOne({
                _id: id
            })

            if (checkIdProduct === null) {
                resolve({
                    status: "Error",
                    message: "Id không tồn tại!!"
                })
            }
            const type = data.type || checkIdProduct.type;
            let newSize;

            // Xử lý trường hợp 'type' là 'Giày'
            if (type === "Giày") {
                newSize = ['36', '37', '38', '39', '40', '41', '42', '43'];
            }
            // Xử lý trường hợp 'type' là 'Áo'
            else if (type === "Áo" || type === "Quần") {
                newSize = ['S', 'M', 'L', 'XL'];
            }
            // Xử lý trường hợp khác
            else if (type === "Nón") {
                newSize = ['Size 1', 'Size 2']; // Hoặc bất kỳ giá trị mặc định nào bạn muốn
            } else {
                newSize = ['One Size']
            }
            // Tạo một bản sao của mảng 'newSize' và gán cho 'data.size'
            data.size = newSize.slice();

            const updateNewProduct = await Product.findByIdAndUpdate(
                id, data, { new: true });
            if (updateNewProduct) {
                resolve({
                    status: 'Ok',
                    message: "Update Product Success!!",
                    updateNewProduct
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkIdProduct = await Product.findOne({
                _id: id
            })
            if (checkIdProduct === null) {
                resolve({
                    status: "Error",
                    message: "Sản phẩm không tồn tại"
                })
            }
            await Product.findByIdAndDelete(id);
            return resolve({
                status: "Ok",
                message: "Delete Product Successfully!!"
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: "Error",
                    message: "Sản phẩm không tồn tại"
                })
            }
            resolve({
                status: "Ok",
                message: "Đã tìm thấy sản phẩm!!",
                data: product
            })

        } catch (error) {
            reject(error)
        }
    })
}

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const totalProductFilter = await Product.countDocuments({ [label]: { '$regex': filter[1] } })
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'Filter Ok',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProductFilter / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({ createdAt: -1, updatedAt: -1 })
                resolve({
                    status: 'Sort Ok',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (!limit) {
                allProduct = await Product.find()
            } else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({ createdAt: -1, updatedAt: -1 })
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProduct2 = async (limit, page, sort, filter) => {
    try {
        const totalProduct = await Product.countDocuments();
        let query = {};
        let regexFilter = null;

        if (filter) {
            const label = filter[0];
            const filterValue = filter[1];
            regexFilter = { [label]: { $regex: new RegExp(filterValue, 'i') } };
            query = regexFilter;
        }

        const allProduct = await Product.find(query)
            .limit(limit)
            .skip(page * limit)
            .sort({ createdAt: -1, updatedAt: -1, ...sort });

        const total = regexFilter
            ? await Product.countDocuments(regexFilter)
            : totalProduct;

        return {
            status: 'OK',
            message: 'Success',
            data: allProduct,
            total: total,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(total / limit),
        };
    } catch (error) {
        throw error;
    }
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({
                _id: { $in: ids }
            })
            resolve({
                status: 'Ok',
                EC: 1,
                Message: "Delete Success"
            })
        } catch (error) {
            resolve({
                status: 'Error',
                EC: 0,
                Message: "Delete Error"
            })
        }
    })
}

const getAllTypeProduct = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type');
            resolve({
                status: 'Ok',
                EC: 1,
                message: 'Get all type successfully!!',
                data: allType
            })
        } catch (error) {
            reject(error)
        }
    })
}

const getAllDiscount = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const productsWithDiscount = await Product.find({ discount: { $exists: true } });
            resolve({
                status: 'Ok',
                EC: 1,
                message: 'Get all discount successfully!!',
                data: productsWithDiscount
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createProduct,
     updateProduct, deleteProduct,
     getDetailProduct, getAllProduct,
      getAllProduct2, deleteManyProduct,
       getAllTypeProduct, getAllDiscount
}  