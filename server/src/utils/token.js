const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_GUEST_EXP, JWT_USER_EXP } = process.env;

function signGuestToken(guestId) {
  return jwt.sign({ sub: guestId, isGuest: true }, JWT_SECRET, { expiresIn: JWT_GUEST_EXP || '5d' });
}

function signUserToken(userId) {
  return jwt.sign({ sub: userId, isGuest: false }, JWT_SECRET, { expiresIn: JWT_USER_EXP || '7d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signGuestToken, signUserToken, verifyToken };
