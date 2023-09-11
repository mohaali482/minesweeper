import { Button } from "@nextui-org/react"
import "boxicons"
import { memo } from "react";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'box-icon': BoxIconProps;
        }
    }
}

interface BoxIconProps {
    type?: string;
    name: string;
    color?: string;
    size?: string;
    rotate?: string;
    flip?: string;
    border?: string;
    animation?: string;
    pull?: string;
}

interface GridSquareProps {
    value: string;
    onClick: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SquareProps {
    color: "danger" | "primary" | "default" | "success" | "warning";
    children?: React.ReactNode;
    onClick: () => void;
    onContextMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
}



function Square(props: SquareProps) {
    return <Button isIconOnly color={props.color} variant="shadow" onClick={props.onClick} onContextMenu={props.onContextMenu}>{props.children}</Button>
}

function MineSquare(props: GridSquareProps) {
    return (
        <Square color="danger" onClick={props.onClick} onContextMenu={props.onContextMenu}>
            <box-icon type="solid" name="bomb" color="white" size="sm"></box-icon>
        </Square>
    )
}

function NumberSquare(props: GridSquareProps) {
    return (
        <Square color="primary" onClick={props.onClick} onContextMenu={props.onContextMenu}>{props.value}</Square>
    )
}

function BlankSquare(props: GridSquareProps) {
    return (
        <Square color="success" {...props} />
    )
}

function UnopenedSquare(props: GridSquareProps) {
    return (
        <Square color="default" {...props} />
    )
}

function Flag(props: GridSquareProps) {
    return (
        <Square color="warning" onClick={props.onClick} onContextMenu={props.onContextMenu}>
            <box-icon type="solid" name="flag" color="white" size="sm"></box-icon>
        </Square>
    )
}

function GridSquare(props: GridSquareProps) {
    if (props.value === "U") return <UnopenedSquare {...props} />
    if (props.value === "B") return <BlankSquare {...props} />
    if (props.value === "M") return <MineSquare  {...props} />
    if (props.value === "F") return <Flag  {...props} />
    return <NumberSquare {...props} />
}

const MemoizedGridSquare = memo(GridSquare);


export default MemoizedGridSquare;
