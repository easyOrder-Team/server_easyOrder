const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const {createProfile, getAllProfile, getProfile} = require('../controllers/profile')

router.post('/', createProfile)
router.get('/', getAllProfile)
router.get('/:id', getProfile)
>>>>>>> ab81c56562cf8f54e4f2b5465c134f17f707510c

module.exports = router;
