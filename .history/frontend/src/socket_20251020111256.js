import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend URL
export default socket;
useEffect(() => {
  socket.on("updatePlayer", (data) => {
    console.log("Other player moved:", data);
  });

  return () => {
    socket.off("updatePlayer");
  };
}, []);
