const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../middleware/auth');
const Vehicle = require('../models/Vehicle');

// @route   GET api/vehicles
// @desc    Get all vehicles for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/vehicles
// @desc    Add new vehicle
// @access  Private
router.post('/', auth, async (req, res) => {
  const { number, model } = req.body;

  try {
    // Check if vehicle exists
    let vehicle = await Vehicle.findOne({ number });
    if (vehicle) {
      return res.status(400).json({ msg: 'Vehicle already registered' });
    }

    // Generate unique QR ID
    const qrId = crypto.randomBytes(4).toString('hex') + '-' + Date.now().toString().slice(-4);

    vehicle = new Vehicle({
      userId: req.user.id,
      number,
      model,
      qrId
    });

    const savedVehicle = await vehicle.save();
    res.json(savedVehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/vehicles/:qrId
// @desc    Get vehicle by qrId (Public route for scanning)
// @access  Public
router.get('/scan/:qrId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ qrId: req.params.qrId }).select('number model active');
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
