const express = require("express");
const router = express.Router();
const fs = require("fs");
const { getProducts, deleteProduct } = require("../controllers/index");

const pathRouter = `${__dirname}`;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const withOutExt = removeExtension(file);
  const skipe = ["index"].includes(withOutExt);
  if (!skipe) {
    router.use(`/${withOutExt}`, require(`${withOutExt}`));
    console.log("---->", withOutExt);
  }
});

router.get("/products", getProducts);
router.delete("/product/:id", deleteProduct);
router.get("*", (req, res) => {
  res.status(404).send({ Error: "Not Found" });
});

module.exports = router;
