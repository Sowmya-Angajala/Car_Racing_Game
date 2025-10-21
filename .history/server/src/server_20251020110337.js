require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const {server}=require("socket.io")
const cors=require("cors")
const guestRoutes = require("./routes/guest");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // New route

const app = express();
app.use(cors())
const server=http.createServer(app)
const io=new erver
// Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

// Base route
app.get("/", (req, res) => {
  res.send("Backend running & DB connected");
});

// Routes
app.use("/api/guest", guestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // NEW

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
