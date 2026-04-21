import { Server } from "socket.io";
import registerEvents from "../events";

let io: Server | null = null;

const initSocket = (server: any) => {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "http://localhost:5173",
      },
    });
  }

  registerEvents(io);
};

const getIO = () => io;

export { initSocket, getIO };
