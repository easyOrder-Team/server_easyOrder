("use strict");
const nodemailer = require("nodemailer");

const sendNotification = async (req, res) => {
  const { email, id_order, estado, valor, fecha } = req.query;

  async function main(correo, order, estado, valor, fecha) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "easyorderpf@gmail.com", // generated ethereal user
        pass: "qabfroptwbnvffqz", // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"EasyOrder" <easyorderpf@gmail.com>', // sender address
      to: `${correo}`, // list of receivers
      subject: `Confirmación de pago para la orden: ${order}`, // Subject line
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            @media only screen and (min-width: 600px) {
              body {
                width: 100% !important;
                height: 600px !important;
                margin: 0px;
              }
              .fondoSuperior {
                width: 35rem;
                height: 12rem;
                position: absolute;
              }
              .fondoInferior {
                width: 35rem;
                height: 12rem;
                position: absolute;
                top: 25rem;
              }
              .parrafo {
                font-family: Arial, Helvetica, sans-serif;
                position: relative;
                top: 15rem;
                margin-left: 30px;
                width: 30rem;
                color: gray;
              }
              .container {
                width: 100% !important;
                height: 600px !important;
                margin: 0px;
                position: relative;
                left: 35rem;
                margin-left:25%;
                padding: 10px;
               
              }
              span {
                font-weight: bold;
              }
            }
            @media only screen and (max-width: 600px) {
              body,
              html {
                height: 100vh;
                width: 100vh;
                margin: 0px;
                position: relative;
              }
              .fondoSuperior {
                width: 35rem;
                height: 12rem;
                position: absolute;
              }
              .fondoInferior {
                width: 35rem;
                height: 12rem;
                position: absolute;
                top: 25rem;
              }
              .parrafo {
                font-family: Arial, Helvetica, sans-serif;
                position: relative;
                top: 15rem;
                margin-left: 30px;
                width: 30rem;
                color: gray;
              }
              .container {
                width: 35rem;
                height: 30rem;
                position: relative;
                left: 35rem;
      
                padding: 10px;
                margin: 0;
              }
              span {
                font-weight: bold;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img
              class="fondoSuperior"
              src="https://res.cloudinary.com/dypjcpbis/image/upload/v1673133435/EasyOrder_BD/parte_superior_lz4lqa.png"
              alt=""
            />
            <p class="parrafo">
              <span
                >Gracias por utilizar nuestros servicios. Los siguientes son los datos
                de la transacción:
              </span>
              <br />
              <br />
              Estado de la transacción: <span>${estado}</span>
              <br />
              No factura: ${order}
              <br />
              Valor transacción: $ ${valor}
              <br />
              Fecha de transacción: ${fecha}
            </p>
            <img
              class="fondoInferior"
              src="https://res.cloudinary.com/dypjcpbis/image/upload/v1673133435/EasyOrder_BD/parte_inferior_wyqjwu.png"
              alt=""
            />
          </div>
        </body>
      </html>
    `,
    });
    res.send(info.messageId);
  }
  main(email, id_order, estado, valor, fecha).catch(console.error());
};

module.exports = {
  sendNotification,
};
