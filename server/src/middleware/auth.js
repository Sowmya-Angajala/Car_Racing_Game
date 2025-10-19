const { verifyToken } = require('../utils/token');
const GuestSession = require('../models/guestSession');
const User = require('../models/User');

async function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }
  const token = auth.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.tokenPayload = payload;
    if (payload.isGuest) {
      // attach guest session to req
      const guest = await GuestSession.findOne({ guestId: payload.sub });
      if (!guest) return res.status(401).json({ error: 'Invalid or expired guest session' });
      // check expiry server side too
      if (guest.expiresAt && guest.expiresAt < new Date()) {
        return res.status(403).json({ error: 'Guest session expired', code: 'GUEST_EXPIRED' });
      }
      req.guest = guest;
    } else {
      // regular user
      const user = await User.findById(payload.sub);
      if (!user) return res.status(401).json({ error: 'Invalid user token' });
      req.user = user;
    }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token', details: err.message });
  }
}

// specialized middleware to enforce guest limitations
function requirePlayable(req, res, next) {
  // If user is registered, always allow
  if (req.user) return next();

  // If guest, check allowed levels/time-limit
  if (req.guest) {
    const guest = req.guest;
    // If trying to access level > allowedLevels
    const requestedLevel = parseInt(req.params.level || req.body.level || req.query.level || 1, 10);
    if (requestedLevel > guest.allowedLevels) {
      return res.status(403).json({ error: 'Login required to access this level', code: 'LOGIN_REQUIRED_LEVEL' });
    }
    // check time
    const now = new Date();
    if (guest.expiresAt && guest.expiresAt < now) {
      return res.status(403).json({ error: 'Guest time expired', code: 'GUEST_EXPIRED' });
    }
    return next();
  }

  // no auth at all
  return res.status(401).json({ error: 'No valid token provided' });
}

module.exports = { authMiddleware, requirePlayable };
