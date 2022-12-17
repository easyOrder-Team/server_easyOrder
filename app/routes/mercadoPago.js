var mercadopago = require("mercadopago");
const express = require("express");
const router = express.Router();

mercadopago.configure({
  access_token:
    "TEST-8502805663003777-121712-6d62eb213a0a33d9012c3ae6aac0803d-1260039185",
});


router.get("/", (req, res) => {
  const {products} = req.query;

  let items = JSON.parse(products).map(product=>{
    return({
      title:product.name,
      picture_url:product.image,
      unit_price:product.price,
      quantity:product.count
    })
  })
  let preference = {
    items: items
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json(response.body.id);
    })
    .catch(function (error) {
      res.json({ error: error });
    });
});
module.exports = router;
