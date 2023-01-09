var mercadopago = require("mercadopago");
const express = require("express");
const router = express.Router();

mercadopago.configure({
  access_token:
    "TEST-8502805663003777-121712-6d62eb213a0a33d9012c3ae6aac0803d-1260039185",
});

router.get("/", (req, res) => {
  const { products, email } = req.query;

  let items = JSON.parse(products).map((product) => {
    return {
      id:product.id,
      title: product.name,
      picture_url: product.image,
      unit_price: product.price,
      quantity: product.count,
    };
  });
  let preference = {
    items: items,
    payer: {
      email:email
    },
    back_urls:{
      success:"https://clienteasyorder-production-3461.up.railway.app/confirmation",
     
    },
    auto_return:"approved"
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) { 
      res.json(response.body);
    })
    .catch(function (error) {
      res.json({ error: error });
    });
});
module.exports = router;