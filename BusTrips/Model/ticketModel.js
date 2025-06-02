 const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

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
    },

    totalFare:{
        type:Number,
        required:true
    },
    passengerCount:{
        type:Number,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
        required:true
    }


   

   
 },{timestamps:true})

 const ticketModel = mongoose.model('tickets',ticketSchema)

 module.exports = ticketModel