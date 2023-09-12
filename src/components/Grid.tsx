import React, { useCallback, useEffect, useRef } from "react"
import MemoizedGridSquare from "./GridSquare"
import DFS, { GetNeighbors } from "../utils/algorithm";
import MineGenerator from "../utils/MineGenerator";

interface GridProps {
    grid: string[][];
    gridState: string[][];
    started: boolean;
    totalMines: number;
    gameOver: boolean;
    openedGrids: { opened: number };

    setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
    setGridState: React.Dispatch<React.SetStateAction<string[][]>>;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenedGrids: React.Dispatch<React.SetStateAction<{ opened: number }>>;
}


function Grid(props: GridProps) {
    const gridRef = useRef<HTMLDivElement>(null);

    const handleClick = (rowIndex: number, colIndex: number) => {
        if (props.gameOver) return;
        if (!props.started) {
            const mines = MineGenerator(props.grid, { x: rowIndex, y: colIndex }, props.totalMines);
            mines.forEach(mine => {
                props.gridState[mine.x][mine.y] = "M";
            })
        }
        const updatedGridState = [...props.gridState];
        const updatedGrid = [...props.grid];
        DFS(updatedGridState, updatedGrid, rowIndex, colIndex, props.openedGrids);
        props.setGridState(updatedGridState);
        props.setGrid(updatedGrid)
        props.setOpenedGrids({ opened: props.openedGrids.opened });
        if (updatedGridState[rowIndex][colIndex] == "M") {
            for (let i = 0; i < updatedGrid.length; i++) {
                for (let j = 0; j < updatedGrid[i].length; j++) {
                    if (updatedGridState[i][j] == "M") {
                        updatedGrid[i][j] = "M";
                    }
                }
            }
            props.setGameOver(true);
            props.setStarted(false);
            return;
        }
        if (!props.started) props.setStarted(true);
    }


    const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>, rowIndex: number, colIndex: number) => {
        event.preventDefault();
        if (props.gameOver) return;
        const allowableChars = ["F", "U"]


        if (allowableChars.includes(props.grid[rowIndex][colIndex])) {
            const updatedGrid = [...props.grid];

            if (updatedGrid[rowIndex][colIndex] == "U") {
                updatedGrid[rowIndex][colIndex] = "F";
            } else if (updatedGrid[rowIndex][colIndex] == "F") {
                updatedGrid[rowIndex][colIndex] = "U";
            }
            props.setGrid(updatedGrid);
        } else if (!isNaN(parseInt(props.grid[rowIndex][colIndex]))) {

            const neighbors = GetNeighbors(props.gridState, rowIndex, colIndex);
            let flagCounter = 0;

            neighbors.forEach(neighbor => {
                const [x, y] = neighbor;
                if (props.grid[x][y] == "F") {
                    flagCounter++;
                }
            });

            if (flagCounter == parseInt(props.grid[rowIndex][colIndex])) {
                for (let index = 0; index < neighbors.length; index++) {
                    const updatedGrid = [...props.grid];
                    const updatedGridState = [...props.gridState];
                    const [x, y] = neighbors[index];
                    if (updatedGridState[x][y] == "M" && updatedGrid[x][y] !== "F") {
                        for (let i = 0; i < updatedGrid.length; i++) {
                            for (let j = 0; j < updatedGrid[i].length; j++) {
                                if (updatedGridState[i][j] == "M") {
                                    updatedGrid[i][j] = "M";
                                }
                            }
                        }
                        props.setGameOver(true);
                        props.setStarted(false);
                        props.setGrid(updatedGrid);
                        props.setGridState(updatedGridState);
                    } else if (updatedGrid[x][y] == "U") {
                        DFS(updatedGridState, updatedGrid, x, y, props.openedGrids)
                        props.setGrid(updatedGrid);
                        props.setGridState(updatedGridState);
                        props.setOpenedGrids({ opened: props.openedGrids.opened });
                    }
                }
            }
        }
        return false;
    }

    useEffect(() => {
        if (gridRef.current)
            gridRef.current.style.gridTemplateColumns = `repeat(${props.grid[0].length}, 1fr)`;
    }, [props.grid])


    return (
        <div className="grid gap-1 max-w-full" ref={gridRef}>
            {props.grid.map((row, rowIndex) => row.map((col, colIndex) => (
                <MemoizedGridSquare key={`${rowIndex}-${colIndex}`} value={col}
                    onClick={useCallback(() => handleClick(rowIndex, colIndex), [props.started, props.gameOver, props.openedGrids])}
                    onContextMenu={useCallback((event: React.MouseEvent<HTMLButtonElement>) => handleRightClick(event, rowIndex, colIndex), [props.gameOver, props.openedGrids])} />
            )))}
        </div>
    )
}


export default Grid