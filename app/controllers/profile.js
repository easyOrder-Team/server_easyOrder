const pool = require("../../config/bd");

const createProfile = async (req, res) => {
  const {Id_profile, name, lastname, phone, email} = req.body
  try {
      await pool.query(`INSERT INTO profile(Id_profile, name, lastname, phone, email, client) VALUES ('${Id_profile}','${name}', '${lastname}', '${phone}','${email}', true )`)
      res.sendStatus(201)
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
}



































































const deleteUser = async (req, res) => {
  const {id} = req.params
    try {
      const dbData = await pool.query(        
        `UPDATE profile SET state = false WHERE id_profile = ${id}`
      );
      return res.send('User Deleted');
    } catch (error) {
      res.json(error.message);
    }
  }

  const activeUser = async (req, res) => {
    const {id} = req.params
      try {
       await pool.query(        
          `UPDATE profile SET state = true WHERE id_profile = ${id}`
        );
        return res.send('User Actived');
      } catch (error) {
        res.json(error.message);
      }
    }
  
    const getDisablesUser = async (req, res) => {
      try {
        const dbData = await pool.query(
          `select profile.id_profile, profile.name, profile.lastname, profile.email, profile.phone, profile.state from profile
          where profile.state = false`
        );
        return res.json(dbData);
      } catch (error) {
        res.json(error.message);
      }
    }


module.exports = {
   createProfile,
   deleteUser,
   activeUser,
   getDisablesUser
  };