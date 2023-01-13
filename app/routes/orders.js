const express = require("express");
const router = express.Router();
const {createOrder, getAllOrders, changeStateOrder, filterOrdersByState, getOrderById, deleteOrder, getActiveOrders, updateOrder} = require('../controllers/orders')

router.post('/', createOrder)
router.get('/active', getActiveOrders)
router.get('/:id',getAllOrders)
router.get('/',getAllOrders)
router.put('/change/:id', changeStateOrder)
router.get('/filter/filter', filterOrdersByState )
router.get('/orderbyid/filter/:id', getOrderById)
router.delete('/:id', deleteOrder)
router.put('/update/:id',updateOrder)


module.exports = router