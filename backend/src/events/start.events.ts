import { Server, Socket } from "socket.io";
import { getRoomById } from "../game/game.state";

// Core start event handlers
const startEvents = (socket: Socket, io: Server) => {
  // Handle player joining the lobby
  socket.on("joinLobby", (data) => {
    const { userId, userName, roomId } = data;

    if (!(userId && userName)) {
      socket.emit("error", {
        message: "User ID and User Name are required to join the lobby.",
      });
      return;
    }

    if (!roomId) {
      socket.emit("error", {
        message: "Room ID is required to join the lobby.",
      });
      return;
    }

    const room = getRoomById(roomId);
    if (!room) {
      socket.emit("error", {
        message: "The specified room does not exist.",
      });
      return;
    }

    room.player.push({
      playerId: userId,
      playerName: userName,
      status: "online",
      playerSymbol: room.player[0] ? "O" : "X",
    });

    socket.join(roomId);
    socket.emit("joinedLobby", {
      roomId,
      playerSymbol: room.player[room.player.length - 1].playerSymbol,
    });

    if (room.player.length === 2) {
      io.of("/game").to(roomId).emit("startGame", {
        message: "Game is starting!",
        roomId,
      });
    }
  });

  // Handle player leaving the lobby
  socket.on("leaveLobby", (data) => {
    const { roomId } = data;

    if (!roomId) {
      socket.emit("error", {
        message: "Room ID is required to leave the lobby.",
      });
      return;
    }

    const room = getRoomById(roomId);
    if (!room) {
      socket.emit("error", {
        message: "The specified room does not exist.",
      });
      return;
    }

    room.player = room.player.filter((player) => player.playerId !== socket.id);
    socket.leave(roomId);
    socket.emit("leftLobby", {
      roomId,
    });
  });
};

const disconnectUser = (socket: Socket, io: Server) => {
  // Handle user disconnection from the lobby
  const rooms = Array.from(socket.rooms).filter((room) => room !== socket.id);

  rooms.forEach((roomId) => {
    const room = getRoomById(roomId);
    if (room) {
      room.player = room.player.filter(
        (player) => player.playerId !== socket.id,
      );
      io.of("/game").to(roomId).emit("playerDisconnected", {
        message: "A player has disconnected.",
        roomId,
      });
    }
  });
};

export { startEvents, disconnectUser };
