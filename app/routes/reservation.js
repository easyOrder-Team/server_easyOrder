const express = require("express");
const router = express.Router();
const { createReservation, deleteReservation, getAllReservation, getAllDisablesReservation, activeReservation} = require("../controllers/reservation");


router.post("/", createReservation);
router.delete("/:id", deleteReservation);
router.get("/:id", getAllReservation);
router.get("/", getAllReservation);
router.get("/disables/dis/:id", getAllDisablesReservation);
router.put("/active/act/:id", activeReservation);

module.exports = router;
