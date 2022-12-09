const pool = require("../../config/bd");

const createProfile = async (req, res) => {
    const {Id_profile, name, lastname, phone, email} = req.body
    try {
        await pool.query(`INSERT INTO profile(Id_profile, name, lastname, phone, email, client) VALUES (${Id_profile},'${name}', '${lastname}', '${phone}','${email}', true );`)
        res.sendStatus(201)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getAllProfile = async (req, res) => {
    try {
        let allProfile = await pool.query('SELECT * FROM profile')
        res.json(allProfile.rows)
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

const getProfile = async (req, res) => {
    try {
        const {id} = req.params
        let allProfile = await pool.query(`SELECT * FROM profile WHERE Id_profile = '${id}'`)
        res.json(allProfile.rows) 
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {createProfile, getAllProfile, getProfile}