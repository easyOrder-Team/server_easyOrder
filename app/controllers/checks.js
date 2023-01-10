const pool = require("../../config/bd");

const createCheck = async (req, res) => {
  try {
    const { id_check, name, lastname, date, total, email, id_order } = req.body;
    await pool.query(
      `INSERT INTO payments (id_check, name, lastname, date, total, email, id_order) VALUES ('${id_check}', '${name}', '${lastname}', '${date}', ${total}, '${email}', ${id_order})`
    );
    res.send("The check was successfully created");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getChecks = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const check = await pool.query(
        `SELECT * FROM payments
        INNER JOIN orders ON payments.id_order = orders.id_orders 
        INNER JOIN product_order ON product_order.id_order = payments.id_order
        INNER JOIN products ON products.id_products = product_order.id_product WHERE id_check = '${id}'`
      );
      if (check.rowCount <= 0) {
        return res.json(`There are no checks matching with the ID ${id}`);
      }
      return res.json(check.rows[0]);
    }
    const allChecks = await pool.query(`SELECT * FROM payments
    INNER JOIN orders ON payments.id_order = orders.id_orders  
    INNER JOIN product_order ON product_order.id_order = orders.id_orders
    INNER JOIN products ON products.id_products = product_order.id_product`);
    if (allChecks.rowCount <= 0) {
      res.json("There are no checks yet");
    }
    return res.json(allChecks.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const filterCheckByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const allChecks = await pool.query(
      `SELECT * FROM payments WHERE date = '${date}'`
    );
    if (allChecks.rowCount <= 0) {
      res.json(`No checks where emmited on ${date}`);
    } else {
      res.json(allChecks.rows);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createCheck,
  getChecks,
  filterCheckByDate,
};
