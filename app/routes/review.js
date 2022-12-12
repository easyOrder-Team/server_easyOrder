const express = require("express");
const router = express.Router();

const {
  getReviews,
  createReview,
  getReviewById,
  deleteReview,
} = require("../controllers/review");

getReviews;
router.get("/", getReviews);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.delete("/:id", deleteReview);

module.exports = router;
