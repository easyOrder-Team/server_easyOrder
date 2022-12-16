const express = require("express");
const router = express.Router();

const {
  createSite,
  getAllSite,
  deleteSite,
  getNumTable,
  getSiteAvalible,
  updateSite,
} = require("../controllers/site");
const { route } = require("./products");

router.post("/", createSite);
router.get("/", getAllSite);
router.delete("/:id", deleteSite);
router.get("/avalible", getSiteAvalible);
router.get("/:id", getNumTable);
router.put("/update/:id", updateSite);

module.exports = router;
