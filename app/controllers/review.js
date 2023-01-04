const pool = require("../../config/bd");

const createReview = async (req, res) => {
  const { stars, comment, id_profile, products } = req.body;
  try {
    await pool.query(
      `INSERT INTO review( stars, comment, id_profile) VALUES ( ${stars}, '${comment}', '${id_profile}')`
    );
    let idReview = await pool.query(
      "SELECT * FROM review WHERE id_review = (SELECT MAX(id_review) FROM review);"
    );
    idReview = idReview.rows[0].id_review;

    await pool.query(`INSERT INTO review_products(id_products, id_review) VALUES (${products}, ${idReview})`)

    return res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await pool.query(
      `DELETE FROM review WHERE id_review = ${id}`
    );
    if (deletedReview.rowCount === 0) throw new Error("Review not found");
    return res.json("The review has been deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const profileReview = await pool.query(
      `SELECT * FROM review WHERE id_profile = '${id}'`
     
    );
    if (profileReview.rowCount === 0)
      throw new Error("This account hasn't yet written a review.");
    return res.json(profileReview.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await pool.query(`SELECT * FROM review`);
    if (reviews.rowCount === 0) throw new Error("There are no reviews yet.");
    return res.json(reviews.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createReview, deleteReview, getReviewById, getReviews };
