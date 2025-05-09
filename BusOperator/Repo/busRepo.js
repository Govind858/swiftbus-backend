const tripsModel = require('../../BusTrips/Model/tripsModel')
const busOperatorModel = require('../Model/busOperatorModel')
const ticketModel = require('../../BusTrips/Model/ticketModel')


module.exports.createUser = async (data) => {
    await busOperatorModel.create(data)
    return true
    console.log(data,"repo")
}

module.exports.findUser = async (data) => {
    let {email} = data 
    return await busOperatorModel.find({email:email})
}

module.exports.findTrips = async (userId) => {
    try {
        const trips = await tripsModel.find({createdBy:userId})
        return trips
    } catch (error) {
        console.log(error)
    } 
}

module.exports.fetchBookings = async (userId) => {
   try {
    const bookings = await  ticketModel.find({busOperatorId:userId})
    console.log(bookings)
    return bookings
   } catch (error) {
    console.log(error)
   }
}