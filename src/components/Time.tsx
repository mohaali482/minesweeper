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
    return (
        <div>
            <h1>Time: {time}</h1>
        </div>
    )
}

export default Time