import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameLevels, GameState } from "../../types/gameTypes";

const initialState: GameState = {
  level: GameLevels.level1,
  gameBoard: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameBoard: (state, action) => {
      console.log(action.payload);
      const { gameBoard, level } = action.payload;

      state.gameBoard = [...gameBoard];
      state.level = level;
    },
    selectLevel: (state, action: PayloadAction<GameLevels>) => {
      state.level = action.payload;
    },
    increaseLevel: (state) => {
      // Increase level by 1 using the enum
      const currentLevel = state.level;
      if (currentLevel < GameLevels.level6) {
        state.level = currentLevel + 1;
      }
    },
    rotateCell: (
      state,
      action: PayloadAction<{ x: number; y: number; newIcon: string }>
    ) => {
      const { x, y, newIcon } = action.payload;

      if (state.gameBoard[y] && state.gameBoard[y][x]) {
        state.gameBoard[y][x] = newIcon;
      }
    },
  },
});

export const { setGameBoard, selectLevel, increaseLevel, rotateCell } =
  gameSlice.actions;
export default gameSlice.reducer;
