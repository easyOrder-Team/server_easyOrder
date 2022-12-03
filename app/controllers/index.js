const pool = require("../../config/bd");

const orderProduct = (dbData) => {
  allData = dbData.rows.map((d) => {
    return {
      id: d.id_products,
      name: d.name,
      description: d.description,
      price: d.price,
      image: d.image,
      stock: d.stock,
      prep_time: d.prep_time,
      category: [{ id: d.id_category, name: d.name_c }],
    };
  });
  let notRepeat = [];

  for (let i = 0; i < allData.length; i++) {
    if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
      notRepeat.push(allData[i]);
    else {
      let index = notRepeat.findIndex((p) => p.id === allData[i].id);
      notRepeat[index].category = [
        ...notRepeat[index].category,
        ...allData[i].category,
      ];
    }
  }
  return notRepeat;
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, prep_time, categories } =
      req.body;
    let allCategories = await pool.query("select * from category;");
    allCategories = allCategories.rows;
    // res.json(allCategories);
    await pool.query(
      `INSERT INTO products(name, description, price, image, stock, prep_time) VALUES ('${name}', '${description}', '${price}', '${image}', '${stock}', '${prep_time}');`
    );
    let newProduct = await pool.query(
      "Select * from products where Id_products = (select max(Id_products) from products);"
    );
    newProduct = newProduct.rows[0].id_products;

    for (let i = 0; i < allCategories.length; i++) {
      for (let j = 0; j < categories.length; j++) {
        if (allCategories[i].name_c === categories[j]) {
          await pool.query(
            `insert into products_category (id_product,Id_Categorie) values('${newProduct}','${allCategories[i].id_category}' )`
          );
        }
      }
    }
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query(
      `SELECT * FROM products WHERE Id_products = '${id}'`
    );
    if (product.rowCount === 0) throw new Error("Not found");
    res.json(product.rows);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    let { name } = req.query;
    name = name.toLowerCase();
    let allData = [];
    if (name) {
      const dbData = await pool.query(
        `select products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c from products
       inner join products_category ON products_category.id_product = products.id_products
       inner join category on category.id_category = products_category.id_categorie where products."name" ~ '${name}'`
      );
      allData = dbData.rows.map((d) => {
        return {
          id: d.id_products,
          name: d.name,
          description: d.description,
          price: d.price,
          stock: d.stock,
          prep_time: d.prep_time,
          category: [{ id: d.id_category, name: d.name_c }],
        };
      });
      let notRepeat = [];

      for (let i = 0; i < allData.length; i++) {
        if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
          notRepeat.push(allData[i]);
        else {
          let index = notRepeat.findIndex((p) => p.id === allData[i].id);
          notRepeat[index].category = [
            ...notRepeat[index].category,
            ...allData[i].category,
          ];
        }
      }
      return res.json(notRepeat);
    } else {
      const dbData = await pool.query(
        `select products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c from products
        inner join products_category ON products_category.id_product = products.id_products
        inner join category on category.id_category = products_category.id_categorie`
      );
      allData = dbData.rows.map((d) => {
        return {
          id: d.id_products,
          name: d.name,
          description: d.description,
          price: d.price,
          stock: d.stock,
          prep_time: d.prep_time,
          category: [{ id: d.id_category, name: d.name_c }],
        };
      });
      let notRepeat = [];

      for (let i = 0; i < allData.length; i++) {
        if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
          notRepeat.push(allData[i]);
        else {
          let index = notRepeat.findIndex((p) => p.id === allData[i].id);
          notRepeat[index].category = [
            ...notRepeat[index].category,
            ...allData[i].category,
          ];
        }
      }
      return res.json(notRepeat);
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

    const deleteFromMidleTable = await pool.query(
      `DELETE FROM products_category WHERE id_product = ${id} `
    );
    const deletedProduct = await pool.query(
      `DELETE FROM products WHERE id_products = '${id}' `
    );
    if (deletedProduct.rowCount === 0 || deleteFromMidleTable.rowCount === 0)
      throw new Error("Product not found");
    return res.json("the product has been deleted");
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getCategories,
};
