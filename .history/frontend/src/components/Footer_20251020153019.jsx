import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate=useNavigate();
    return(
        <nav
        className="flex justify-between items-center p-6 bg-purple-600 text-white">
        <div className="font-bold text-xl">Crazy Stunt Cars</div>
        </nav>
    )
}