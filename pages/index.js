import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Tạo WebSocket kết nối
    const ws = new WebSocket("/api/socket");
    setSocket(ws);

    // Lắng nghe sự kiện mở kết nối
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Lắng nghe tin nhắn đến từ server
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    // Đảm bảo WebSocket được đóng khi component unmount
    return () => {
      if (ws) {
        ws.close();
        console.log("WebSocket connection closed");
      }
    };
  }, []);

  // Gửi tin nhắn qua WebSocket
  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">WebSocket Example</h1>
      <textarea
        className="w-full h-40 border border-gray-300 rounded p-2 mb-4"
        onInput={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendMessage}
      >
        Send Message
      </button>
      <ul className="mt-4">
        {messages.map((msg, index) => (
          <li key={index} className="bg-white shadow-md p-2 rounded mt-2">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
