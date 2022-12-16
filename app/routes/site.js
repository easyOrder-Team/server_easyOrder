const express = require("express");
const router = express.Router();

const { createSite, getSite } = require("../controllers/site");

router.post("/", createSite);
router.get("/", getSite);

module.exports = router;
