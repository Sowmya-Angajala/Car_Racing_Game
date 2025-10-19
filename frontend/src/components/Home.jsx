import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    if (!loggedInUser) navigate("/login");
  }, [loggedInUser, navigate]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

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
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1>🏎️ Welcome to the Car Racing Zone!</h1>
        <p>You're logged in as: <strong>{loggedInUser}</strong></p>

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
