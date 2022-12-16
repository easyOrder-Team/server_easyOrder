const pool = require("../../config/bd");

const createSite = async (req, res) => {
  const { amount_persons, num_table } = req.body;
  try {
    await pool.query(
      `INSERT INTO site(amount_persons, num_table) VALUES ('${amount_persons}', '${num_table}');`
    );
    res.status(201).json("Created");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAllSite = async (req, res) => {
  try {
    let site = await pool.query(`SELECT * FROM site`);
    res.json(site.rows);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createSite,
  getAllSite,
};
