const checkArray = [
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, 0],
  [1, -1],
];

function IsBound(grid: string[][], x: number, y: number) {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

export function GetNeighbors(grid: string[][], x: number, y: number) {
  const neighbors: [number, number][] = [];
  checkArray.forEach(([xOffset, yOffset]) => {
    if (IsBound(grid, x + xOffset, y + yOffset)) {
      neighbors.push([x + xOffset, y + yOffset]);
    }
  });
  return neighbors;
}

function CheckMines(grid: string[][], x: number, y: number) {
  const neighbors = GetNeighbors(grid, x, y);
  return neighbors.filter(([x, y]) => grid[x][y] === "M").length;
}

function DFS(
  grid: string[][],
  gridState: string[][],
  x: number,
  y: number,
  opened: { opened: number }
) {
  if (grid[x][y] === "M") {
    gridState[x][y] = "M";
    return;
  }
  if (gridState[x][y] !== "U") return;

  opened.opened++;

  const mines = CheckMines(grid, x, y);
  if (mines > 0) {
    grid[x][y] = String(mines);
    gridState[x][y] = String(mines);
    return;
  }
  grid[x][y] = "B";
  gridState[x][y] = "B";

  const neighbors = GetNeighbors(grid, x, y);
  neighbors.forEach(([x, y]) => DFS(grid, gridState, x, y, opened));
}

export default DFS;
