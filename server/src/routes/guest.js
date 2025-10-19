const express = require('express');
const { v4: uuidv4 } = require('uuid');
const GuestSession = require('../models/guestSession');
const { signGuestToken } = require('../utils/token');

const router = express.Router();

// POST /api/guest/start
router.post('/start', async (req, res) => {
  const timeLimitSeconds = parseInt(req.body.timeLimitSeconds || process.env.DEFAULT_GUEST_SECONDS || 300, 10);
  const allowedLevels = parseInt(req.body.allowedLevels || 1, 10);
  const guestId = uuidv4();
  const startAt = new Date();
  const expiresAt = new Date(startAt.getTime() + timeLimitSeconds * 1000);

  const guest = await GuestSession.create({
    guestId, startAt, expiresAt, timeLimitSeconds, allowedLevels,
    ip: req.ip, deviceInfo: req.headers['user-agent']
  });

  const token = signGuestToken(guestId);

  res.json({
    guestId,
    token,
    expiresAt,
    allowedLevels,
    timeLimitSeconds
  });
});

// GET /api/guest/progress
router.get('/progress', async (req, res) => {
  // expects authMiddleware earlier attached req.guest
  const { guest } = req;
  if (!guest) return res.status(401).json({ error: 'Guest token required' });
  res.json({ progress: guest.progress, expiresAt: guest.expiresAt, allowedLevels: guest.allowedLevels });
});


router.post('/progress', async (req, res) => {
  const { guest } = req;
  if (!guest) return res.status(401).json({ error: 'Guest token required' });
  // Enforce time and level server-side:
  const now = new Date();
  if (guest.expiresAt < now) return res.status(403).json({ error: 'Guest time expired' });

  const { level, score, state } = req.body;
  // don't allow progress beyond allowed levels
  if (level && level > guest.allowedLevels) {
    return res.status(403).json({ error: 'Cannot progress beyond allowed guest level' });
  }

  guest.progress = {
    level: level ?? guest.progress.level,
    score: score ?? guest.progress.score,
    state: state ?? guest.progress.state,
    lastUpdated: new Date()
  };
  await guest.save();
  res.json({ success: true, progress: guest.progress });
});

module.exports = router;
