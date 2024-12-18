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

module.exports = {
    createProduct, updateProduct, deleteProduct,getDetailProduct
}  