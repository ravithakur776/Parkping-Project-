const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  number: { type: String, required: true, uppercase: true },
  model: { type: String, required: true },
  qrId: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
