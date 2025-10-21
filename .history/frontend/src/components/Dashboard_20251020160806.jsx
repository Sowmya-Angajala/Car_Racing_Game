import Navbar from "./Navbar";
import heroImage from "../assets/car-hero.png"; // your image path

export default function Home\() {
  return (
    <div className="relative min-h-screen bg-gray-900 flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <img src={heroImage} alt="Cars preview" className="w-80 rounded-lg shadow-lg" />
        <h1 className="text-4xl md:text-5xl text-white font-bold mt-6">
          Crazy Stunt Cars Multiplayer
        </h1>
        <button
          className="mt-6 px-10 py-4 bg-purple-600 text-white rounded-full font-bold hover:bg-purple-700 transition duration-300"
        >
          Play Now
        </button>
      </div>
    </div>
  );
}
