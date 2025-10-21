require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const { authMiddleware } = require("./middleware/auth");
const guestRoutes = require("./routes/guest");
const authRoutes = require("./routes/auth");

const app = express();

// --- Middleware ---
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// --- Connect MongoDB ---
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.error(" MongoDB Error:", err.message));

// --- Base Route ---
app.get("/", (req, res) => {
  res.send(" Car Racing Game Backend Server Running & DB Connected");
});

// --- Auth Middleware (attach user or guest info) ---
app.use(authMiddleware);

// --- Routes ---
app.use("/api/guest", guestRoutes);
app.use("/api/auth", authRoutes);

// --- Protected Game Example ---
const { requirePlayable } = require("./middleware/auth");
app.get("/api/game/level/:level", requirePlayable, (req, res) => {
  res.json({
    level: req.params.level,
    message: "Level data accessible",
    userType: req.user ? "Registered User" : "Guest User",
  });
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
