const express = require('express')
const router = express.Router();
const { busRegistration,busLogin,viewTrips,viewBookings } = require('../Controller/busController');
const verifyToken = require('../../Midddleware/verifyToken');

router.route('/register').post(busRegistration);
router.route('/login').post(busLogin);
router.route('/viewTrips').get(verifyToken,viewTrips)
router.route('/viewBookings').get(verifyToken,viewBookings)





module.exports = router;