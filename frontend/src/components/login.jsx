import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email.toLowerCase().trim() === email.toLowerCase().trim() && u.password === password
    );
    if (!user) return alert("Wrong email or password");

    alert(`Welcome, ${user.username}`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/home");
  };

  return (
    <div className="page-container login">
      {/* Video background */}
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

      {/* Buttons & Form appear after video loaded */}
      {videoLoaded && (
        <>
          <div className="top-buttons">
            <button className="active" onClick={() => navigate("/login")}>
              Login
            </button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>

          <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
              <button className="login" type="submit">
                Login
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
