import { useEffect, useState } from "react";
import Grid from "../components/Grid"
import Navbar from "../components/Navbar"
import Time from "../components/Time"
import { GameOverLostModal, GameOverWonModal } from "../components/Modal";
import { Button, ScrollShadow, Select, SelectItem } from "@nextui-org/react";
import Levels from "../utils/Levels";
import Footer from "../components/Footer";

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
    const [mines, setMines] = useState(0);


    useEffect(() => {
        const numOfLeftGrids = ((grid.length * grid[0].length) - openedGrids.opened)
        if ((numOfLeftGrids === totalMines)) {
            setGameOver(true);
            setStarted(false);
            setOpenModal(true);
            setOpenedModal("won");
        } else if (gameOver) {
            setOpenModal(true);
            setStarted(false);
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
        if (e.target.value) {
            setLevel(new Set([e.target.value]));
        }
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
            setMines(choosenLevel.mines)
            setLoading(true);

            setGrid(grid);
            setGridState(gridState);
        } else {
            alert("Something unexpected happened")
        }
    }, [level])

    useEffect(() => {
        if (grid.length > 0 && gridState.length > 0) {
            setLoading(false);
        }
    }, [grid, gridState])

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center w-full px-2 sm:px-20">

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
                    <div className="my-4 sm:my-0 sm:w-1/3 sm:flex sm:justify-center">
                        {!loading && <Time running={started} />}
                    </div>
                    <div className="flex flex-col justify-center items-center text-lg sm:w-1/3 my-4">
                        <p>Mines Left: </p>
                        <p>{mines}</p>
                    </div>
                    <div className="sm:w-1/3">
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
                {loading ?
                    <p>Loading...</p> :
                    <div className="mb-5 flex flex-col justify-center items-center">
                        <ScrollShadow hideScrollBar className="flex justify-center my-20 overflow-x-scroll w-full">
                            {
                                grid.length > 0 && grid[0].length > 0 ?
                                    <Grid started={started} setStarted={setStarted} totalMines={totalMines}
                                        grid={grid} setGrid={setGrid} gridState={gridState} setGridState={setGridState} setMines={setMines}
                                        gameOver={gameOver} setGameOver={setGameOver} openedGrids={openedGrids} setOpenedGrids={setOpenedGrids}
                                    />
                                    : <></>
                            }
                        </ScrollShadow>
                        {gameOver && openedModal === "won" && <GameOverWonModal isOpen={openModal} onClose={closeModal} />}
                        {gameOver && openedModal === "lost" && <GameOverLostModal isOpen={openModal} onClose={closeModal} />}
                        {gameOver && <Button>Restart</Button>}
                    </div>
                }
            </div >

            <Footer />
        </>
    )
}

export default Home