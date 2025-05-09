const express = require('express')
const tripsModel = require('../Model/tripsModel')
const { message } = require('statuses')
const { json } = require('body-parser')
const ticketModel = require('../Model/ticketModel')

module.exports.saveTrips  = async (trips)  => {
    try {
        return await tripsModel.create(trips)
    } catch (error) {
        console.log(error)
    }
}

module.exports.getAllTrips = async () => {
    try {
        const trips = await tripsModel.find()
        return trips
    } catch (error) {
        console.log(error)
    }
}

module.exports.findBus = async ({from,to}) => {
    try {
        console.log({from,to},"repo")
        const trip = await tripsModel.find({
            "tripsStop.stop": { $all: [from, to] }
        });
        if(trip.length == 0){
            return{
                found:false,
                message:"no bus found between this locations"
            }
        }
        return{
            found:true,
            message:"available bus ",
            trip
        }
     } catch (error) {
        console.log(error)
    }
}

module.exports.removeTrip = async (tripId) => {
    try {
      return await  tripsModel.deleteOne({_id:tripId})
    } catch (error) {
       console.log(error) 
    }
}
 
module.exports.updateTrip = async (tripId,tripsStop,position) => {
    try {
        console.log(tripsStop)
       const updatedTrip = await tripsModel.findByIdAndUpdate(tripId,{
            $push:{
                tripsStop:{
                    $each:tripsStop,
                    $position: position || 0
                } 
            },        
        },
        {new:true,runValidators:true, maxTimeMS: 20000}
    )
    console.log(updatedTrip)
    if(!updatedTrip){
        return{
            success:false,
            message:"error occured"
        }
    }
    return{
        success:true,
        message:"update success",
        updatedTrip
    }
    } catch (error) {
        console.log(error)
    }
}

module.exports.saveTicket = async (ticketData) => {
    try {
        console.log(ticketData)
        return await ticketModel.create(ticketData)
    } catch (error) {
        console.log(error)
    }
}