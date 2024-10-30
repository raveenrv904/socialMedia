/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSocket } from "./context/SocketContext";
import axios from "axios";

const MessageComponent = ({ userId, receiverId }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Join the room on load
  useEffect(() => {
    if (socket && receiverId) {
      socket.emit("join_room", receiverId);

      // Retrieve existing messages from the server (optional)
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/messages/${receiverId}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to fetch messages", error);
        }
      };
      fetchMessages();

      // Listen for incoming messages
      socket.on("receive_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off("receive_message");
    };
  }, [socket, receiverId]);

  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      const messageData = {
        senderId: userId,
        receiverId: receiverId,
        content: newMessage,
      };

      // Send message through socket
      socket.emit("send_message", messageData);

      // Optimistically update UI
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.senderId === userId ? "sent" : "received"
            }`}
          >
            <p>{msg.content}</p>
            <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default MessageComponent;
