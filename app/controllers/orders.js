const { query } = require("express");
const pool = require("../../config/bd");

const orderOrders = (dbData) => {
  allData = dbData.rows.map((d) => {
    return {
      id: d.id_orders,
      avalible: d.avalible,
      profile: d.id_profile,
      price: d.total_price,
      products: [
        {
          id: d.id_product,
          name: d.name,
          amount: d.amount_product,
          price: d.price,
          image: d.image,
          stock: d.stock,
        },
      ],
      id_check: d.id_check,
      id_mesa: d.id_mesa,
      id_order: d.id_order,
      id_profile: d.id_profile,
      date: new Intl.DateTimeFormat("es-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "America/Cordoba",
      }).format(d.date),
      description: d.description,
      total: d.total_price,
      state: d.state,
    };
  });
  let notRepeat = [];

  for (let i = 0; i < allData.length; i++) {
    if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
      notRepeat.push(allData[i]);
    else {
      let index = notRepeat.findIndex((p) => p.id === allData[i].id);
      notRepeat[index].products = [
        ...notRepeat[index].products,
        ...allData[i].products,
      ];
    }
  }
  return notRepeat;
};

const createOrder = async (req, res) => {
  try {
    const { id_mesa, id_profile, total, products } = req.body;

    await pool.query(
      `INSERT INTO orders (avalible,  id_mesa, id_profile, state) VALUES (true, ${id_mesa}, '${id_profile}', 'created')`
    );
    let idOrder = await pool.query(
      `SELECT * FROM orders WHERE id_orders = (SELECT MAX(id_orders) FROM orders)`
    );
    idOrder = idOrder.rows[0].id_orders;
    for (let i = 0; i < products.length; i++) {
      await pool.query(
        `INSERT INTO product_order (id_product, id_order, amount_product, total_price) VALUES (${products[i].id}, ${idOrder}, ${products[i].count}, ${total})`
      );
    }
    let order = await pool.query(
      `SELECT * FROM orders WHERE id_orders = ${idOrder}`
    );
    res.json(order.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { id } = req.params;
    let orders;
    if (!id) {
      orders =
        await pool.query(`SELECT orders.id_orders, orders.avalible, orders.id_mesa, orders.id_profile, products.id_products, product_order.amount_product, product_order.total_price, products.name, products.price, products.stock, products.image, orders.state FROM orders
      INNER JOIN product_order ON product_order.id_order = orders.id_orders
      INNER JOIN products ON products.id_products = product_order.id_product
      INNER JOIN payments ON payments.id_order = orders.id_orders`);

      orders = orderOrders(orders);
    } else {
      orders =
        await pool.query(`SELECT orders.id_orders, orders.avalible, orders.id_mesa, orders.id_profile, products.id_products, product_order.amount_product, product_order.total_price, products.name, orders.avalible, products.price, products.stock, orders.id_mesa, products.image, orders.state FROM orders
      INNER JOIN product_order ON product_order.id_order = orders.id_orders
      INNER JOIN products ON products.id_products = product_order.id_product
      INNER JOIN payments ON payments.id_order = orders.id_orders WHERE id_profile = '${id}'`);

      orders = orderOrders(orders);
    }
    return res.json(orders);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    let orders;
    // orders = await pool.query(`SELECT * FROM orders
    //     INNER JOIN product_order ON product_order.id_order = orders.id_orders
    //     INNER JOIN products ON products.id_products = product_order.id_product
    //     INNER JOIN payments ON payments.id_order = orders.id_orders WHERE orders.id_orders = '${id}'`);
    // orders = orderOrders(orders);
    orders =
      //linea 116 INNER JOIN payments ON payments.id_order = orders.id_orders
      await pool.query(`SELECT orders.id_orders, orders.avalible, orders.id_mesa, orders.id_profile, products.id_products, product_order.amount_product, product_order.total_price, products.name, orders.avalible, products.price, products.stock, orders.id_mesa, products.image, orders.state FROM orders
      INNER JOIN product_order ON product_order.id_order = orders.id_orders
      INNER JOIN products ON products.id_products = product_order.id_product WHERE id_orders = '${id}'`);
    orders = orderOrders(orders);
    return res.json(orders);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const changeStateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancel } = req.query;
    let state = await pool.query(
      `SELECT state FROM orders WHERE id_orders = ${id}`
    );
    state = state.rows[0].state;
    console.log(typeof cancel);
    if (cancel === "true") {
      pool.query(`UPDATE orders SET state = 'cancel' WHERE id_orders = ${id}`);
      pool.query(`UPDATE orders SET avalible = false WHERE id_orders = ${id}`);
      return res.send("cancel");
    } else {
      if (state === "created") {
        pool.query(
          `UPDATE orders SET state = 'processing' WHERE id_orders = ${id}`
        );
        return res.send("processing");
      }
      if (state === "processing") {
        pool.query(
          `UPDATE orders SET state = 'finished' WHERE id_orders = ${id}`
        );
        pool.query(
          `UPDATE orders SET avalible = false WHERE id_orders = ${id}`
        );
        return res.send("finished");
      }
      res.send(`the state is ${state}`);
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const filterOrdersByState = async (req, res) => {
  try {
    const { state } = req.query;
    let allOrders = await pool.query(`SELECT * FROM orders
    INNER JOIN product_order ON product_order.id_order = orders.id_orders
    INNER JOIN products ON products.id_products = product_order.id_product WHERE state = '${state}'`);
    res.json(allOrders.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getActiveOrders = async (req, res) => {
  try {
    /* INNER JOIN payments ON payments.id_order = orders.id_orders WHERE orders.avalible = true */
    orders =
      await pool.query(`SELECT orders.id_orders, orders.avalible, orders.id_mesa, orders.id_profile, products.id_products, product_order.amount_product, product_order.total_price, products.name, orders.avalible, products.price, products.stock, orders.id_mesa, products.image, orders.state FROM orders
      INNER JOIN product_order ON product_order.id_order = orders.id_orders
      INNER JOIN products ON products.id_products = product_order.id_product WHERE orders.avalible = true`);

    orders = orderOrders(orders);
    res.json(orders);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `UPDATE orders SET avalible = false WHERE id_orders = ${id}`
    );
    res.sendStatus(204);
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = {
  createOrder,
  getAllOrders,
  changeStateOrder,
  filterOrdersByState,
  getOrderById,
  deleteOrder,
  getActiveOrders,
};
