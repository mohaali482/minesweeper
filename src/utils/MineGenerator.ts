import { GetNeighbors } from "./algorithm";

export interface MinePosition {
  x: number;
  y: number;
}

function MineGenerator(
  grid: string[][],
  exclude: MinePosition,
  numberOfMines: number
) {
  const neighbors = GetNeighbors(grid, exclude.x, exclude.y);
  const excludedArray = neighbors.map((neighbor) => {
    return `${neighbor[0]}-${neighbor[1]}`;
  });
  excludedArray.push(`${exclude.x}-${exclude.y}`);

  const newMinesString: string[] = [];

  while (newMinesString.length < numberOfMines) {
    const randomX = Math.floor(Math.random() * grid.length);
    const randomY = Math.floor(Math.random() * grid[0].length);

    const newMineString = `${randomX}-${randomY}`;

    if (
      excludedArray.indexOf(newMineString) != -1 ||
      newMinesString.includes(newMineString)
    ) {
      continue;
    }
    newMinesString.push(newMineString);
  }

  const newMines: MinePosition[] = [];
  newMinesString.forEach((mine) => {
    const [x, y] = mine.split("-");
    newMines.push({ x: parseInt(x), y: parseInt(y) });
  });

  return newMines;
}

export default MineGenerator;
