const express = require("express");
const router = express.Router();
const {createOrder, getAllOrders, getOrder} = require('../controllers/orders')

router.post('/', createOrder)
router.get('/',getAllOrders)
router.get('/:id', getOrder)
module.exports = router