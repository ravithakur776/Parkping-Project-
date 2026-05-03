const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  status: { type: String, enum: ['Pending', 'Resolved'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', RequestSchema);
