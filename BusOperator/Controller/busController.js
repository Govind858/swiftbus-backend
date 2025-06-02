const express = require('express')
const {passwordHashing,loginFunction} = require('../UseCase/busUseCase');
const { findTrips,fetchBookings, validateTicket } = require('../Repo/busRepo');

const busRegistration = async (req,res) =>{
    console.log(req.body,"arrived")
    let data = req.body;
    const result = await passwordHashing(data);
    console.log(result,"data in controller")
    res.json({
        success:'true',
        message:'user registration successfull',
        result: data

    })
}

const busLogin = async (req,res) => {
    const data = req.body
    console.log(req.body, "controller")
    const user = await loginFunction(data)
    console.log(user,"token")    
    res.json({
        success:true,
        message:'login data',
        result:user
    })
}

const viewTrips = async (req,res) => {
    const userId = req.userId.id;
    console.log(userId)
    if (!req.userId || !req.userId.id) {
        return res.status(400).json({
            success: false,
            message: "User ID not found in token"
        });
    }
    try {
        const trips = await findTrips(userId)
        res.json({
            succes:true,
            message:"fetched trips",
            trips
        })
    } catch (error) {
        console.log(error)
    }
}

const viewBookings = async (req,res) => {

    try {
        const userId = req.userId.id;
        console.log(userId)
        const tickets = await fetchBookings(userId)
        res.json({
            success:true,
            message:'all bookings is fetched',
            tickets
        })
    } catch (error) {
        console.log(error)
    }
}

const verifyTicket = async (res,req) => {
    try {
     const ticketId = req.params.ticketId  
     const  checkingTicket = await validateTicket(ticketId) 
     res.json({
        checkingTicket
     })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {busRegistration,busLogin,viewTrips,viewBookings,verifyTicket}


