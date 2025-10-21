import Navbar from "./Navbar";
import heroImage from "../assets/car-hero.png"; // Your image path

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4">
        <div className="bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-gray-700 max-w-lg w-full">
          <img
            src={heroImage}
            alt="Cars preview"
            className="w-full h-48 object-cover rounded-lg shadow-lg mb-6"
          />

          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wide">
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
