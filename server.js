const { desktopCapturer } = require("electron");
// const io = require("socket.io")(3000);
const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost", // Allow the Electron client to connect
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  // Capture the screen and emit data
  setInterval(async () => {
    const sources = await desktopCapturer.getSources({ types: ["screen"] });
    for (const source of sources) {
      if (source.name === "Entire Screen") {
        socket.emit("screen-data", source.thumbnail.toPNG());
      }
    }
  }, 1000); // Emit screen data every second
});

console.log("Server running on http://localhost:3000");
