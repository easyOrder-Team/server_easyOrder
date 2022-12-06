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

    
   
    router.get("/categories", getCategories);
    router.post("/category", createCategory);
    router.get("/filterByCategory", filterByCategory);
    router.put("/update/:id", updateProduct);
    router.delete("/:id", deleteProduct);
    router.get("/:id", getProductById);
    router.post("/", createProduct);
    router.get("/", getProducts);
   

module.exports = router