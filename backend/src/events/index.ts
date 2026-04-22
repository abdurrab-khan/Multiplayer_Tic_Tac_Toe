import { Server } from "socket.io";
import { disconnectUser, gameEvents } from "./game.events";
import {
  startEvents,
  disconnectUser as startDisconnectUser,
} from "./start.events";

const registerGameEvents = (io: Server) => {
  io.of("/game").on("connection", (socket) => {
    // Handling core game events
    gameEvents(socket, io);

    // Handle user disconnection
    socket.on("disconnect", () => {
      disconnectUser(socket, io);
    });
  });
};

const registerInitialStartEvents = (io: Server) => {
  io.of("/start").on("connection", (socket) => {
    // Handling initial start events for the game
    startEvents(socket, io);

    // Handle user disconnection
    socket.on("disconnect", () => {
      startDisconnectUser(socket, io);
    });
  });
};

export { registerGameEvents, registerInitialStartEvents };
