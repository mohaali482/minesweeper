import { Card, CardBody } from "@nextui-org/react"
import React, { useEffect } from "react"

interface TimeProps {
    running: boolean;
    time: number;

    setTime: React.Dispatch<React.SetStateAction<number>>;
}

export function formatTime(time: number) {
    const minute = Math.floor(time / 60)
    const strMinute = minute < 10 ? `0${minute}` : `${minute}`
    const second = time % 60
    const strSecond = second < 10 ? `0${second}` : `${second}`
    return `${strMinute}:${strSecond}`
}

function Time(props: TimeProps) {

    useEffect(() => {
        const timer = setInterval(() => {
            if (props.running) {
                props.setTime(time => time + 1)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [props.running])

    return (
        <Card>
            <CardBody>
                <p>Time:</p>
                <p>{formatTime(props.time)}</p>
            </CardBody>
        </Card>
    )
}

export default Time