const pool = require('../../config/bd')
const createProduct = async (req, res) => {
    try {
        const {name, description, price, image, stock, prep_time, categories} = req.body
        const product = await pool.query(`INSERT INTO products(name, description, price, image, stock, prep_time) VALUES ('${name}', '${description}', '${price}', '${image}', '${stock}', '${prep_time}');`)
        
        res.json(product)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

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
    createProduct,
    getProducts,
    deleteProduct,
  };