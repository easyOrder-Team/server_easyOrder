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

function firstCapital(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, stock, prep_time, categories } =
      req.body;

    const product = await pool.query(
      `SELECT name FROM products where name = '${name}'`
    );
    if (product.rowCount === 0) {
      let allCategories = await pool.query("SELECT * FROM category;");
      allCategories = allCategories.rows;
      await pool.query(
        `INSERT INTO products(name, description, price, image, stock, prep_time) VALUES ('${name}', '${description}', '${price}', '${image}', '${stock}', '${prep_time}');`
      );
      let newProduct = await pool.query(
        "SELECT * FROM products WHERE id_products = (SELECT MAX(id_products) FROM products);"
      );
      newProduct = newProduct.rows[0].id_products;

      for (let i = 0; i < allCategories.length; i++) {
        for (let j = 0; j < categories.length; j++) {
          if (allCategories[i].name_c === firstCapital(categories[j])) {
            await pool.query(
              `INSERT INTO products_category (id_product,id_categorie) VALUES('${newProduct}','${allCategories[i].id_category}' )`
            );
          }
        }
      }
      res.sendStatus(201);
    } else {
      throw new Error("There is already a product with this name");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await pool.query(
      `SELECT * FROM products
      INNER JOIN products_category ON products_category.id_product = products.id_products
      INNER JOIN category ON category.id_category = products_category.id_categorie WHERE products.id_products = ${id}`
    );
    if (product.rowCount === 0) throw new Error("Not found");
    product = orderProduct(product);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { name } = req.query;
    let allData = [];
    if (name) {
      const dbData = await pool.query(
        `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c FROM products
       INNER JOIN products_category ON products_category.id_product = products.id_products
       INNER JOIN category ON category.id_category = products_category.id_categorie WHERE LOWER(products.name) ~ LOWER('${name}') AND stock = true`
      );
      if (dbData.rows.length <= 0) {
        return res.json([
          { message: `There are no products related to ${name} yet.` },
        ]);
      } else {
        allData = orderProduct(dbData);
        return res.json(allData);
      }
    } else {
      const dbData = await pool.query(
        `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c from products
        INNER JOIN products_category ON products_category.id_product = products.id_products
        INNER JOIN category ON category.id_category = products_category.id_categorie WHERE stock = true`
      );
      if (dbData.rows.length <= 0) {
        return res.json(`There are no products yet.`);
      } else {
        allData = orderProduct(dbData);
        return res.json(allData);
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

const getDisabledProducts = async (req, res) => {
  try {
    const dbData = await pool.query(
      `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c FROM products
      INNER JOIN products_category ON products_category.id_product = products.id_products
      INNER JOIN category ON category.id_category = products_category.id_categorie WHERE stock = False`
    );
    if (dbData.rows.length <= 0) {
      return res.json(`There are no disabled products yet.`);
    } else {
      return res.json(dbData);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query("SELECT name_c FROM category;");

    if (categories.rows.length <= 0) {
      return res.json(`There are no categories yet.`);
    } else {
      return res.json(categories.rows);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const createCategory = async (req, res) => {
  let { name } = req.body;

  try {
    name = firstCapital(name);
    pool.query(`INSERT INTO category(name_c) VALUES ('${name}')`);
    res.sendStatus(201);
  } catch (error) {
    res.json(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteFromMidleTable = await pool.query(
      `UPDATE products_category SET active = False WHERE id_product = ${id}`
    );
    const deletedProduct = await pool.query(
      `UPDATE products SET stock = False WHERE id_products = ${id}`
    );
    if (deletedProduct.rowCount === 0 || deleteFromMidleTable.rowCount === 0)
      throw new Error("Product not found");
    return res.json("The product has been deleted");
  } catch (error) {
    res.json(error);
  }
};

const ActiveProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteFromMidleTable = await pool.query(
      `UPDATE products_category SET active = True WHERE id_product = ${id}`
    );
    const deletedProduct = await pool.query(
      `UPDATE products SET stock = True WHERE id_products = ${id}`
    );
    if (deletedProduct.rowCount === 0 || deleteFromMidleTable.rowCount === 0)
      throw new Error("Product not found");
    return res.json("The product is now available");
  } catch (error) {
    res.json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = values[i];
      if (key !== "category") {
        const data = await pool.query(
          `UPDATE products SET ${key} = '${value}' WHERE id_products = ${id}`
        );
        if (data.rowCount.length < 0)
          throw new Error("You must enter valid information");
      } else {
        let newCategories = req.body.category;
        let product = await pool.query(
          `SELECT * FROM products WHERE id_products = ${id}`
        );
        product = product.rows[0];

        let idCat = [];
        for (i = 0; i < newCategories.length; i++) {
          let id = await pool.query(
            `SELECT id_category FROM category WHERE name_c = '${newCategories[i]}' `
          );
          idCat.push(id.rows[0].id_category);
        }

        let currentCategories = await pool.query(
          `SELECT id_categorie FROM products_category WHERE id_product = ${id} `
        );
        currentCategories = currentCategories.rows.map((c) => {
          return c.id_categorie;
        });

        if (idCat !== currentCategories) {
          await pool.query(
            `DELETE FROM products_category WHERE id_product = ${id} `
          );
        }

        for (i = 0; i < idCat.length; i++) {
          await pool.query(
            `INSERT INTO products_category(id_product, id_categorie) VALUES (${id}, ${idCat[i]})`
          );
        }
        return res.json("The product has been updated");
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

const filterByCategory = async (req, res) => {
  let { category } = req.query;
  try {
    category = firstCapital(category);
    let products = await pool.query(`SELECT * FROM products
    INNER JOIN products_category ON products_category.id_product = products.id_products
    INNER JOIN category ON category.id_category = products_category.id_categorie WHERE category.name_c = '${category}'`);

    products = orderProduct(products);
    if (products.length <= 0) {
      res.json(`There are no products in ${category} yet.`);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.json(error.message);
  }
};

const timePreparationOrder = async (req, res) => {
  try {
    let allData;
    let alltimes = await pool.query(
      `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c FROM products
      INNER JOIN products_category ON products_category.id_product = products.id_products
      INNER JOIN category ON category.id_category = products_category.id_categorie ORDER BY products.prep_time ASC`
    );
    allData = orderProduct(alltimes);
    res.json(allData);
  } catch (error) {
    res.json(error.message);
  }
};


const priceOrder = async (req, res) => {
  try {
    let { price } = req.query;
    let allData;
    let allprice;
    if (price === "minor") {
      allprice = await pool.query(
        `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c FROM products 
            INNER JOIN products_category ON products_category.id_product = products.id_products
            INNER JOIN category on category.id_category = products_category.id_categorie ORDER BY products.price ASC`
      );
    } else {
      allprice = await pool.query(
        `SELECT products.id_products, products.name, products.description, products.price, products.image, products.stock, products.prep_time , category.Id_category ,category.name_c FROM products 
          INNER JOIN products_category ON products_category.id_product = products.id_products
          INNER JOIN category on category.id_category = products_category.id_categorie ORDER BY products.price DESC`
      );
    }

    allData = orderProduct(allprice);
    res.json(allData);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  getCategories,
  createCategory,
  filterByCategory,
  updateProduct,
  priceOrder,
  ActiveProduct,
  timePreparationOrder,
  getDisabledProducts,
};
