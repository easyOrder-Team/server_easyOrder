require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./app/routes");
const PORT = process.env.PORT || 3000;
const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER,
};

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);
app.use(auth(config));

app.listen(PORT, () => {
  console.log(`Listen in ${PORT}`);
});
