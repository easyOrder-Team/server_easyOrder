const pool = require("../../config/bd");

const createSite = async (req, res) => {
  const { amount_persons, num_table } = req.body;
  try {
    const num = await pool.query(
      `SELECT * FROM site WHERE num_table = '${num_table}'`
    );
    if (num.rowCount === 0) {
      await pool.query(
        `INSERT INTO site(amount_persons, num_table) VALUES ('${amount_persons}', '${num_table}');`
      );
      return res.status(201).json("Created");
    } else {
      return res.send("Site exist!!!");
    }
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

const getSiteAvalible = async (req, res) => {
  try {
    let avalible = await pool.query(`SELECT * FROM site WHERE avalible = true`);
    if (avalible.rowCount === 0) {
      return res.send("No vacant sites");
    }
    res.json(avalible.rows);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSite = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM site WHERE id_site = ${id}`);
    return res.json(`the site has been delete`);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getNumTable = async (req, res) => {
  const { id } = req.params;
  try {
    let num = await pool.query(`SELECT * FROM site WHERE num_table = ${id}`);
    if (num.rowCount === 0) {
      return res.json({ message: `The table number does not exist` });
    }
    return res.json(num.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updateSite = async (req, res) => {
  const { id } = req.params;
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  try {
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = values[i];
      const data = await pool.query(
        `UPDATE site SET ${key} = ${value} WHERE id_site = ${id}`
      );
      console.log(data);
      if (data.rowCount === 0) {
        return res.json({ message: `You must enter valid information` });
      }
      return res.json(data);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/* const disableSite = async (req, res){

} */

module.exports = {
  createSite,
  getAllSite,
  deleteSite,
  getNumTable,
  getSiteAvalible,
  updateSite,
};
