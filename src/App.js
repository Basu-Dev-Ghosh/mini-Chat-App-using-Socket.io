import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("https://mini-chat-app-using-socketio.herokuapp.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true)
    }
  };
  return (
    <>
      <div className="container">
        {!showChat ? (
          <div className="join-container">
            <h3>Join A Room</h3>
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Id..."
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join</button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
}

export default App;
