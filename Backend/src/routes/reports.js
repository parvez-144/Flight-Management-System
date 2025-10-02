const express = require('express');
const { getFlightOccupancy, getCancellationsReport, getRevenueReport } = require('../controllers/reportsController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/occupancy/:scheduleId', authMiddleware, getFlightOccupancy);
router.get('/cancellations', authMiddleware, getCancellationsReport);
router.get('/revenue', authMiddleware, getRevenueReport);

module.exports = router;
