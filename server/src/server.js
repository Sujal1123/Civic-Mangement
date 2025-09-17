import 'dotenv/config';
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// ✅ Attach Socket.IO (for live report updates)
const io = new Server(server, {
  cors: {
    origin: "*", // allow all (adjust for production)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 New WebSocket connection");

  // Example: broadcast when report created
  socket.on("newReport", (data) => {
    io.emit("reportCreated", data);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected");
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
