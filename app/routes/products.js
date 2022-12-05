const express = require('express')
const router = express.Router();
const { createProduct,
    getProducts,
    deleteProduct,
    getProductById,
    getCategories,
    createCategory,
    filterByCategory,
    updateProduct,} =require ('../controllers/products')

    router.post("/", createProduct);
    router.get("/", getProducts);
    router.delete("/:id", deleteProduct);
    router.get("/:id", getProductById);
    router.get("/categories", getCategories);
    router.post("/category", createCategory);
    router.get("/filterByCategory", filterByCategory);
    router.put("/update/:id", updateProduct);


module.exports = router