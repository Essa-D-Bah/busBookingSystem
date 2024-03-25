const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    bus: {
        type:  mongoose.Types.ObjectId, 
        ref: 'Bus'
    },
    startCity: {type:String},
    destination: {type: String},
    price:{type : Number} ,    
    departureDate: {type:Date},
    availableSeat:{type:Number, default:0}       
})


const Trip = mongoose.model( "Trip", tripSchema);
module.exports=Trip;