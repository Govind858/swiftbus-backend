const express = require('express')
const {passwordHashing,loginFunction} = require('../UseCase/userUseCase');
const { fetchTicket,findLocation } = require('../Repo/userRepo');
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

const autoSuggest = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json({ result: "query is null" });

        const locations = await findLocation(q);
        if (!locations || locations.length === 0) {
            return res.json({ result: "No matching data found" });
        }

        res.json(locations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {userRegistration,userLogin,viewTicket,autoSuggest}