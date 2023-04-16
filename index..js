const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
const { type } = require('os');
const app = express();
app.use(bodyParser.json())
app.use(cors({
    origin:'*'
}))
const port = 5000;
// Set up database connection
mongoose.connect('mongodb+srv://dpuser:dpUser@blog-app2.hfxckhs.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch((err) => {
  console.log('Error connecting to the database', err);
});

app.use ('/users', require('./routes/userRoutes'));
app.use ('/trains', require('./routes/TrainRoutes'));
// app.post('/create-new-trains', async (req, res) => {
//   try {
//     const TrainScheduleObj=new TrainSchedule(req.body)
//    await TrainScheduleObj.save();
//    // const trains = await TrainSchedule.find({});
//     res.send(TrainScheduleObj);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });


// app.post('/book-ticket', async (req, res) => {
//   const { trainId, userId, numberOfSeats } = req.body;
  
//   try {
//     const train = await TrainSchedule.findById(trainId);
    
//     if (train.seats < numberOfSeats) {
//       res.status(400).send('Not enough seats available');
//     } else {
//       train.seats -= numberOfSeats;
//       await train.save();
      
//       // Create ticket and send confirmation email
//       res.send('Ticket booked successfully');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

// // Start the server

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});