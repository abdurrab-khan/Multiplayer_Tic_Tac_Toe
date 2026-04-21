import { getGameState } from "./game.state";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (roomId: string) => {
  const gameState = getGameState(roomId);

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameState.board[a] &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    ) {
      return { winner: gameState.board[a] };
    }
  }

  if (gameState.board.every((cell) => cell !== "")) {
    return { winner: "draw" };
  }

  return { winner: null };
};

const makeMove = (roomId: string, socketId: string, cellIndex: number) => {
  const gameState = getGameState(roomId);
  const player = gameState.player.find((p) => p.playerId === socketId);

  if (!player || !gameState.turn) {
    return { error: "Player not found in the game" };
  }

  if (gameState.turn.startTime + 30000 < Date.now()) {
    return { error: "Turn timed out" };
  }

  if (gameState.board[cellIndex] !== "") {
    return { error: "Cell is already occupied" };
  }

  if (player.playerId !== gameState.turn?.playerId) {
    return { error: "It's not your turn" };
  }

  gameState.board[cellIndex] = player.playerSymbol;
  gameState.turn = {
    symbol: player.playerSymbol === "X" ? "O" : "X",
    playerId:
      gameState.player.find((p) => p.playerSymbol === gameState.turn?.symbol)
        ?.playerId || "",
    startTime: Date.now(),
  };

  return { success: true };
};

export { checkWin, makeMove };
