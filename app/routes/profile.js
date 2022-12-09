const express = require("express");
const router = express.Router();
const {
    createProfile,
    updateProfile,
    becomeAdmin,
    getAllProfile,
    getProfile,
    getDisablesUser,
    activeUser,
    deleteUser,
  } = require("../controllers/profile");
  
  router.post("/", createProfile);
  router.put("/updateProfile/:id", updateProfile);
  router.put("/:id", becomeAdmin);
  router.get("/", getAllProfile);
  router.get("/:id", getProfile); 
  router.get("/filter/disables", getDisablesUser);
  router.delete("/:id", deleteUser);
  router.put('/active/:id', activeUser);
  
  module.exports = router;
