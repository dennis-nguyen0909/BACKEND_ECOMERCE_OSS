const express = require('express')
const router = express.Router();
const PaymentController = require('../controllers/PaymentController')
const PaymentRouter = (app) => {
    router.get('/client-id', PaymentController.getClientId);
    return app.use('/api/payment', router);
}

module.exports = PaymentRouter