import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName: username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      localStorage.setItem("loggedInUser", data.user.email);
      alert("Registration successful! Redirecting to Home...");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page-container register">
      <video
        autoPlay
        muted
        loop
        className="background-video"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source
          src="https://res.cloudinary.com/dk8x0cl0c/video/upload/v1690000000/stock-footage-animated-video-of-old-racing-car-game-in-bit-style-with-other-cars-competing-arcade-pixel-d_j0kqfs.webm"
          type="video/webm"
        />
      </video>

      {videoLoaded && (
        <>
          <div className="top-buttons">
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="active" onClick={() => navigate("/register")}>Register</button>
          </div>

          <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="register" type="submit">Register</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
