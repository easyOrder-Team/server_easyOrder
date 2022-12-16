const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getCategories,
  createCategory,
  filterByCategory,
  updateProduct,
  priceOrder,
  ActiveProduct,
  getDisabledProducts,
  timePreparationOrder,
} = require("../controllers/products");

router.get("/categories", getCategories);
router.get("/disabled", getDisabledProducts);
router.post("/category", createCategory);
router.get("/filter/filterByCategory", filterByCategory);
router.put("/update/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.get("/", getProducts);
router.get("/filter/priceOrder", priceOrder);
router.get("/filter/timePreparationOrder", timePreparationOrder);
router.put("/:id", ActiveProduct);

module.exports = router;
