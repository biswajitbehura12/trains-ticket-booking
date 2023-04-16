
const mongoose = require('mongoose');

const trainScheduleSchema = new mongoose.Schema({
    Trainname: String,
    seats: {type:Number,default:100},
  },{
     timestamps:true 
  });
  module.exports = mongoose.model('TrainSchedule', trainScheduleSchema);