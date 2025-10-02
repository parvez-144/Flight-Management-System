const express = require('express');
const cors = require('cors');
const authRoutes=require('./src/routes/auth')   
const flightRoutes=require('./src/routes/flight')
const flightSchedules=require('./src/routes/schedule')
const bookingRoutes=require('./src/routes/booking')
const reportRoutes=require('./src/routes/reports')
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/schedules', flightSchedules);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reports', reportRoutes);



module.exports = app;
