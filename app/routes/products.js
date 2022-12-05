const express = require('express')
const router = express.Router();
const { createProduct,
    getProducts,
    deleteProduct,
    getProductByCategory
    } =require ('../controllers/products')

router.post("/", createProduct);
router.get("/", getProductByCategory);
router.delete("/:id", deleteProduct);


module.exports = router