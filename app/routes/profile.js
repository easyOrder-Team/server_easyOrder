const express = require("express");
const router = express.Router();
const {
  createProfile,
  updateProfile,
  becomeAdmin,
} = require("../controllers/profile");

router.post("/", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.get("profile/:id", becomeAdmin);

module.exports = router;

module.exports = router;
