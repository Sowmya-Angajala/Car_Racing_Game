const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const GuestSession = require('../models/guestSession');
const { signUserToken } = require('../utils/token');
const { verifyToken } = require('../utils/token');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, displayName, guestToken } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already in use' });

  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash: hash, displayName });

  if (guestToken) {
    try {
      const payload = verifyToken(guestToken);
      if (payload.isGuest) {
        const guest = await GuestSession.findOne({ guestId: payload.sub });
        if (guest) {
         
          if (!user.progress || guest.progress.lastUpdated > (user.progress.lastUpdated || 0)) {
            user.progress = guest.progress;
            await user.save();
          }
          
          await guest.deleteOne();
        }
      }
    } catch (e) {
     
      console.warn('guest merge failed', e.message);
    }
  }

  const token = signUserToken(user._id.toString());
  res.json({ token, user: { id: user._id, email: user.email, displayName: user.displayName } });
});

router.post('/login', async (req, res) => {
  const { email, password, guestToken } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  if (guestToken) {
    try {
      const payload = verifyToken(guestToken);
      if (payload.isGuest) {
        const guest = await GuestSession.findOne({ guestId: payload.sub });
        if (guest) {
          if (!user.progress || guest.progress.lastUpdated > (user.progress.lastUpdated || 0)) {
            user.progress = guest.progress;
            await user.save();
          }
          await guest.deleteOne();
        }
      }
    } catch (e) { /* ignore */ }
  }

  const token = signUserToken(user._id.toString());
  res.json({ token, user: { id: user._id, email: user.email } });
});

module.exports = router;
