const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/officer', protect, authorizeRoles('officer'), (req, res) => {
  res.json({ message: `Welcome Officer ${req.user.name}` });
});

router.get('/admin', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}` });
});

router.get('/family', protect, authorizeRoles('family'), (req, res) => {
  res.json({ message: `Welcome Family Member ${req.user.name}` });
});

module.exports = router;
