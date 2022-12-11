const express = require("express");
const router = express.Router();

const {
  createReview,
  getReview,
  deleteReview,
} = require("../controllers/review");

router.post("/", createReview);
router.get("/:id", getReview);
router.delete("/:id", deleteReview);

module.exports = router;
