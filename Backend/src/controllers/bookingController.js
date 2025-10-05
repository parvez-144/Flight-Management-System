const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');

/**
 * Book Tickets (Passenger Only, with Transactions)
 */
exports.bookTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (req.user.role !== 'PASSENGER') {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'Access denied. Passengers only.' });
    }

    const { scheduleId, seats } = req.body;
    if (!scheduleId || !seats) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Schedule ID and number of seats are required' });
    }

    // Atomically check and decrement seats
    const schedule = await Schedule.findOneAndUpdate(
      { _id: scheduleId, availableSeats: { $gte: seats } },
      { $inc: { availableSeats: -seats } },
      { new: true, session }
    );

    if (!schedule) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Not enough seats available or schedule not found' });
    }

    // Create booking inside transaction
    const booking = new Booking({
      user: req.user.userId,
      schedule: scheduleId,
      seatsBooked: seats
    });

    await booking.save({ session });

    //  Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: 'Booking confirmed', booking });

  } catch (err) {
    // Rollback on error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

/**
 * Cancel Booking (with Transactions)
 */
exports.cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const booking = await Booking.findById(id).session(session);
    if (!booking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Ensure only owner can cancel
    if (booking.user.toString() !== req.user.userId) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }

    if (booking.status === 'CANCELLED') {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    // Restore seats
    await Schedule.findByIdAndUpdate(
      booking.schedule,
      { $inc: { availableSeats: booking.seatsBooked } },
      { session }
    );

    // Update booking status
    booking.status = 'CANCELLED';
    await booking.save({ session });

    //  Commit
    await session.commitTransaction();
    session.endSession();

    res.json({ message: 'Booking cancelled successfully', booking });

  } catch (err) {
    // Rollback on error
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: err.message });
  }
};

/**
 * View Booking History (Passenger)
 */
exports.getBookingHistory = async (req, res) => {
  try {
    if (req.user.role !== 'PASSENGER') {
      return res.status(403).json({ message: 'Access denied. Passengers only.' });
    }

    const bookings = await Booking.find({ user: req.user.userId })
      .populate('schedule')
      .populate({
        path: 'schedule',
        populate: { path: 'flight' }
      });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * View All Bookings (Admin)
 */
exports.getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const bookings = await Booking.find()
      .populate('user', 'username email')
      .populate('schedule')
      .populate({
        path: 'schedule',
        populate: { path: 'flight' }
      });

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsByUser = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId })
      .populate('schedule')
      .populate({
        path: 'schedule',
        populate: { path: 'flight' }
      })
      .populate('user', 'username email');

    if (!bookings.length) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
