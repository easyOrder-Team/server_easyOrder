const express = require('express');
const { createProfile, deleteUser, activeUser, getDisablesUser } = require('../controllers/profile');
const router = express.Router();







router.post('/', createProfile)




router.delete('/:id', deleteUser)
router.put('/:id', activeUser)
router.get('/disables', getDisablesUser)


module.exports = router