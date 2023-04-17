const express = require('express')
const router = express.Router()
const auth = require('../middleWare/auth.js');

const {
    getTrains,
    createTrains,
    TrainBooking,getTrainsBooking
} = require('../controllers/TrainControl')

router.post('/create-train', createTrains)

router.get('/get-trains', getTrains);

router.post('/train-booking',auth,TrainBooking)
router.post('/train-ticket-byuser',auth,getTrainsBooking)

module.exports = router;