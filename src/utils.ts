//1. Create a function named `convertStringTo2DArray` that takes a single string parameter.
export const convertMapStringTo2DArray = (mapString: string): string[][] => {
  //2. Initialize an empty array called `result` to store the 2D array.
  const rows = mapString.split("\n").filter((row) => row.length > 0);
  const result: string[][] = [];
  console.log(rows);

  rows.forEach((row) => {
    const characters = row.split("").filter((cell) => cell !== " ");
    result.push(characters);
  });

  return result;
};

export const createUniquePipesArray = (gameMap: string): string[] => {
  const icons = gameMap.split("").filter((char) => char !== "\n");
  return [...new Set(icons)];
};

export const createIconMappings = (gameMap: string) => {
  const uniqueIcons = createUniquePipesArray(gameMap);
  const iconMappings: { [key: string]: string } = {};

  uniqueIcons.forEach((icon) => {
    let nextIcon;

    switch (icon) {
      case "┛":
        nextIcon = "┗";
        break;
      case "┗":
        nextIcon = "┏";
        break;
      case "┃":
        nextIcon = "━";
        break;
      case "┏":
        nextIcon = "┓";
        break;
      case "━":
        nextIcon = "┃";
        break;
      case "┣":
        nextIcon = "┳";
        break;
      case "┓":
        nextIcon = "┛";
        break;
      case "┳":
        nextIcon = "┫";
        break;
      case "┫":
        nextIcon = "┻";
        break;
      case "┻":
        nextIcon = "┣";
        break;
      case "╺":
        nextIcon = "╻";
        break;
      case "╻":
        nextIcon = "╸";
        break;
      case "╸":
        nextIcon = "╹";
        break;
      case "╹":
        nextIcon = "╺";
        break;
      default:
        nextIcon = icon; // For tiles that don't change
        break;
    }

    iconMappings[icon] = nextIcon;
  });

  return iconMappings;
};

const validDirections: {
  [direction: string]: { [key: string]: string[] };
} = {
  up: {
    "┏": [],
    "┛": ["┃", "┏", "┣", "┫", "┳", "╻", "┓", "╋", "╹"],
    "┃": ["┏", "┃", "┣", "┫", "╻", "┓", "┳", "╋", "╹"],
    "╻": ["┏", "┃", "┣", "┳", "┓", "┫", "╋", "╹", "╻"],
    "━": [],
    "┣": ["┏", "┃", "┣", "┫", "┳", "┓", "╋", "╻", "╹"],
    "┓": [],
    "┗": ["┃", "┏", "┣", "┫", "┳", "╻", "┓", "╋", "╹"],
    "┳": [],
    "┫": ["┃", "┏", "┣", "┫", "┳", "╻", "┓", "╋", "╹"],
    "┻": ["┏", "┃", "┣", "┫", "┓", "╻", "╋", "╹", "┳"],
    "╋": ["┏", "┃", "┣", "┫", "┓", "╻", "╋", "╹", "┳"],
    "╺": [],
    "╸": [],
    "╹": ["┃", "┏", "┣", "┫", "┳", "╻", "┓", "╋", "╹"],
  },
  down: {
    "┏": ["┃", "┣", "┫", "╻", "╋", "╹", "┛", "┻", "┗"],
    "┛": [],
    "┃": ["┃", "┣", "┫", "╻", "┛", "┻", "╋", "╹", "┗"],
    "╻": ["┃", "┣", "┫", "╻", "┛", "┻", "╋", "╹", "┗"],
    "━": [],
    "┣": ["┃", "┣", "┫", "╻", "┛", "┻", "╋", "╹", "┗"],
    "┓": ["┃", "┣", "┫", "╋", "╻", "╹", "┛", "┻", "┗"],
    "┗": [],
    "┳": ["┃", "┣", "┫", "╋", "╻", "╹", "┛", "┻", "┗"],
    "┫": ["┃", "┣", "┫", "╻", "╋", "╹", "┛", "┻", "┗"],
    "┻": [],
    "╋": ["┃", "┣", "┫", "╻", "╋", "╹", "┛", "┻", "┗"],
    "╺": [],
    "╸": [],
    "╹": ["┃", "┣", "┫", "╻", "╋", "╹", "┛", "┻", "┗"],
  },
  left: {
    "┏": [],
    "┛": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "┃": [],
    "╻": [],
    "━": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "┣": [],
    "┓": ["┣", "╋", "┻", "┏", "┳", "╺", "╸", "━", "┗"],
    "┗": [],
    "┳": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "┫": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "┻": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "╋": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "╺": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "╸": ["┣", "┻", "╋", "━", "┏", "┳", "╺", "╸", "┗"],
    "╹": [],
  },
  right: {
    "┏": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "┛": [],
    "┃": [],
    "╻": [],
    "━": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "┣": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "┓": [],
    "┗": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "┳": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "┫": [],
    "┻": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "╋": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "╺": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "╸": ["┻", "╋", "━", "┳", "╺", "╸", "┛", "┫"],
    "╹": [],
  },
};

