import { useNavigate } from "react-router-dom"
import login from "../components/login"

export default function Navbar() {
    const navigate = useNavigate(); 
  return (
    <div className="w-full absolute top-0 left-0 flex justify-between items-center px-6 py-4 z-20 backdrop-blur-lg ">
      <p className="font-semibold text-white text-sm md:text-base">
        Don’t lose your progress!
      </p>
      <div className="flex gap-3">
        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition-all duration-300">
          Close
        </button>
        <button onClick={() => navigate("/login")} className="bg-white text-purple-700 hover:bg-gray-100 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300">
          Log in
        </button>
      </div>
    </div>
  );
}
