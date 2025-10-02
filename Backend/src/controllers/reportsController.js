const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');
const Flight = require('../models/Flight');

// Ensure only Admin can access
const checkAdmin = (req, res) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Report 1: Flight Occupancy
exports.getFlightOccupancy = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') return checkAdmin(req, res);

    const { scheduleId } = req.params;

    const schedule = await Schedule.findById(scheduleId).populate('flight');
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });

    const totalSeats = schedule.flight.totalSeats;
    const bookedSeats = totalSeats - schedule.availableSeats;
    const occupancyRate = ((bookedSeats / totalSeats) * 100).toFixed(2);

    res.json({
      flight: schedule.flight.airline,
      route: `${schedule.flight.source} → ${schedule.flight.destination}`,
      departure: schedule.departureTime,
      totalSeats,
      bookedSeats,
      availableSeats: schedule.availableSeats,
      occupancyRate: `${occupancyRate}%`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Report 2: Cancellations Report
exports.getCancellationsReport = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') return checkAdmin(req, res);

    const cancellations = await Booking.aggregate([
      { $match: { status: 'CANCELLED' } },
      {
        $lookup: {
          from: 'schedules',
          localField: 'schedule',
          foreignField: '_id',
          as: 'schedule'
        }
      },
      { $unwind: '$schedule' },
      {
        $lookup: {
          from: 'flights',
          localField: 'schedule.flight',
          foreignField: '_id',
          as: 'flight'
        }
      },
      { $unwind: '$flight' },
      {
        $project: {
          bookingId: '$_id',
          user: 1,
          seatsBooked: 1,
          cancelledAt: '$bookingTime',
          airline: '$flight.airline',
          route: { $concat: ['$flight.source', ' → ', '$flight.destination'] },
          departure: '$schedule.departureTime'
        }
      }
    ]);

    res.json({ totalCancellations: cancellations.length, cancellations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Report 3: Revenue Report (Assume fixed ticket price or add fare to schedule)
exports.getRevenueReport = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') return checkAdmin(req, res);

    // assume each seat = 5000 INR for now
    const pricePerSeat = 5000;

    const bookings = await Booking.aggregate([
      { $match: { status: 'CONFIRMED' } },
      {
        $group: {
          _id: '$schedule',
          totalSeatsBooked: { $sum: '$seatsBooked' }
        }
      }
    ]);

    // populate flight & schedule info
    const detailedReport = await Promise.all(
      bookings.map(async b => {
        const schedule = await Schedule.findById(b._id).populate('flight');
        return {
          airline: schedule.flight.airline,
          route: `${schedule.flight.source} → ${schedule.flight.destination}`,
          departure: schedule.departureTime,
          totalSeatsBooked: b.totalSeatsBooked,
          revenue: b.totalSeatsBooked * pricePerSeat
        };
      })
    );

    const totalRevenue = detailedReport.reduce((sum, r) => sum + r.revenue, 0);

    res.json({ totalRevenue, report: detailedReport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
