import { Room } from "../lib/types";

const gameState: { [key: string]: Room } = {};

const createGameState = (roomId: string) => {
  gameState[roomId] = {
    board: Array(9).fill(""),
    player: [],
  };
  return gameState[roomId];
};

const resetGameState = (roomId: string) => {
  if (gameState[roomId]) {
    gameState[roomId].board = Array(9).fill("");
    gameState[roomId].player = [];
  }
};

const deleteGameState = (roomId: string) => {
  delete gameState[roomId];
};

const getGameState = (roomId: string) => {
  return gameState[roomId] || createGameState(roomId);
};

const findAvailableRoom = () => {
  for (const roomId in gameState) {
    if (gameState[roomId].player.length < 2) {
      return roomId;
    }
  }

  return null;
};

export {
  getGameState,
  createGameState,
  resetGameState,
  deleteGameState,
  findAvailableRoom,
};
