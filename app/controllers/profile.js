const pool = require("../../config/bd");

const createProfile = async (req, res) => {
  const { Id_profile, name, lastname, phone, email } = req.body;
  try {
    await pool.query(
      `INSERT INTO profile(Id_profile, name, lastname, phone, email, client) VALUES ('${Id_profile}','${name}', '${lastname}', '${phone}','${email}', true );`
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
    }
    return res.json("The profile was successfully updated");
  } catch (error) {
    res.json(error.message);
  }
};

const becomeAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = res.rows.admin;
    let okMessage = `${res.rows.name} is now an admin`;
    if (!admin) {
      okMessage = `${res.rows.name} is now a client`;
    }
    const data = await pool.query(
      `UPDATE profile SET admin = '${!admin}' WHERE id_profile = ${id}`
    );
    if (data.rowCount.length < 0)
      throw new Error("This profile does not exist");
    return res.json(okMessage);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  becomeAdmin,
};
