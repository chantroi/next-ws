import React, { useState } from "react";
import * as Ably from "ably";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";

// Connect to Ably using the AblyProvider component and your API key
const client = new Ably.Realtime({
  key: "8f9kBA.iI7zkg:L4Gn8C5N0HmFLmYNuDW0_O9QOy2mmQK5uY2yEv69BeM",
});

export default function App() {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="main">
        <AblyPubSub />
      </ChannelProvider>
    </AblyProvider>
  );
}

function AblyPubSub() {
  const [messages, setMessages] = useState([]);
  const [eventName, setEvent] = useState("main");
  const [text, setText] = useState("");

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  const { channel } = useChannel("main", eventName, (message) => {
    setMessages((previousMessages) => [...previousMessages, message]);
  });

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEvent(e.target.value)}
        />
        <textarea
          className="w-auto p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            channel.publish(eventName, text);
          }}
        >
          Publish
        </button>
        <div className="space-y-2">
          {messages.map((message) => {
            return (
              <p
                key={message.id}
                className="p-2 bg-gray-100 border border-gray-200 rounded-md"
              >
                {message.data}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
