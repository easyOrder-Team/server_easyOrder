const pool = require('../../config/bd');

const orderReservation = (dbData) => {
  allData = dbData.rows.map((r) => {
    return {
      id: r.id_reservation,
      amount_persons: r.amount_persons,
      date: r.date,
      hour: r.hour,
      state: r.state,
      id_profile: r.id_profile,
      id_site: r.id_site,
      avalible: r.avalible,
      num_table: [{ num_table: r.num_table }],
    };
  });
  let notRepeat = [];

  for (let i = 0; i < allData.length; i++) {
    if (notRepeat.findIndex((p) => p.id === allData[i].id) === -1)
      notRepeat.push(allData[i]);
    else {
      let index = notRepeat.findIndex((p) => p.id === allData[i].id);
      notRepeat[index].num_table = [
        ...notRepeat[index].num_table,
        ...allData[i].num_table,
      ];
    }
  }
  return notRepeat;
};

const createReservation = async (req, res) => {
  try {
    const { amount_persons, date, hour, id_profile, num_table } = req.body;
    let reservation
    for (let i = 0; i < num_table.length; i++) {
      reservation = await pool.query(
        `SELECT * FROM reservation 
        INNER JOIN reservation_site ON reservation_site.id_reservation = reservation.id_reservation
        INNER JOIN site ON site.id_site = reservation_site.id_site WHERE date = '${date}' and hour = '${hour}' and num_table = ${num_table[i]} and state = true`
      );      
    }
    if (reservation.rowCount === 0) {
      let allSite = await pool.query(`SELECT * FROM site`);
      allSite = allSite.rows;
      await pool.query(
        `INSERT INTO reservation( amount_persons, date, hour, id_profile) VALUES ( ${amount_persons}, '${date}', '${hour}', '${id_profile}')`
      );
      let lastReservation = await pool.query(
        "SELECT * FROM reservation WHERE id_reservation = (SELECT MAX(id_reservation) FROM reservation);"
      );
      lastReservation = lastReservation.rows[0].id_reservation;


      for (let i = 0; i < allSite.length; i++) {
        for (let j = 0; j < num_table.length; j++) {
          if (allSite[i].id_site === num_table[j]) {
            await pool.query(
              `INSERT INTO reservation_site (id_reservation, id_site) VALUES('${lastReservation}','${allSite[i].id_site}' )`
            );
          }
        }
      }

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
    await pool.query(
      `UPDATE reservation SET state = false WHERE id_reservation = ${id}`
    );
    return res.json("The reservation has been deleted");
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllDisablesReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservations = await pool.query(
      `SELECT * FROM reservation WHERE state = false and id_profile = ${id}`
    );
    console.log(reservations.rows);
    if (reservations.rowCount !== 0) {
      res.json(reservations.rows);
    } else {
      res.send("No reservations found deleted");
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getAllReservation = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req)
    let allData = [];
    let reservations;
    if (id) {
      reservations = await pool.query(`SELECT * FROM reservation 
            INNER JOIN reservation_site ON reservation_site.id_reservation = reservation.id_reservation
            INNER JOIN site ON site.id_site = reservation_site.id_site WHERE reservation.id_profile = '${id}' and state = true
            `);
              allData = orderReservation(reservations);
              return res.json(allData);
            
    } else {
      reservations = await pool.query(
        `SELECT * FROM reservation
        INNER JOIN reservation_site ON reservation_site.id_reservation = reservation.id_reservation
        INNER JOIN site ON site.num_table = reservation_site.id_site WHERE state = true`
      );
        allData = orderReservation(reservations);
        return res.json(allData);
      
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const activeReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const reservation = pool.query(
      `UPDATE reservation SET state = true WHERE id_reservation = ${id}`
    );
    res.send("la reserva se activo satisfactoriamente");
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  getAllReservation,
  getAllDisablesReservation,
  activeReservation,
};
