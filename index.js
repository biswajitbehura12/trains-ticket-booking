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
const connectingD=async()=>{
 await mongoose.connect('mongodb+srv://dpuser:dpUser@blog-app2.hfxckhs.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.log('Error connecting to the database', err);
  });
}
connectingD();

app.use ('/users', require('./routes/userRoutes'));
app.use ('/trains', require('./routes/TrainRoutes'));


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});