import { Server } from "socket.io";
import { disconnectUser, gameEvents } from "./game.events";

const registerEvents = (io: Server) => {
  io.of("/game").on("connection", (socket) => {
    // Handling core game events
    gameEvents(socket, io);

    // Handle user disconnection
    socket.on("disconnect", () => {
      disconnectUser(socket, io);
    });
  });
};

export default registerEvents;
