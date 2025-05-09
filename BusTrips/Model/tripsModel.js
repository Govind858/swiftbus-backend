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

    const tripsSchema = new mongoose.Schema({
        busName:{
            type:String,
            required:true
        },

        tripsStop:{
            type:[stopsSchema],
            required:true
            },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'busoperators',
            required: true
        }       

    },{timestamps:true});


    const tripsModel = mongoose.model('trips',tripsSchema)

    module.exports = tripsModel