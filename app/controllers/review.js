const pool = require('../../config/bd');

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



module.exports = {
    createReview
  };