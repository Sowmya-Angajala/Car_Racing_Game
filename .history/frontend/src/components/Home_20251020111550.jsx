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
    if (!loggedInUser) navigate("/login");
  }, [loggedInUser, navigate]);

  // Fetch user data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // 🔹 Socket connection for real-time player movement
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to game server as:", socket.id);
    });

    socket.on("updatePlayer", (data) => {
      setOthers((prev) => {
        const filtered = prev.filter((p) => p.id !== data.id);
        return [...filtered, data];
      });
    });

    return () => {
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

    // Emit position update to backend
    socket.emit("playerMove", { id: socket.id, ...newPos });
  };

  return (
    <div className="page-container">
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          padding: "40px",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <h1>🏎️ Welcome to the Car Racing Zone!</h1>
        <p>You're logged in as: <strong>{loggedInUser}</strong></p>

        <div style={{ marginTop: "20px" }}>
          <h3>Your Car Position → X: {position.x}, Y: {position.y}</h3>
          <div className="flex gap-2 justify-center mt-3">
            <button onClick={() => handleMove("up")}>Up</button>
            <button onClick={() => handleMove("down")}>Down</button>
            <button onClick={() => handleMove("left")}>Left</button>
            <button onClick={() => handleMove("right")}>Right</button>
          </div>
        </div>

        <div style={{ marginTop: "30px", textAlign: "left" }}>
          <h2>All Users:</h2>
          {users.length === 0 ? (
            <p>No user data found</p>
          ) : (
            users.map(user => (
              <div
                key={user._id}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              >
                <p><strong>Name:</strong> {user.displayName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Level:</strong> {user.progress?.level || 0}</p>
                <p><strong>Score:</strong> {user.progress?.score || 0}</p>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
          <h2>Other Players:</h2>
          {others.length === 0 ? (
            <p>No other players active</p>
          ) : (
            others.map((p) => (
              <p key={p.id}>
                Player {p.id.slice(0, 5)} → X: {p.x}, Y: {p.y}
              </p>
            ))
          )}
        </div>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 30px",
            borderRadius: "8px",
            border: "none",
            background: "#ff4b2b",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          onClick={() => {
            localStorage.removeItem("loggedInUser");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
