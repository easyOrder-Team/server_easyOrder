const express = require("express");
const router = express.Router();







router.post('/', 
  createProfile,
  updateProfile,
  becomeAdmin,
  getAllProfile,
  getProfile,
)




router.delete("/:id', deleteUser)
router.put('/:id', activeUser)
router.get('/disables", getDisablesUser);


router.post("/", createProfile);
router.put("/updateProfile/:id", updateProfile);
router.put("/:id", becomeAdmin);
router.get("/", getAllProfile);
router.get("/:id", getProfile);

module.exports = router;
