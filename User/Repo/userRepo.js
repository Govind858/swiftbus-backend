const userModel = require('../Model/userModel')
const ticketModel = require('../../BusTrips/Model/ticketModel')


module.exports.createUser = async (data) => {
    return await userModel.create(data)
}

module.exports.findUser = async (data) => {
    let {email} = data 
    return await userModel.find({email:email})
}

module.exports.fetchTicket = async (userId) => {
   try {
    return await  ticketModel.find({userId:userId})
   } catch (error) {
    console.log(error)
   }
}