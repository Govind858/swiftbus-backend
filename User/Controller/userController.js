const express = require('express')
const {passwordHashing,loginFunction} = require('../UseCase/userUseCase');
const { fetchTicket } = require('../Repo/userRepo');
const verifyToken = require('../../Midddleware/verifyToken')

const userRegistration = async (req,res) =>{
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

const userLogin = async (req,res) => {
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

const viewTicket = async (req,res) => {

    try {
        const userId = req.userId.id;
        console.log(userId)
        const tickets = await fetchTicket(userId)
        res.json({
            success:true,
            message:'all tickets is fetched',
            tickets
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {userRegistration,userLogin,viewTicket}