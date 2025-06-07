const express = require('express');
const router = express.Router();
const { submitApplication, getOfficerApplications } = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.post('/submit', protect, submitApplication);
router.get('/applications', protect, getOfficerApplications);

module.exports = router;
