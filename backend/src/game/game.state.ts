import { Room } from "../lib/types";

const gameState: { [key: string]: Room } = {};

// Handle game state management for each room
const createGameState = (roomId: string) => {
  gameState[roomId] = {
    board: Array(9).fill(""),
    player: [],
  };
  return gameState[roomId];
};

const getRoomById = (roomId: string) => {
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

export { createGameState, resetGameState, deleteGameState, getRoomById };
