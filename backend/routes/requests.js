const express = require('express');
const router = express.Router();
const twilio = require('twilio');
const auth = require('../middleware/auth');
const Request = require('../models/Request');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// @route   GET api/requests
// @desc    Get all incoming requests/alerts for logged in user's vehicles
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // 1. Find all vehicles owned by the user
    const userVehicles = await Vehicle.find({ userId: req.user.id });
    const vehicleIds = userVehicles.map(v => v._id);

    // 2. Find all requests for these vehicles
    const requests = await Request.find({ vehicleId: { $in: vehicleIds } })
      .populate('vehicleId', 'number model')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Initialize Twilio client
let twilioClient = null;
try {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  }
} catch (e) {
  console.log('Twilio configuration missing or invalid. SMS will not be sent.');
}

// @route   POST api/requests/:qrId
// @desc    Trigger alert for a vehicle
// @access  Public
router.post('/:qrId', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ qrId: req.params.qrId });
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    // Cooldown check (prevent spam)
    const recentRequest = await Request.findOne({ vehicleId: vehicle._id })
      .sort({ createdAt: -1 });
    
    if (recentRequest) {
      const timeDiff = new Date() - new Date(recentRequest.createdAt);
      if (timeDiff < 60000) { // 1 minute cooldown
        return res.status(429).json({ msg: 'Please wait before sending another alert' });
      }
    }

    const request = new Request({
      vehicleId: vehicle._id,
      status: 'Pending'
    });

    await request.save();

    // Trigger Notification Logic
    const owner = await User.findById(vehicle.userId);
    console.log(`[ALERT] Sending notification to ${owner.email} for vehicle ${vehicle.number}`);
    
    // Twilio SMS
    if (twilioClient && owner.phone && process.env.TWILIO_PHONE_NUMBER) {
      try {
        await twilioClient.messages.create({
          body: `🚨 PARKPING ALERT: Your vehicle (${vehicle.number}) is blocking someone. Please move it ASAP.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: owner.phone
        });
        console.log('SMS sent successfully via Twilio.');
      } catch (smsErr) {
        console.error('Failed to send SMS:', smsErr.message);
      }
    } else {
      console.log('Skipping SMS: Twilio not configured or owner has no phone number attached.');
    }

    res.json({ msg: 'Alert sent to the owner successfully', request });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
