import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { useState, useEffect } from "react";

// Dummy car component
const Car = ({ position, color = "red" }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.5, 2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const CarRacingScene = () => {
  const [playerPos, setPlayerPos] = useState([0, 0.25, 0]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      setPlayerPos((prev) => {
        const [x, y, z] = prev;
        switch (e.key) {
          case "ArrowUp":
            return [x, y, z - 0.5];
          case "ArrowDown":
            return [x, y, z + 0.5];
          case "ArrowLeft":
            return [x - 0.5, y, z];
          case "ArrowRight":
            return [x + 0.5, y, z];
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Car position={playerPos} color="red" />
      <OrbitControls />
      <gridHelper args={[20, 20]} />
      <Environment preset="sunset" />
      <Html center>
        <h1 style={{ color: "white" }}>3D Car Racing Multiplayer</h1>
      </Html>
    </Canvas>
  );
};

export default CarRacingScene;
