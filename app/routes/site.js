const express = require("express");
const router = express.Router();

const { createSite, getAllSite } = require("../controllers/site");

router.post("/", createSite);
router.get("/", getAllSite);

module.exports = router;
