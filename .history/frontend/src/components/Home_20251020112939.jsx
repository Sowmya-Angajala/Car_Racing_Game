import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const loggedInUser = localStorage.getItem("loggedInUser");

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [others, setOthers] = useState([]);

  useEffect(() => {
    console.log("Home mounted"); // ✅ Check component mount
    if (!loggedInUser) navigate("/login");
  }, [loggedInUser, navigate]);

  // Fetch users
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Socket connection
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to backend, socket ID:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err);
    });

    socket.on("updatePlayer", (data) => {
      console.log("📩 Update received:", data); // ✅ Check if events are coming
      setOthers((prev) => {
        const filtered = prev.filter((p) => p.id !== data.id);
        return [...filtered, data];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("updatePlayer");
    };
  }, []);

  const handleMove = (dir) => {
    const newPos = { ...position };
    if (dir === "up") newPos.y -= 10;
    if (dir === "down") newPos.y += 10;
    if (dir === "left") newPos.x -= 10;
    if (dir === "right") newPos.x += 10;

    setPosition(newPos);
    socket.emit("playerMove", { id: socket.id, ...newPos });
    console.log("⬆️ Emitted playerMove:", { id: socket.id, ...newPos });
  };

  return (
    <div className="page-container">
      <h1>🏎️ Car Racing Game</h1>
      <p>Logged in as: {loggedInUser}</p>
      <div>
        <h3>Your Car Position → X: {position.x}, Y: {position.y}</h3>
        <button onClick={() => handleMove("up")}>Up</button>
        <button onClick={() => handleMove("down")}>Down</button>
        <button onClick={() => handleMove("left")}>Left</button>
        <button onClick={() => handleMove("right")}>Right</button>
      </div>
      <div>
        <h2>Other Players</h2>
        {others.map(p => (
          <p key={p.id}>{p.id.slice(0, 5)} → X: {p.x}, Y: {p.y}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
