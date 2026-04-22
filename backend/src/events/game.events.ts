import { Server, Socket } from "socket.io";

// Core game event handlers
const gameEvents = (socket: Socket, io: Server) => {};

// Handling user connection and disconnection events
const connectUser = (socket: Socket, io: Server) => {};
const disconnectUser = (socket: Socket, io: Server) => {};

export { disconnectUser, gameEvents };
