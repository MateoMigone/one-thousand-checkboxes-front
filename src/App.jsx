import { useEffect } from "react";
import "./App.css";
import CheckboxFlex from "./components/CheckboxFlex";
import { io } from "socket.io-client";

const socket = io("https://one-thousand-checkboxes-back.onrender.com");

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.io server");
    });
    // Manejar el cierre de la página
    const handleBeforeUnload = () => {
      socket.disconnect();
      console.log("Disconnected to Socket.io server");
    };

    // Escuchar el evento beforeunload (cuando la página se va a cerrar)
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <CheckboxFlex socket={socket} />
      </main>
    </>
  );
}

export default App;
