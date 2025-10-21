import { useEffect, useState } from "react";
import socket from "../socket";

export default function PlayGame() {
  const [position, setPosition] = useState({ x: 200, y: 400 });
  const [others, setOthers] = useState([]);
  const loggedInUser = localStorage.getItem("loggedInUser");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to backend, socket ID:", socket.id);
    });

    socket.on("updatePlayer", (data) => {
      setOthers((prev) => {
        const filtered = prev.filter((p) => p.id !== data.id);
        return [...filtered, data];
      });
    });

    return () => {
      socket.off("connect");
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
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
      <h2 className="absolute top-4 left-4 text-white text-lg">
        {/* Player: {loggedInUser} */}
      </h2>

      {/* ✅ Your car */}
      <div
        className="absolute bg-red-500 rounded-lg"
        style={{
          width: "50px",
          height: "80px",
          left: position.x,
          top: position.y,
          transition: "all 0.1s ease",
        }}
      ></div>

      {/* ✅ Other players */}
      {others.map((p) => (
        <div
          key={p.id}
          className="absolute bg-blue-400 rounded-lg opacity-70"
          style={{
            width: "50px",
            height: "80px",
            left: p.x,
            top: p.y,
            transition: "all 0.1s ease",
          }}
        ></div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
        <button onClick={() => handleMove("up")} className="bg-white/20 px-4 py-2 rounded">⬆️</button>
        <button onClick={() => handleMove("down")} className="bg-white/20 px-4 py-2 rounded">⬇️</button>
        <button onClick={() => handleMove("left")} className="bg-white/20 px-4 py-2 rounded">⬅️</button>
        <button onClick={() => handleMove("right")} className="bg-white/20 px-4 py-2 rounded">➡️</button>
      </div>
    </div>
  );
}
