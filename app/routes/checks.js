const express = require("express");
const router = express.Router();
const {
  getChecks, 
  //filterCheckByDate
  createCheck,
} = require("../controllers/checks");

router.get("/", getChecks);
//router.get("/filter/date", filterByDate);
router.post("/", createCheck);

module.exports = router;
