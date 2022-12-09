const express = require('express')
const router = express.Router();
const {createProfile, getAllProfile, getProfile} = require('../controllers/profile')

router.post('/', createProfile)
router.get('/', getAllProfile)
router.get('/:id', getProfile)














module.exports = router