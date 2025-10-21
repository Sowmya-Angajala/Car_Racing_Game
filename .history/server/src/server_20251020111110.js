require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const guestRoutes = require("./routes/guest");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const app = express();
const server = http.createServer(app); // Create server from express

// 🔹 Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});

// 🔹 Socket.IO events
io.on("connection", (socket) => {
  console.log("✅ A User Connected:", socket.id);

  socket.on("playerMove", (data) => {
    console.log("🎮 Player moved:", data);
    socket.broadcast.emit("updatePlayer", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// 🔹 Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// 🔹 MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err.message));

// 🔹 Base route
app.get("/", (req, res) => {
  res.send("Backend running & DB connected 🚀");
});

// 🔹 Routes
app.use("/api/guest", guestRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// 🔹 Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
