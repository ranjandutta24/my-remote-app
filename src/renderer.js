// Ensure the socket.io client is available
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected to socket server");
});

socket.on("connect_error", (err) => {
  console.error("Connection error:", err);
});

socket.on("screen-data", (data) => {
  const videoElement = document.getElementById("remoteScreen");
  const blob = new Blob([data], { type: "video/webm" });
  videoElement.src = URL.createObjectURL(blob);
});

document.addEventListener("mousemove", (event) => {
  socket.emit("input-control", {
    type: "mouse-move",
    x: event.clientX,
    y: event.clientY,
  });
});

document.addEventListener("keydown", (event) => {
  socket.emit("input-control", { type: "key-press", key: event.key });
});
