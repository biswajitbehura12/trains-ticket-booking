const mongoose = require('mongoose');
const trainScheduleBookingSchema= new mongoose.Schema({
    trainId:{type: mongoose.Schema.Types.ObjectId, ref:"TrainSchedule"},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },                                        
      noOfSeatBooking:{type:Number,min:1, max:7},
      seatNumber:{type: Array,default:[]}
      
},{
    timestamps:true 
})

module.exports = mongoose.model('TrainScheduleBooking', trainScheduleBookingSchema);