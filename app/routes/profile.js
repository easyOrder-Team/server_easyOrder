const express = require("express");
const router = express.Router();
const {
  createProfile,
  updateProfile,
  becomeAdmin,
  getAllProfile,
  getProfile,
} = require("../controllers/profile");

router.post("/", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.put("/:id", becomeAdmin);
router.get("/", getAllProfile);
router.get("/:id", getProfile);

module.exports = router;
