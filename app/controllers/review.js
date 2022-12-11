const pool = require("../../config/bd");

const createReview = async (req, res) => {
  const { stars, comment, id_profile } = req.body;
  try {
    await pool.query(
      `INSERT INTO review( stars, comment, id_profile) VALUES ( ${stars}, '${comment}', ${id_profile})`
    );
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

const getReview = async (req, res) => {
  try {
    const { id } = req.params;
    const profileReview = await pool.query(
      `SELECT * FROM review WHERE id_profile = '${id}'`
    );
    if (profileReview.rowCount === 0)
      throw new Error("This account hasn't yet written a review.");
    return res.json(profileReview.rows[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createReview, deleteReview, getReview };

module.exports = {
    createReview
  };