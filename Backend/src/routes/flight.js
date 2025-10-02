const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');
const authMiddleware = require('../middlewares/authMiddleware'); 

// All routes require login
router.use(authMiddleware);

// Admin-only routes
router.post('/add', flightController.addFlight);
router.put('/update/:id', flightController.updateFlight);
router.delete('/delete/:id', flightController.deleteFlight);

// Public (any logged in user)
router.get('/', flightController.getFlights);

module.exports = router;
