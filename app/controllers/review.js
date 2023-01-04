const pool = require("../../config/bd");

const createReview = async (req, res) => {
<<<<<<< HEAD
  const { stars, comment, id_profile, products } = req.body;
=======
  const { stars, comment, id_profile, products} = req.body;
>>>>>>> 85c81d956dbd987ad4af53cb48616a9f6a69b29b
  try {
    await pool.query(
      `INSERT INTO review( stars, comment, id_profile) VALUES ( ${stars}, '${comment}', '${id_profile}')`
    );
    let idReview = await pool.query(
      "SELECT * FROM review WHERE id_review = (SELECT MAX(id_review) FROM review);"
    );
    idReview = idReview.rows[0].id_review;
<<<<<<< HEAD

    await pool.query(`INSERT INTO review_products(id_products, id_review) VALUES (${products}, ${idReview})`)

=======
    
    await pool.query(`INSERT INTO review_products(id_products, id_review) VALUES (${products}, ${idReview})`)
    
>>>>>>> 85c81d956dbd987ad4af53cb48616a9f6a69b29b
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
<<<<<<< HEAD
      `SELECT * FROM review WHERE id_profile = '${id}'`
     
=======
      ` select * from review
      inner join review_products ON review_products.id_review = review.id_review
      inner join products ON products.id_products = review_products.id_products where review.id_profile = '${id}'`
>>>>>>> 85c81d956dbd987ad4af53cb48616a9f6a69b29b
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
    const reviews = await pool.query(` select * from review
    inner join review_products ON review_products.id_review = review.id_review
    inner join products ON products.id_products = review_products.id_products`);
    if (reviews.rowCount === 0) throw new Error("There are no reviews yet.");
    return res.json(reviews.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createReview, deleteReview, getReviewById, getReviews };
