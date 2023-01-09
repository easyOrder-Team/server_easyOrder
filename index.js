require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./app/routes");
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.listen(7481, () => {
  console.log(`Listen in ${PORT}`);
});
