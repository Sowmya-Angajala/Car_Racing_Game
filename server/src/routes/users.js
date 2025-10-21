const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("displayName email progress");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user with email & password
router.post("/", async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).json({ error: "displayName, email, and password are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      displayName,
      email,
      passwordHash,
      progress: { level: 0, score: 0 }
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      _id: savedUser._id,
      displayName: savedUser.displayName,
      email: savedUser.email,
      progress: savedUser.progress
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
