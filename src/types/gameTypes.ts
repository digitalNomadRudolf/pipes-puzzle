interface CellProps {
  pipeType: string;
  isRotated: boolean;
  onClick(x: number, y: number): void;
}

interface GameState {
  level: GameLevels;
  gameBoard: string[][];
}

export enum GameLevels {
  level1 = 1,
  level2 = 2,
  level3 = 3,
  level4 = 4,
  level5 = 5,
  level6 = 6,
}

interface PipeIcons {
  [key: string]: string;
}

export type { CellProps, GameState, PipeIcons };
