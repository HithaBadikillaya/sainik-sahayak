const Application = require('../models/Application');

// Submit a new application
const submitApplication = async (req, res) => {
  try {
    const { title, description } = req.body;
    const officerId = req.user.id; // Ensure auth middleware sets req.user

    const newApp = new Application({
      officer: officerId,
      title,
      description,
      status: 'Pending',
      submittedAt: new Date(),
    });

    const savedApp = await newApp.save();
    return res.status(201).json({ message: 'Application submitted', app: savedApp });
  } catch (error) {
    console.error('Error in submitApplication:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get all applications submitted by the logged-in officer
const getOfficerApplications = async (req, res) => {
  try {
    const officerId = req.user.id;

    const applications = await Application.find({ officer: officerId }).sort({ submittedAt: -1 });

    return res.status(200).json({ applications });
  } catch (error) {
    console.error('Error in getOfficerApplications:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  submitApplication,
  getOfficerApplications,
};
