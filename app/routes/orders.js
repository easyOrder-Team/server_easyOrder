const express = require("express");
const router = express.Router();
const {createOrder, getAllOrders, changeStateOrder} = require('../controllers/orders')

router.post('/', createOrder)
router.get('/:id',getAllOrders)
router.get('/',getAllOrders)
router.put('/change/:id', changeStateOrder)

module.exports = router