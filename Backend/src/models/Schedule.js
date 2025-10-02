const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flight',
    required: true
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true,
    min: [0, 'Available seats cannot be negative']
  },
  status: {
    type: String,
    enum: ['ON_TIME', 'DELAYED', 'CANCELLED'],
    default: 'ON_TIME'
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Schedule', scheduleSchema);
