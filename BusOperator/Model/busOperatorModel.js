const mongoose = require('mongoose')

const busOperatorSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },

    email :{
        type:String,
        required:true
    },

    mobile :{
        type:String,
        required:true
    },

    password :{ 
        type:String,
        required:true
    }
})

const busOperatorModel = mongoose.model('busOperators',busOperatorSchema)

module.exports = busOperatorModel