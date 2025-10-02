const express = require('express');
const {
  bookTicket,
  cancelBooking,
  getBookingHistory,
  getAllBookings
} = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(authMiddleware)
// Passenger routes
router.post('/book', bookTicket);
router.put('/cancel/:id', cancelBooking);
router.get('/history', getBookingHistory);

// Admin route
router.get('/all',getAllBookings);

module.exports = router;
