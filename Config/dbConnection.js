const express = require('express')
const mongoose = require('mongoose')

const dbConnection  = async () => {
    try {
       await mongoose.connect('mongodb+srv://user:123@cluster0.sz7m0.mongodb.net/bus-booking-app?retryWrites=true&w=majority&appName=Cluster0')
    } catch (error) {
        console.log(error)
    }
}

module.exports = dbConnection; 