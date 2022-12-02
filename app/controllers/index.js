const pool = require("../../config/bd");

const getProducts = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const dbData = await pool.query(
        `SELECT * FROM products WHERE name = '${name}'`
      );
      return res.json(dbData.rows);
    } else {
      const dbData = await pool.query("SELECT * FROM products");
      return res.json(dbData.rows);
    }
  } catch (error) {
    res.json(error);
  }
};

//--------------------------------------------------------------------------------------

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM products WHERE id = '${id}' `);
    return res.json("the product has been deleted");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getProducts,
  deleteProduct
};
