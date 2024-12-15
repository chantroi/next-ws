const Ably = require("ably");

export default async function handler(req, res) {
  const ably = new Ably.Realtime(
    "8f9kBA.iI7zkg:L4Gn8C5N0HmFLmYNuDW0_O9QOy2mmQK5uY2yEv69BeM"
  );
  ably.connection.once("connected", () => {
    console.log("Connected to Ably!");
  });
  const channel = ably.channels.get("main");

  const params = req.query;
  const e = params.e;
  const text = params.text;
  channel.publish(e, text);

  setTimeout(async () => {
    ably.connection.close();
    ably.connection.once("closed", () => {
      console.log("Closed the connection to Ably.");
    });
  }, 5000);
  res.status(200).json({ message: "Message sent!" });
  res.end();
}
