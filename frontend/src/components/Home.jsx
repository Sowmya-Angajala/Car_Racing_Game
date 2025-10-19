import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) navigate("/login");
  }, [navigate]);

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
          maxWidth: "500px",
        }}
      >
        <h1>🏎️ Welcome to the Car Racing Zone!</h1>
        <p>You're successfully logged in. Let's race!</p>

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
