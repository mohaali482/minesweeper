import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import DeleteIcon from "./icons/DeleteIcon";
import Levels from "../utils/Levels";
import CancelIcon from "./icons/CancelIcon";
import SaveIcon from "./icons/SaveIcon";

interface LeaderboardItem {
    name: string;
    level: string;
    time: string;
}

interface LeaderboardProps {
    isOpen: boolean;
    new: boolean;
    newData: Omit<LeaderboardItem, "name"> | null;
    onOpenChange: () => void;
    setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

function formatLevel(level: string) {
    return level.charAt(0).toUpperCase() + level.slice(1)
}

export default function Leaderboard(props: LeaderboardProps) {
    const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);
    const [name, setName] = useState("");

    const levels = useMemo(() =>
        [
            { id: "all", label: "All" },
            ...Levels.map((item) => ({ id: item.level, label: item.level.charAt(0).toUpperCase() + item.level.slice(1) })),
        ], [])
    const [filter, setFilter] = useState<Set<string>>(new Set([levels[0].id]))

    const handleClick = () => {
        if (props.newData !== null) {
            const newLeaderboard = [...leaderboard, { ...props.newData, name }]
            newLeaderboard.sort((a, b) => {
                if (a.time < b.time) {
                    return -1
                } else if (a.time > b.time) {
                    return 1
                } else {
                    return 0
                }
            }
            )
            setLeaderboard(newLeaderboard)
            localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard))
            props.setSaved(true)
        }
    }

    const handleCancelClick = () => {
        if (props.newData !== null) {
            props.setSaved(true)
        }
    }

    const handleDelete = (id: number) => {
        setLeaderboard(leaderboard => {
            const newLeaderboard = [...leaderboard].filter((_, index) => index !== id)
            localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard))
            return newLeaderboard
        })
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setFilter(new Set([e.target.value]));
        }
    }

    useEffect(() => {
        const data = localStorage.getItem("leaderboard")
        let newLeaderboard: LeaderboardItem[];
        if (data !== null) {
            newLeaderboard = JSON.parse(data);
            if (filter.values().next().value !== "all") {
                newLeaderboard = newLeaderboard.filter((value) => value.level === filter.values().next().value)
            }
            setLeaderboard(newLeaderboard)
        }
    }, [filter])

    return (
        <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Leaderboard</ModalHeader>
                        <ModalBody>
                            {props.new && props.newData ?
                                <div className="flex items-center gap-4">
                                    <Input className="max-w-fit" type="name" label="Name" onChange={(e) => setName(e.target.value)} />
                                    <p>{formatLevel(props.newData.level)}</p>
                                    <p>{props.newData.time}</p>
                                    <Tooltip color="success" content="Save">
                                        <Button color="success" onClick={handleClick}>
                                            <SaveIcon />
                                        </Button>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Cancel">
                                        <Button color="danger" isIconOnly onClick={handleCancelClick}>
                                            <CancelIcon />
                                        </Button>
                                    </Tooltip>
                                </div> :
                                <></>
                            }
                            <div>
                                <Select
                                    items={levels}
                                    label="Filter"
                                    placeholder="Filter"
                                    selectedKeys={filter}
                                    className="sm:max-w-xs"
                                    onChange={handleFilterChange}
                                >
                                    {(level) => (
                                        <SelectItem key={level.id}>
                                            {level.label}
                                        </SelectItem>
                                    )}
                                </Select>
                            </div>
                            <Table
                                isHeaderSticky
                                aria-label="Minesweeper Leaderboard"
                                className="max-h-64 overflow-scroll">
                                <TableHeader>
                                    <TableColumn>No.</TableColumn>
                                    <TableColumn>Name</TableColumn>
                                    <TableColumn>Level</TableColumn>
                                    <TableColumn>Time</TableColumn>
                                    <TableColumn>Action</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent={"No rows to display."}>
                                    {leaderboard.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{formatLevel(item.level)}</TableCell>
                                            <TableCell>{item.time}</TableCell>
                                            <TableCell>
                                                <Tooltip color="danger" content="Delete">
                                                    <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => handleDelete(index)}>
                                                        <DeleteIcon />
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal >
    )
}
