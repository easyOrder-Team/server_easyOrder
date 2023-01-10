const express = require("express");
const router = express.Router();
const {sendNotification} = require('../controllers/notification')

router.get("/", sendNotification)

module.exports = router