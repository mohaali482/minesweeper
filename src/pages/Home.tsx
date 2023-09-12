import { useEffect, useState } from "react";
import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import Time from "../components/Time"
import { GameOverLostModal, GameOverWonModal } from "../components/Modal";
import { Select, SelectItem } from "@nextui-org/react";
import Levels from "../utils/Levels";

function Home() {
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [totalMines, setTotalMines] = useState(2);
    const [openModal, setOpenModal] = useState(false);
    const [openedModal, setOpenedModal] = useState<"lost" | "won" | "">("");
    const [openedGrids, setOpenedGrids] = useState({ opened: 0 });
    const [grid, setGrid] = useState<string[][]>([[]])
    const [gridState, setGridState] = useState<string[][]>([[]])
    const [level, setLevel] = useState<Set<string>>(new Set(["iron"]));
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const numOfLeftGrids = ((grid.length * grid[0].length) - openedGrids.opened)
        if ((numOfLeftGrids === totalMines)) {
            setGameOver(true);
            setOpenModal(true);
            setOpenedModal("won");
        } else if (gameOver) {
            setOpenModal(true);
            setOpenedModal("lost");
        }
    }, [gameOver, openedGrids.opened, totalMines])



    const closeModal = () => {
        if (openModal) {
            setOpenModal(false);
        }
    }

    const levelInformation = (selectedLevel: string) => {
        const level = Levels.find((level) => {
            return level.level === selectedLevel
        })
        const message = `GridSize: ${level?.gridSizeX} x ${level?.gridSizeY}. Mines: ${level?.mines}`

        return message
    }

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLevel(new Set([e.target.value]));
    }

    useEffect(() => {
        const choosenLevel = Levels.find((value) => {
            return value.level === level.values().next().value
        })
        if (choosenLevel) {
            const grid = [...Array(choosenLevel.gridSizeY)].map(() => Array(choosenLevel.gridSizeX).fill("U"));
            const gridState = [...Array(choosenLevel.gridSizeY)].map(() => Array(choosenLevel.gridSizeX).fill("U"));
            setStarted(false);
            setGameOver(false);
            setOpenedGrids({ opened: 0 });
            setGrid([[]]);
            setGridState([[]]);
            setTotalMines(choosenLevel.mines);
            setLoading(true);

            setTimeout(() => {
                setGrid(grid);
                setGridState(gridState);
                setLoading(false);
            }, 1000)
        } else {
            alert("Something unexpected happened")
        }
    }, [level])

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full px-10 sm:px-20">

                <div className="flex flex-col items-center w-full">
                    <h1 className="text-3xl font-bold">Welcome to Minesweeper</h1>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-xl">
                            Click on a square to reveal it.
                            Right click on a square to flag it.
                            Press F5 to restart.
                        </p>
                    </div>
                </div>


                <div className="flex flex-col w-full sm:flex-row sm:justify-between sm:items-center">
                    <div className="my-4 sm:my-0">
                        <Time running={started} />
                    </div>
                    <div>
                        <Select
                            items={Levels}
                            label="Level"
                            disabled={started}
                            placeholder="Select a level"
                            selectedKeys={level}
                            className="sm:max-w-xs"
                            onChange={handleSelectionChange}
                        >
                            {(level) => <SelectItem key={level.level}>{level.level.charAt(0).toUpperCase() + level.level.slice(1)}</SelectItem>}
                        </Select>
                        <p className="text-small text-default-500">{levelInformation(level.values().next().value as string)}</p>
                    </div>
                </div>
                <div className="flex justify-center my-20">
                    {grid.length > 0 && grid[0].length > 0 ?
                        <Grid started={started} setStarted={setStarted} totalMines={totalMines}
                            grid={grid} setGrid={setGrid} gridState={gridState} setGridState={setGridState}
                            gameOver={gameOver} setGameOver={setGameOver} openedGrids={openedGrids} setOpenedGrids={setOpenedGrids}
                        />
                        : loading ? <p>Loading...</p> : <p>Choose level</p>}
                </div>
                {gameOver && openedModal === "won" && <GameOverWonModal isOpen={openModal} onClose={closeModal} />}
                {gameOver && openedModal === "lost" && <GameOverLostModal isOpen={openModal} onClose={closeModal} />}
            </div >
        </>
    )
}

export default Home