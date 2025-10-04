const Schedule = require('../models/Schedule');
const Flight = require('../models/Flight');

// Add a new schedule (Admin only)
exports.addSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { flight, departureTime, arrivalTime, availableSeats, status } = req.body;

    // Validate flight exists
    const existingFlight = await Flight.findById(flight);
    if (!existingFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Validate availableSeats
    if (availableSeats > existingFlight.totalSeats) {
      return res.status(400).json({
        message: `Available seats (${availableSeats}) cannot exceed flight total seats (${existingFlight.totalSeats})`
      });
    }

    const schedule = new Schedule({
      flight,
      departureTime,
      arrivalTime,
      availableSeats: availableSeats || existingFlight.totalSeats, // default if not provided
      status: status || 'ON_TIME'
    });

    await schedule.save();
    res.status(201).json({ message: 'Schedule created successfully', schedule });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update schedule (Admin only)
exports.updateSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id } = req.params;

    // If availableSeats is being updated, validate against flight capacity
    if (req.body.availableSeats) {
      const schedule = await Schedule.findById(id).populate('flight');
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }

      if (req.body.availableSeats > schedule.flight.totalSeats) {
        return res.status(400).json({
          message: `Available seats (${req.body.availableSeats}) cannot exceed flight total seats (${schedule.flight.totalSeats})`
        });
      }
    }

    const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, { new: true }).populate('flight');

    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({ message: 'Schedule updated successfully', schedule: updatedSchedule });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete schedule (Admin only)
exports.deleteSchedule = async (req, res) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { id } = req.params;
    const deleted = await Schedule.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.json({ message: 'Schedule deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all schedules (Admin & Passenger)
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('flight');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search Flights (Passenger & Admin)
exports.searchFlights = async (req, res) => {
  try {
    const { source, destination, date, airline } = req.query; // <-- from query params

    if (!source || !destination) {
      return res.status(400).json({ message: 'Source and destination are required' });
    }

    // Base query for flights
    const query = { source, destination };
    if (airline) query.airline = airline;

    const flights = await Flight.find(query);
    if (!flights.length) {
      return res.json({ schedules: [] });
    }

    const flightIds = flights.map(f => f._id);

    // Build schedule query
    const scheduleQuery = { flight: { $in: flightIds } };
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      scheduleQuery.departureTime = { $gte: start, $lt: end };
    }

    const schedules = await Schedule.find(scheduleQuery).populate('flight');
    res.json({ schedules });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

