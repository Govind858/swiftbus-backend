const userModel = require('../Model/userModel')
const ticketModel = require('../../BusTrips/Model/ticketModel')
const tripsModel = require('../../BusTrips/Model/tripsModel')


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

module.exports.findLocation = async (q) => {
  try {
    const regex = new RegExp(q, 'i'); // 'i' for case-insensitive
    
    // Find documents with matching stops
    const trips = await tripsModel.find(
      { "tripsStop.stop": regex }
    ).limit(5);
    
    // Extract only the unique stop names that match the query
    const matchingStops = new Set();
    
    trips.forEach(trip => {
      trip.tripsStop.forEach(stop => {
        if (regex.test(stop.stop)) {
          matchingStops.add(stop.stop);
        }
      });
    });
    
    // Convert Set to Array
    return Array.from(matchingStops);
  } catch (error) {
    console.log("Error in findLocation:", error);
    return [];
  }
};


module.exports.findTripById = async (id) => {
  try {
    console.log(id)
    const trip = await tripsModel.findOne({ _id: id });
   return trip;
  } catch (error) {
    console.log(error)
  }
}