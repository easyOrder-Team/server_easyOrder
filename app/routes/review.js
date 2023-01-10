const express = require("express");
const router = express.Router();

const {
  getReviews,
  createReview,
  getReviewByIdReview,
  deleteReview,
  getReviewByIdProfile,
} = require("../controllers/review");

getReviews;
router.get("/", getReviews);
router.post("/", createReview);
router.get("/profile/:id", getReviewByIdProfile);
router.delete("/:id", deleteReview);
router.get("/review/:id", getReviewByIdReview);

module.exports = router;