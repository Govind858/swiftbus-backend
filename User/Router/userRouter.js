 const express = require('express')
const {userRegistration,userLogin,viewTicket,autoSuggest} = require('../Controller/userController')
const router = express.Router();
const verifyToken = require('../../Midddleware/verifyToken')

router.route('/userRegistration').post(userRegistration)
router.route('/userLogin').post(userLogin)
router.route('/viewTicket').get(verifyToken,viewTicket)
router.route('/auto-suggest').get(verifyToken,autoSuggest)




module.exports = router;