const pool = require("../../config/bd");

const createProfile = async (req, res) => {
<<<<<<< HEAD
  const { Id_profile, name, lastname, phone, email } = req.body;
  try {
    await pool.query(
      `INSERT INTO profile(Id_profile, name, lastname, phone, email, client) VALUES (${Id_profile},'${name}', '${lastname}', '${phone}','${email}', true );`
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = values[i];
      const data = await pool.query(
        `UPDATE profile SET ${key} = '${value}' WHERE id_profile = ${id}`
      );
      if (data.rowCount.length < 0)
        throw new Error("You must enter valid information");
=======
    const {Id_profile, name, lastname, phone, email} = req.body
    try {
        await pool.query(`INSERT INTO profile(Id_profile, name, lastname, phone, email, client) VALUES (${Id_profile},'${name}', '${lastname}', '${phone}','${email}', true );`)
        res.sendStatus(201)
    } catch (error) {
        res.status(404).json({ error: error.message });
>>>>>>> ab81c56562cf8f54e4f2b5465c134f17f707510c
    }
    return res.json("The profile was successfully updated");
  } catch (error) {
    res.json(error.message);
  }
};

<<<<<<< HEAD
const becomeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await pool.query(
      `SELECT * FROM profile WHERE id_profile = '${id}'`
    );
    const admin = profile.rows[0].admin;
    const data = await pool.query(
      `UPDATE profile SET admin = '${!admin}' WHERE id_profile = ${id}`
    );
    let okMessage = `${profile.rows[0].name} is now an admin`;
    if (!admin) {
      okMessage = `${profile.rows[0].name} is no longer an admin`;
    }

    if (data.rowCount.length < 0)
      throw new Error("This profile does not exist");
    return res.json(okMessage);
  } catch (error) {
    res.json(error.message);
  }
};

const getAllProfile = async (req, res) => {
  try {
    let allProfile = await pool.query("SELECT * FROM profile");
    res.json(allProfile.rows);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    let allProfile = await pool.query(
      `SELECT * FROM profile WHERE Id_profile = '${id}'`
    );
    res.json(allProfile.rows[0]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createProfile,
  updateProfile,
  becomeAdmin,
  getAllProfile,
  getProfile,
};
=======
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
>>>>>>> ab81c56562cf8f54e4f2b5465c134f17f707510c
