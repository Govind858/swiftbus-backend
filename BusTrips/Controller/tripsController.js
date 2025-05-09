const express = require('express')
const { saveTrips, getAllTrips, findBus,removeTrip, updateTrip, saveTicket} = require('../Repo/tripsRepo')
const { message } = require('statuses')
const RazorPay = require('../../Payments/RazorPay')
const veriryToken = require('../../Midddleware/verifyToken')

const createTrips = async (req, res) => {
    const trips = req.body;
    const userId = req.userId.id;
    console.log(userId)

    if (!req.userId || !req.userId.id) {
        return res.status(400).json({
            success: false,
            message: "User ID not found in token"
        });
    }

    trips.createdBy = req.userId.id;  // ✅ Attach creator's ID

    try {
        const busTrips = await saveTrips(trips); // use modified `trips`
        res.json({
            success: true,
            message: "Successfully created new route",
            busTrips
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error while creating trip"
        });
    }
};


const viewAllTrips = async (req,res) => {
    try {
        const trips = await getAllTrips()
        res.json({
            success:true,
            message:"successfully create new route",
            trips
        })
    } catch (error) {
        console.log(error)
    }
}

const searchAvailableBus = async (req,res) => {
    try {
        console.log(req.body,"sendData")
        const {from,to} = req.body
        
        
        if(!from || !to){
            return res.send("two location are required")
        }

        const availableBus = await findBus({from,to})
        if(!availableBus.found){
           return res.status(404).json({
                success:false,
                message:availableBus.message
            })
        }
        res.json({
            success:true,
            message:"successfully find available bus",
            availableBus
        })
    } catch (error) {
        console.log(error)
    }
}

const deleteTrip = async (req,res) => {
    try {
        const tripId = req.params.id
        await removeTrip(tripId)
        res.json({
                success:true,
                message:"successfully deleted the trip"
             })
    } catch (error) {
        console.log(error)
    }

}

const modifyTrip = async (req,res) => {
    try {
        const tripId = req.params.id
        const {tripsStop,position} = req.body
        console.log(tripsStop)
        const updated = await updateTrip(tripId,tripsStop,position)
        console.log(updated)    
        if(!updated){
            res.json({
                message:"an error occured"
            })
        }
        res.json({
            success:true,
            message:"successfully updated the trip",
            updated 
        })
    } catch (error) {
        console.log(error)
    }
}
const createOrder = async (req,res)=>{
    try {
        let {amount} = req.body
        const options = {
            amount: amount,
            currency: "INR",
            receipt: "any unique id for every order",
            payment_capture: 1
        };
        const response = await RazorPay.orders.create(options)
        console.log(response)
        res.json(response)
    } catch (error) {
        
    }
}

const createTicket = async (req,res) => {
    try {
        const { distance, fare, busName, fromStop, toStop,busOperatorId } = req.body;
        const userId = req.userId.id || req.userId;
        
        const ticketData = {
          userId,
          busOperatorId, 
          busName,
          fromStop,
          toStop,
          distance,
          fare,
        };

        const ticket = await saveTicket(ticketData) 
        
        res.json({
            success:true,
            message:"data recived",
            ticket
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createTrips,viewAllTrips,searchAvailableBus,deleteTrip,modifyTrip,createOrder,createTicket }