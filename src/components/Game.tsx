import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../styles/game.scss";
import "../styles/cell.scss";
import "../styles/grid.scss";
import { rotateCell, setGameBoard } from "../redux/slices/gameSlice";
import {
  convertMapStringTo2DArray,
  createIconMappings,
  solvePuzzle,
} from "../utils";
import { socket, webSocketCommands } from "../socket/socket";

const Game: React.FC = () => {
  const dispatch = useDispatch();
  const { startNewLevel, sendRotate, sendMap, sendVerify } =
    webSocketCommands(socket);
  const [level, setLevel] = useState<number | null>(null);
  const [isGameReady, setIsGameReady] = useState(false);
  const [gameMap, setGameMap] = useState("");
  const [mapData2D, setMapData2D] = useState<[] | string[][]>([]);

  const pipeIconMappings = createIconMappings(gameMap);

  const gameData = useSelector((state: RootState) => state.game);

  const initializeGameBoard = () => {
    startNewLevel(1);
    setLevel(1);
    sendMap();
  };

  const handleServerResponse = (event: MessageEvent) => {
    const serverResponse = event.data;

    if (serverResponse.startsWith("map:")) {
      const mapData = serverResponse.substring(4);
      setGameMap(mapData);
      const mapDataArray = convertMapStringTo2DArray(mapData);
      setMapData2D(mapDataArray);
      console.log(mapDataArray);

      dispatch(setGameBoard({ gameBoard: mapDataArray, level }));
      setIsGameReady(true);
    }
  };

  const handleVerify = () => {
    sendVerify();
  };

  useEffect(() => {
    socket.addEventListener("open", initializeGameBoard);

    socket.addEventListener("message", (event) => {
      console.log(event);
      handleServerResponse(event);
    });

    return () => {
      socket.removeEventListener("open", initializeGameBoard);
      socket.removeEventListener("message", handleServerResponse);
    };
  }, [dispatch, level]);

  const handleCellClick = (x: number, y: number, cell: string) => {
    if (!isGameReady) return;
    // Logic to handle rotation on click
    const rotatedIcon = pipeIconMappings[cell];
    // Update Redux state
    dispatch(rotateCell({ x, y, newIcon: rotatedIcon }));
    sendRotate(x, y);
  };

  return (
    <div className="game__container" style={{ flexDirection: "column" }}>
      <div className={`grid__container grid__size-`}>
        {/* Render game board */}
        {isGameReady &&
          gameData.gameBoard &&
          gameData.gameBoard.map((row, y) => (
            <div key={y} className="game__row">
              {row.map((cell, x) => (
                <div
                  className="grid__item"
                  key={cell + x}
                  onClick={() => handleCellClick(x, y, cell)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        {!isGameReady && <div>Loading game board...</div>}
      </div>
      {isGameReady && (
        <>
          <button onClick={() => handleVerify()}>Verify Puzzle</button>
          <button
            style={{ marginTop: "2rem" }}
            onClick={() => solvePuzzle(mapData2D)}
          >
            Solve Puzzle
          </button>
        </>
      )}
    </div>
  );
};

export default Game;
