const express = require("express");
const router = express.Router();
const {
  getChecks,
  //filterCheckByDate
} = require("../controllers/checks");

router.get("/", getChecks);
//router.get("/filter/date", filterByDate);

module.exports = router;
