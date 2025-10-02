const Flight = require('../models/Flight');

// Add a new flight (ADMIN only)
exports.addFlight = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { airline, source, destination, totalSeats } = req.body;

        const newFlight = new Flight({ airline, source, destination, totalSeats });
        await newFlight.save();

        res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all flights
exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.json(flights);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update flight
exports.updateFlight = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { id } = req.params;
        console.log("Updating flight with ID:", req.body);
        const updatedFlight = await Flight.findByIdAndUpdate(
            id,
            { $set: req.body },   // 👈 force update
            { new: true, runValidators: true }
        );
        

        if (!updatedFlight) return res.status(404).json({ message: 'Flight not found' });

        res.json({ message: 'Flight updated successfully', flight: updatedFlight });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete flight
exports.deleteFlight = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { id } = req.params;
        const deletedFlight = await Flight.findByIdAndDelete(id);

        if (!deletedFlight) return res.status(404).json({ message: 'Flight not found' });

        res.json({ message: 'Flight deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
