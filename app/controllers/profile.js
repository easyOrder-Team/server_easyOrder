const pool = require('../../config/bd');

const createProfile = async (req, res) => {
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
        throw new Error('You must enter valid information');
    }
    return res.json('The profile was successfully updated');
  } catch (error) {
    res.json(error.message);
  }
};

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
    if (admin) {
      okMessage = `${profile.rows[0].name} is no longer an admin`;
    }

    if (data.rowCount.length < 0)
      throw new Error('This profile does not exist');
    return res.json(okMessage);
  } catch (error) {
    res.json(error.message);
  }
};

const getAllProfile = async (req, res) => {
  try {
    let allProfile = await pool.query('SELECT * FROM profile WHERE state = true');
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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const dbData = await pool.query(
      `UPDATE profile SET state = false WHERE id_profile = ${id}`
    );
    return res.send('User Deleted');
  } catch (error) {
    res.json(error.message);
  }
};

const activeUser = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE profile SET state = true WHERE id_profile = ${id}`
    );
    return res.send('User Actived');
  } catch (error) {
    res.json(error.message);
  }
};

const getDisablesUser = async (req, res) => {
  try {
    const dbData = await pool.query(
      `select profile.id_profile, profile.name, profile.lastname, profile.email, profile.phone, profile.state from profile
            where profile.state = false`
    );
    return res.json(dbData.rows);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createProfile,
  updateProfile,
  becomeAdmin,
  getAllProfile,
  getProfile,
  deleteUser,
  getDisablesUser,
  activeUser
};
