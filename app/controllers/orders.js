const pool = require("../../config/bd");


  const orderOrders = (dbData) => {
    allData = dbData.rows.map((d) => {
      return {
        id: d.id_orders,
        avalible: d.avalible,
        profile: d.id_profile,
        price: d.total_price,
        products: [{ id: d.id_product, name: d.name, amount: d.amount_product}],
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
      const {id_mesa, id_profile, total, products} = req.body;  
      console.log(id_mesa, id_profile, total, products)
      await pool.query(`INSERT INTO orders (avalible, id_mesa, id_profile) VALUES (true, ${id_mesa}, '${id_profile}')`)
      let idOrder = await pool.query(`SELECT * FROM orders WHERE id_orders = (SELECT MAX(id_orders) FROM orders);`)
      idOrder = idOrder.rows[0].id_orders
      for (let i = 0; i < products.length; i++) {
        await pool.query(`INSERT INTO product_order (id_product, id_order, amount_product, total_price) VALUES (${products[i].id}, ${idOrder}, ${products[i].amount}, ${total});`)
      }
      res.sendStatus(201)
    } catch (error) {
      res.json({error: error.message})
    }
}

const getAllOrders = async (req, res) => {
    try {
       let orders = await pool.query(`SELECT * FROM orders
       INNER JOIN product_order ON product_order.id_order = orders.id_orders
       INNER JOIN products ON products.id_products = product_order.id_product`)
      orders = orderOrders(orders)
       res.json(orders)
    } catch (error) {
      res.json({error: error.message}) 
    }
}

const getOrder = async (req,res) => {
  try {
    const {id} = req.params;

    let order = await pool.query(`SELECT * FROM orders 
    INNER JOIN product_order ON product_order.id_order = orders.id_orders
    INNER JOIN products ON products.id_products = product_order.id_product WHERE orders.id_orders = ${id}`)

    order = orderOrders(order)
    res.json(order)
  } catch (error) {
    res.json({error: error.message}) 
  }
}

module.exports = {
  createOrder, 
  getAllOrders, 
  getOrder
}