export const solvePuzzle = (gameBoard: string[][]) => {
  const numRows = gameBoard.length;
  const numCols = gameBoard[0].length;

  // Creating a new gameboard as the passed gameBoard is immutable
  // By using JSON.parse and JSON.stringify like this, it creates a completely new array with new nested objects/arrays, making it mutable.
  const mutableGameBoard = JSON.parse(JSON.stringify(gameBoard));

  const visited = [];
  for (let i = 0; i < numRows; i++) {
    visited.push(new Array(numCols).fill(false));
  }

  // Find starting point
  const startingPoint = findStartingPoint(mutableGameBoard);
  let startingPointX;
  let startingPointY;

  if (startingPoint) {
    startingPointX = findStartingPoint(mutableGameBoard)?.x;
    startingPointY = findStartingPoint(mutableGameBoard)?.y;
  } else {
    console.error("No starting point found in the game board!");
  }

  const cellOrientations = ["up", "down", "left", "right"];
  let orientationIndex = 0;
  const nextOrientation = cellOrientations[orientationIndex];

  function explorePath(
    x: number,
    y: number,
    orientation: string,
    visited: boolean[][],
    rotations: { currentPipe: number; neighboringPipe: number }
  ) {
    if (x < 0 || x > numCols || y < 0 || y > numRows) {
      return false;
    }

    let cell = mutableGameBoard[y][x];
    visited[y][x] = true;

    console.log(visited);

    orientation = cellOrientations[orientationIndex];

    if (hasNeighboringCell(x, y, orientation, mutableGameBoard)) {
      if (
        canMoveToNeighbor(
          x,
          y,
          orientation,
          mutableGameBoard,
          visited,
          rotations
        )
      ) {
        const { x: nextX, y: nextY } = getCellCoordinates(x, y, orientation);
        x = nextX;
        y = nextY;

        cell = mutableGameBoard[y][x];
        visited[y][x] = true;

        orientationIndex = 0;
        if (orientation !== getOppositeDirection(orientation)) {
          explorePath(x, y, orientation, visited, rotations);
        } else {
          orientationIndex++;
          explorePath(x, y, orientation, visited, rotations);
        }
      }

      orientationIndex++;
      orientation = cellOrientations[orientationIndex];
      if (orientationIndex >= cellOrientations.length) {
        orientationIndex = 0;
      }

      explorePath(x, y, orientation, visited, rotations);
      return false;
    }
    // Set next orientation
    orientationIndex++;
    orientation = cellOrientations[orientationIndex];
    if (orientationIndex >= cellOrientations.length) {
      orientationIndex = 0;
    }

    if (isPuzzleSolved(visited)) {
      return true;
    }
    explorePath(x, y, orientation, visited, rotations);

    console.log("this is also called");
    visited[y][x] = false;
    return false;
  }

  const startingRotations = { currentPipe: 0, neighboringPipe: 0 };

  explorePath(
    startingPointX || 0,
    startingPointY || 0,
    nextOrientation,
    visited,
    startingRotations
  );

  if (isPuzzleSolved(visited)) {
    console.log("Solved!");
    console.log(mutableGameBoard); // Log the solved game board
    alert("Solved!");
  } else {
    console.log(mutableGameBoard);
    console.log("Unsolvable.");
  }
};

export function findStartingPoint(
  gameBoard: string[][]
): { y: number; x: number } | null {
  const numRows = gameBoard.length;
  const numCols = gameBoard[0].length;
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      if (gameBoard[y][x] === "┏" || gameBoard[y][x] === "┛") {
        return { y, x };
      }
    }
  }

  return null;
}

export function hasNeighboringCell(
  x: number,
  y: number,
  orientation: string,
  gameBoard: string[][]
) {
  const numRows = gameBoard.length;
  const numCols = gameBoard[0].length;

  console.log({ y, x, orientation });

  // Define coordinates for neighboring cells in different coordinates
  const neighboringCells: { [key: string]: { x: number; y: number } } = {
    up: { x, y: y - 1 },
    down: { x, y: y + 1 },
    left: { x: x - 1, y },
    right: { x: x + 1, y },
  };

  console.log({ neighboringCells });

  // Access the neighboring cell from passed orientation
  const neighboringCell = neighboringCells[orientation];
  console.log({ neighboringCell });

  // Check if neighboring cell is within bounds
  if (
    neighboringCell.x >= 0 &&
    neighboringCell.x < numCols &&
    neighboringCell.y >= 0 &&
    neighboringCell.y < numRows
  ) {
    // return true if it is, otherwise false
    const neighboringIcon = gameBoard[neighboringCell.y][neighboringCell.x];
    console.log(neighboringIcon);
    return true;
  }
  console.log("not within bounds!");
  return false;
}

