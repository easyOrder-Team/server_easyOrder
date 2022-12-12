const express = require("express");
const router = express.Router();
const {
  createProfile,
  updateProfile,
  becomeAdmin,
  getAllProfile,
  getProfile,
  getDisabledUser,
  activeUser,
  deleteUser,
} = require("../controllers/profile");

router.post("/", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.put("/:id", becomeAdmin);
router.get("/", getAllProfile);
router.get("/:id", getProfile);
router.get("/filter/disabled", getDisabledUser);
router.delete("/:id", deleteUser);
router.put("/active/:id", activeUser);

module.exports = router;
