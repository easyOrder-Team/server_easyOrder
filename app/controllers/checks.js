const e = require("express");
const pool = require("../../config/bd");

const getChecks = async (req, res) => {
  try {
    const { checkId } = req.query;
    if (checkId) {
      const check = await pool.query(
        `SELECT * FROM payments WHERE id_check = ${checkId}`
      );
      if (check.rowCount <= 0) {
        return res.json(`There are no checks matching with the id ${checkId}`);
      }
      return res.json(check.rows);
    }
    const allChecks = await pool.query(`SELECT * FROM payments`);
    if (allChecks.rowCount <= 0) {
      res.json("There are no checks yet");
    }
    return res.json(allChecks.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// const getCheckById = async (req, res) => {
//   try {
//     const { checkId } = req.query;
//     const check = await pool.query(
//       `SELECT * FROM payments WHERE id_check = ${checkId}`
//     );
//     if (check.rowCount <= 0) {
//       res.json(`There are no checks matching with the id ${checkId}`);
//     }
//     res.json(check.rows);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// const filterCheckByDate = async (req, res) => {
//   try {
//     const { date } = req.query;
//     const allChecks = await pool.query(
//       `SELECT * FROM payments WHERE date = ${date}`
//     );
//     if (allChecks.rowCount <= 0) {
//       res.json(`No checks where emmited on ${date}`);
//     }
//     res.json(allChecks.rows);
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

const createCheck = async (req, res)=>{
  try {
    const { id_check, name, lastName, date, total, email, id_order } = req.body;
     await pool.query(`INSERT INTO payments (id_check, name, lastname, date, total, email, id_order) VALUES (${id_check}, '${name}', '${lastName}', '${date}', ${total}, '${email}', ${id_order})`)
     res.send('created')
  } catch (error) {
    res.json({ message: error.message });
      }
}

module.exports = {
  getChecks,
  //filterCheckByDate,
  // getCheckById,
  createCheck
};
