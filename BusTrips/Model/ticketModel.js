 const mongoose = require('mongoose')

 const stopsSchema = new mongoose.Schema({
    stop:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    distanceFromStart: {
        type: Number,
        required: true
    }
})

 const ticketSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    
    busOperatorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'busoperator'   
    },

    fromStop:stopsSchema,
    toStop:stopsSchema,
  
    busName:{
        type:String,
        required:true
    },

    distance:{
        type:Number,
        required:true
    },

    fare:{
        type:Number,
        required:true
    }

   

   
 })

 const ticketModel = mongoose.model('tickets',ticketSchema)

 module.exports = ticketModel