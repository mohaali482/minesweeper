import { Card, CardBody } from "@nextui-org/react"
import { useEffect, useState } from "react"

function Time() {
    const [time, setTime] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            if (running) {
                setTime(time => time + 1)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [running])

    const formatTime = (time: number) => {
        const minute = Math.floor(time / 60)
        const strMinute = minute < 10 ? `0${minute}` : `${minute}`
        const second = time % 60
        const strSecond = second < 10 ? `0${second}` : `${second}`
        return `${strMinute}:${strSecond}`
    }

    return (
        <Card>
            <CardBody>
                <p>Time:</p>
                <p>{formatTime(time)}</p>
            </CardBody>
        </Card>
    )
}

export default Time