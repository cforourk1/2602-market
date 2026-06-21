import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer);
  io.on("connection", (socket) => {
    console.log("Lincoln is ready to fetch! 🐕");
    socket.on("disconnect", () => {
      console.log("Lincoln went home.");
    });
  });
  return io;
}

export function getIo() {
  return io;
}