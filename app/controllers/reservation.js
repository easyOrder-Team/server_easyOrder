const pool = require("../../config/bd");

const createReservation = async (req, res) => {
  const { Amount_Persons, date, hour, id_profile } = req.body;
  try {
    const reservation = await pool.query(
      `SELECT * FROM reservation WHERE id_profile = ${id_profile} and date = '${date}'`
    );
    if (reservation.rowCount === 0) {
      await pool.query(
        `INSERT INTO reservation( Amount_Persons, Date, Hour, id_Profile) VALUES ( ${Amount_Persons}, '${date}', '${hour}', ${id_profile})`
      );
      return res.send("reservation made successfully");
    } else {
      res.send("you already have a reservation with these details");
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM reservation WHERE id_reservation = ${id}`);
    return res.json("The review has been deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const { id } = req.params;
    let reservations;
    if (id) {
      reservations = await pool.query(
        `SELECT * FROM reservation WHERE id_reservation = ${id}`
      );
    } else {
      reservations = await pool.query(`SELECT * FROM reservation`);
    }
    res.json(reservations.rows);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  getAllReservation,
};