export function getCellCoordinates(
  x: number,
  y: number,
  orientation: string
): { x: number; y: number } {
  switch (orientation) {
    case "up":
      return { x, y: y - 1 };
    case "down":
      return { x, y: y + 1 };
    case "left":
      return { x: x - 1, y };
    case "right":
      return { x: x + 1, y };
    default:
      return { x, y };
  }
}

export function getOppositeDirection(orientation: string) {
  const opposites: { [orientation: string]: string } = {
    up: "down",
    down: "up",
    left: "right",
    right: "left",
  };

  return opposites[orientation];
}

export function canMoveToNeighbor(
  x: number,
  y: number,
  orientation: string,
  gameBoard: string[][],
  visited: boolean[][],
  rotations: { currentPipe: number; neighboringPipe: number }
) {
  // Get neighboring coordinates
  const neighboringCoordinates = getCellCoordinates(x, y, orientation);

  // Return if we already visited this cell
  if (visited[neighboringCoordinates.y][neighboringCoordinates.x]) {
    return false;
  }

  // Define valid directions for neighboring pipe icon
  let currentPipe = gameBoard[y][x];

  // Get neighboring cell
  let neighboringCell =
    gameBoard[neighboringCoordinates.y][neighboringCoordinates.x];

  // Check if neighboring and current pipe can connect without the need for rotation
  if (
    validDirections[orientation][currentPipe] &&
    validDirections[orientation][currentPipe].length > 0
  ) {
    // Check if neighboring pipe allows the opposite direction(if there are validDirections for the currentPipe at for example "up", it will go to the opposite direction which is "down" and check if those validDirections array in the down direction has the neighboringCell icon)
    if (
      validDirections[getOppositeDirection(orientation)][
        neighboringCell
      ].includes(currentPipe)
    ) {
      return true;
    }
  }

  let isRotated = false;

  while (!isRotated) {
    // Check if rotating the current pipe allows the connection
    const rotatedPipe = rotatePipe(currentPipe);
    rotations.currentPipe++;

    // Set currentPipe to be rotatedPipe
    currentPipe = rotatedPipe;

    if (rotations.currentPipe >= 5 && rotations.neighboringPipe >= 5) {
      isRotated = true;
    }

    // If it is a valid pipe change pipe to the new rotation
    if (
      rotations.currentPipe < 5 &&
      validDirections[orientation][rotatedPipe].includes(neighboringCell)
      //validDirections[orientation][rotatedPipe].length > 0
    ) {
      console.log("gameBoard:", gameBoard[y][x]);
      console.log("rotatedPipe:", rotatedPipe);
      try {
        // Attempt to modify the array
        gameBoard[y][x] = rotatedPipe;
        isRotated = true;
        return true;
      } catch (error) {
        if (error instanceof TypeError) {
          // The array is likely read-only
          console.log("The array is read-only or immutable.");
        } else {
          // Some other error occurred
          console.error("An error occurred:", error);
        }
      }
    }

    // Rotate the neighboring pipe and try to connect with current pipe
    const rotatedNeighbor = rotatePipe(neighboringCell);
    rotations.neighboringPipe++;

    // Update neighboring cell to rotation
    neighboringCell = rotatedNeighbor;

    if (
      rotations.neighboringPipe < 5 &&
      validDirections[getOppositeDirection(orientation)][
        rotatedNeighbor
      ].includes(rotatedPipe)
    ) {
      console.log(
        "gameBoard[neighbors]",
        gameBoard[neighboringCoordinates.y][neighboringCoordinates.x]
      );
      gameBoard[neighboringCoordinates.y][neighboringCoordinates.x] =
        rotatedNeighbor;
      isRotated = true;
      return true;
    }
  }

  // Revert changes if rotation didn't work
  gameBoard[y][x] = currentPipe;
  gameBoard[neighboringCoordinates.y][neighboringCoordinates.x] =
    neighboringCell;
  rotations.currentPipe = 0;

  visited[y][x] = false;
  return false;
}

export function rotatePipe(pipe: string): string {
  switch (pipe) {
    case "┛":
      return "┗";
    case "┗":
      return "┏";
    case "┃":
      return "━";
    case "┏":
      return "┓";
    case "━":
      return "┃";
    case "┣":
      return "┳";
    case "┓":
      return "┛";
    case "┳":
      return "┫";
    case "┫":
      return "┻";
    case "┻":
      return "┣";
    case "╺":
      return "╻";
    case "╻":
      return "╸";
    case "╸":
      return "╹";
    case "╹":
      return "╺";
    default:
      return pipe; // Return unchanged for unknown pipes
  }
}

export function isPuzzleSolved(visited: boolean[][]): boolean {
  // Define numRows and numCols for visited
  const numRows = visited.length;
  const numCols = visited[0].length;
  // Check if all cells are visited(connected)
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      if (!visited[y][x]) return false;
    }
  }
  return true;
}
