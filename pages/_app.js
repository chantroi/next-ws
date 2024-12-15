import "@/styles/globals.css";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

const client = new Ably.Realtime({
  key: "8f9kBA.iI7zkg:L4Gn8C5N0HmFLmYNuDW0_O9QOy2mmQK5uY2yEv69BeM",
});

export default function App({ Component, pageProps }) {
  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="main">
        <Component {...pageProps} />
      </ChannelProvider>
    </AblyProvider>
  );
}
