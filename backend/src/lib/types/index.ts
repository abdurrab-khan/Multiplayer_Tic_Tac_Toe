interface Player {
  playerId: string;
  playerName: string;
  playerSymbol: "X" | "O";
  status: "online" | "offline";
}

interface Room {
  board: string[];
  player: Player[];
  turn?: {
    symbol: "X" | "O";
    playerId: string;
    startTime: number;
  };
}

export { Room };
