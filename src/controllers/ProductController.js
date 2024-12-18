const ProductService = require("../services/ProductService")
const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description, discount } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating || !discount) {
            return res.status(404).json({
                status: 'Error',
                message: "Vui lòng nhập đầy đủ"
            })
        }
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json({
            status: 'Ok',
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        const data = req.body
        if (!idProduct) {
            return res.status(404).json({
                status: "Error",
                message: "Vui lòng chọn id"
            })
        }
        const response = await ProductService.updateProduct(idProduct, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            status: 'Lỗi phía controller',
            message: error
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const idProduct = req.params.id;
        if (!idProduct) {
            return res.status(404).json({
                status: 'error',
                message: "Vui lòng chọn id"
            })
        }
        const response = await ProductService.deleteProduct(idProduct);
        return res.status(200).json({
            message: "Ok",
            data: response
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: "Lỗi từ controller"
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const idUser = req.params.id;
        if (!idUser) {
            return res.status(404).json({
                status: "Error",
                message: "Vui lòng nhập id Product"
            })
        }
        const response = await ProductService.getDetailProduct(idUser);
        return res.status(200).json({
            status: "Ok",
            response
        })
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            message: "Lỗi phía controller"
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        const response = await ProductService.getAllProduct(Number(limit) || null, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createProduct, updateProduct, deleteProduct, getDetailProduct, getAllProduct
}