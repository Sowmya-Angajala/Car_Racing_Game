import Navbar from "./Navbar";
import heroImage from "../assets/car-hero.png"; // your image path

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden flex flex-col">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 bg-center bg-cover blur-2xl opacity-30 scale-110"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

      {/* Transparent Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center flex-grow text-center px-4 z-10">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-lg w-full">
          <img
            src={heroImage}
            alt="Cars preview"
            className="w-full h-48 object-cover rounded-lg shadow-lg mb-6"
          />

          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wide text-white drop-shadow-lg">
            Crazy Stunt Cars Multiplayer
          </h1>

          <button className="px-12 py-4 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg">
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
}
