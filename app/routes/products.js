const express = require('express')
const router = express.Router();
const { createProduct,
    getProducts,
    deleteProduct,} =require ('../controllers/products')

router.post("/", createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);


module.exports = router