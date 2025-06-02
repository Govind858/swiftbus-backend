 const express = require('express')
const {userRegistration,userLogin,viewTicket,autoSuggest,fetchTrip} = require('../Controller/userController')
const router = express.Router();
const verifyToken = require('../../Midddleware/verifyToken')

router.route('/userRegistration').post(userRegistration)
router.route('/userLogin').post(userLogin)
router.route('/viewTicket').get(verifyToken,viewTicket)
router.route('/auto-suggest').get(verifyToken,autoSuggest)
router.route('/fetch-trip/:tripId').get(verifyToken,fetchTrip)




module.exports = router;