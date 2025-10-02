const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware)

// Admin routes
router.post('/add', scheduleController.addSchedule);
router.put('/update/:id', scheduleController.updateSchedule);
router.delete('/delete/:id', scheduleController.deleteSchedule);

// Public (Passenger + Admin)
router.get('/', scheduleController.getSchedules);
router.get('/search', scheduleController.searchFlights);

module.exports = router;
