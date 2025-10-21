    import { useNavigate } from "react-router-dom";
    
    export default function Navbar(){
        const navigate=useNavigate();
        return(
            <nav
            className="flex justify-between items-center p-6 bg-purple-600 text-white">
            <div className="font-bold text-xl">Crazy Stunt Cars</div>
            <button
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
            </nav>
        )
    }