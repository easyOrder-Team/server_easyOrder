const express = require("express");
const router = express.Router();
const {
  getChecks,
  filterCheckByDate,
  createCheck,
} = require("../controllers/checks");

router.get("/", getChecks);
router.get("/filter/date", filterCheckByDate);
router.post("/", createCheck);

module.exports = router;
