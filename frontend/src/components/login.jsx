import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("loggedInUser", data.user.email);
      alert(`Welcome, ${data.user.email}`);
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="page-container login">
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
            <button className="active" onClick={() => navigate("/login")}>Login</button>
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
              <button className="login" type="submit">Login</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
