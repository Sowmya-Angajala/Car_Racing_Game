const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  level: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  state: { type: mongoose.Schema.Types.Mixed, default: {} },
  lastUpdated: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  passwordHash: { type: String },
  displayName: String,
  progress: { type: ProgressSchema, default: () => ({}) }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
