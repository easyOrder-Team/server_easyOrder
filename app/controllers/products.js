const { response } = require("express");
const pool = require("../../config/bd");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, prep_time, categories } =
      req.body;
    let allCategories = await pool.query("select * from category;");
    allCategories = allCategories.rows;
    console.log(allCategories);
    await pool.query(
      `INSERT INTO products(name, description, price, image, stock, prep_time) VALUES ('${name}', '${description}', '${price}', '${image}', '${stock}', '${prep_time}');`
    );
    let newProduct = await pool.query(
      "Select * from products where id = (select max(id) from products);"
    );
    newProduct = newProduct.rows[0];

    categories.map(async (category) => {
      allCategories.map(async (categoryDb) => {
        if (category.includes(categoryDb.name)) {
          await pool.query(
            `insert into products_category (id_product,id_category) values('${newProduct.id}','${categoryDb.id}' )`
          );
        }
      });
    });
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      `SELECT * FROM products WHERE id = '${id}'`
    );
    if (product.rowCount === 0) throw new Error("Not found");
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

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

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query("select name from category;");
    res.send(categories.rows);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await pool.query(
      `DELETE FROM products WHERE id = '${id}' `
    );
    if (deletedProduct.rowCount === 0) throw new Error("Product not found");
    return res.json("the product has been deleted");
  } catch (error) {
    res.json(error);
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const allCategories = await pool.query("select * from category");

    let allProductsByCategory = allCategories.rows.map(async (category) => {
      let data;
      let idProductsByCategory = await pool.query(
        `select id_product from products_category where id_category=${category.id}`
      );
      idProductsByCategory = idProductsByCategory.rows;

      let namesProducts = idProductsByCategory.map(async (idProduct) => {
        let name = await pool.query(
          `select name from products where id = ${idProduct.id_product}`
        );
        name = name.rows[0].name;
        return name;
      });

      Promise.all(namesProducts).then((values) => {
        data = {
          category: `${category.name}`,
          products: `${namesProducts}`,
        };
      });

      
    });
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getCategories,
  getProductByCategory,
};
