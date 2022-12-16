const pool = require('../../config/bd');

const createReservation = async (req, res) => {
  const { Amount_Persons, date, hour, id_profile } = req.body;
  try {
    const reservation = await pool.query(
      `SELECT * FROM reservation WHERE id_profile = '${id_profile}' and date = '${date}'`
    );
    if (reservation.rowCount === 0) {
      await pool.query(
        `INSERT INTO reservation( Amount_Persons, Date, Hour, id_Profile) VALUES ( ${Amount_Persons}, '${date}', '${hour}', '${id_profile}')`
      );
      return res.send('reservation made successfully');
    } else {
      res.send('you already have a reservation with these details');
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = await pool.query(
      `UPDATE reservation SET state = false WHERE id_reservation = ${id}`
    );
    if (reservation.rowCount === 0) throw new Error('Non-existent reservation');
    return res.json('The reservation has been deleted');
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllDisablesReservation = async (req, res) =>{
  try {  
        const { id } = req.params;
       const reservations = await pool.query(`SELECT * FROM reservation WHERE state = false and id_profile = ${id}`)    
       console.log(reservations.rows)
    if (reservations.rowCount !== 0){
    res.json(reservations.rows)
    }else{
      res.send("No reservations found deleted")
    }
} catch (error) {
    res.json({ message: error.message });
}
}

const getAllReservation = async (req, res)=>{
    try {
        const { id } = req.params;
        let reservations
        if(id){
            reservations = await pool.query(`SELECT * FROM reservation WHERE id_profile = ${id} and state = true`)
        }else{
            reservations = await pool.query(`SELECT * FROM reservation WHERE state = true`)
        }
        if (reservations.rowCount !== 0){
        res.json(reservations.rows)
        }else{
          res.send("There is no active reservation")
        }
    } catch (error) {
        res.json({ message: error.message });
    }
}

const activeReservation = async (req, res)=>{
  try {
    const { id } = req.params
    const reservation = pool.query(`UPDATE reservation SET state = true WHERE id_reservation = ${id}`)
    res.json(reservation)
    
  } catch (error) {
    res.json({ message: error.message });    
  }
}

module.exports = {
  createReservation,
  deleteReservation,
  getAllReservation,
  getAllDisablesReservation,
  activeReservation,
};
