const express = require('express')
const router = express.Router();
const verifyToken = require('../../Midddleware/verifyToken')
const { createTrips, viewAllTrips, searchAvailableBus,deleteTrip,modifyTrip,createOrder,createTicket } = require('../Controller/tripsController');


router.route('/').post(verifyToken,createTrips)
router.route('/').get(viewAllTrips)
router.route('/search').post(verifyToken,searchAvailableBus)
router.route('/:id').delete(deleteTrip)
router.route('/:id').patch(modifyTrip)
router.route('/createOrder').post(createOrder)
router.route('/ticket').post(verifyToken,createTicket)


module.exports = router;