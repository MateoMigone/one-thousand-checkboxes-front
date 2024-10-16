import { useEffect } from "react";
import CheckboxFlex from "./components/CheckboxFlex";
import { io } from "socket.io-client";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      <Header />
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckboxFlex socket={socket} />
      </main>
      <Footer />
    </>
  );
}

export default App;
