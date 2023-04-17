const  trainScheduleSchema =require("../models/TrainData");
const trainScheduleBookingSchema=require("../models/TrainBooking");

const colors = require('colors');
const getTrains = async (req, res) => {
    try {
         const TrainDetails = await trainScheduleSchema.find();
        res.json(TrainDetails);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const getTrainsBooking = async (req, res) => {
    try {
         const TrainDetailsBook = await trainScheduleBookingSchema.find({ userId:req.user.id }).populate("trainId");
        res.json(TrainDetailsBook);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}
const createTrains = async (req, res) => {
    try {
       
        const newTrainObj = new trainScheduleSchema(req.body);
        await newTrainObj.save();
        if(!newTrainObj) return res.status(400).json([{ message: 'Blog not created', type: 'error' }]);
        res.json(newTrainObj);
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

const TrainBooking = async (req, res) => {
    try {
      //  console.log(req.user.id,"jhgjhg")
        let numberOfSeats=Number(req.body.numberOfSeats);
        const train = await trainScheduleSchema.findOne({_id:req.body.trainId});
        if(numberOfSeats>7){
            res.status(400).send('At a time you can only book atmost 7 seats');
        }
        
      else  if (train.seats < numberOfSeats) {
            res.status(400).send('Not enough seats available');
        }else{
        let availableseat= train.seats;
        let arr =[];
        for(let i=100-availableseat+1; i<=100-availableseat+numberOfSeats;i++){
           arr.push(i) ;
        }
      const TrainScheduleBookingSchemaObj = new trainScheduleBookingSchema({
        trainId:req.body.trainId,
         userId:req.user.id,                                        
          noOfSeatBooking:req.body.noOfSeatBooking,
          seatNumber:arr
      });
    await  TrainScheduleBookingSchemaObj.save();
let diif=availableseat-numberOfSeats
await trainScheduleSchema.findOneAndUpdate({
   _id:req.body.trainId
},{
    seats:diif
},{
    new:true
});
  res.json(TrainScheduleBookingSchemaObj)
}
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    getTrains,
    createTrains,
    TrainBooking,getTrainsBooking

} 