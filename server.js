import { createServer } from "http";
import { Server } from "socket.io";
import app from "#app";
import db from "#db/client";

const PORT = process.env.PORT ?? 3000;

await db.connect();

const httpServer = createServer(app);
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Lincoln is ready to fetch! 🐕");
  socket.on("disconnect", () => {
    console.log("Lincoln went home.");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


/* trying to understand websockets. so to create a real time notification on the server sid
e that an order has been received, a websocket can eliminate the latency to receiving that notication. The handshake of the http request stil
 happens, but then the door is left open until that session disconnects. this will allow the real time order notification to happen. had to i
nstall socket io, change server js to match the new methods and change the way it is handled in order post. tests coming shortly

*/ 
