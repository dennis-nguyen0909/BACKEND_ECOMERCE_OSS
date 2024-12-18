const express = require('express')
const router = express.Router()
const SearchService = require('../services/SearchService')
const createSearch = async (req, res) => {


    try {
        const { keyword } = req.body
        const response = await SearchService.createProduct(keyword);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).json({
            EM: 'Error'
        })
    }
}


module.exports = { createSearch}