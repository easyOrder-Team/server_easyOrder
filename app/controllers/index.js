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

module.exports = {
    createProduct
}