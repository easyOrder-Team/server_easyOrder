const express = require("express");
const router = express.Router();
const { createReservation, deleteReservation, getAllReservation } = require("../controllers/reservation");


router.post("/", createReservation);
router.delete("/:id", deleteReservation);
router.get("/:id", getAllReservation);
router.get("/", getAllReservation);

module.exports = router;
