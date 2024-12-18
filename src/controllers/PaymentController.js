const dotenv = require('dotenv');
dotenv.config();

const getClientId = async (req, res) => {
    try {
        return res.status(200).json({
            status: 'Ok',
            data: process.env.CLIENT_ID
        })
    } catch (error) {
        return res.status(404).json({
            status: 'error',
            message: error
        })
    }
}

module.exports = { getClientId }