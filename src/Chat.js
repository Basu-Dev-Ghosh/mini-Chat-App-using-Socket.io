import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((oldList) => [...oldList, messageData]);
      setCurrentMessage("");
    }
  };
  useEffect(() => {
    socket.on("recive_message", (data) => {
      setMessageList((oldList) => [...oldList, data]);
    });
  }, [socket]);
  return (
    <>
      <div className="chat-container">
        <div className="chat-header">
          <p>Live Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="scroll">
            {messageList.map((messageObject) => {
              return (
                <div
                  className="message-container"
                  id={username === messageObject.author ? "you" : "other"}
                >
                  <div className="message-content">
                    <p>{messageObject.message}</p>
                  </div>
                  <div className="message-info">
                    <p>{messageObject.author}</p>
                    <p>{messageObject.time}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Type here.."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};

export default Chat;
