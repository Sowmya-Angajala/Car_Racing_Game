const mongoose = require('mongoose');

const GuestProgressSchema = new mongoose.Schema({
  level: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  state: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastUpdated: { type: Date, default: Date.now }
});

const GuestSessionSchema = new mongoose.Schema({
  guestId: { type: String, index: true, required: true, unique: true },
  startAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } }, // TTL index
  timeLimitSeconds: { type: Number, default: 300 }, // e.g., 5 minutes
  allowedLevels: { type: Number, default: 1 },
  progress: { type: GuestProgressSchema, default: () => ({}) },
  ip: String,
  deviceInfo: String
}, { timestamps: true });

module.exports = mongoose.model('GuestSession', GuestSessionSchema);
