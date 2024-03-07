import React, { useEffect, useState } from 'react'

export default function FormSuccess({ timer, timerBrake, message }: {
    timer: number,
    timerBrake: number,
    message: string
}) {

    const [_timer, setTimer] = useState(timerBrake)

    useEffect(() => {
        const newTimer = timerBrake - timer
        if (newTimer <= 0) {
            setTimer(0)
            return
        }
        setTimer(newTimer)

    }, [timerBrake, timer])

    return (
        <div className='flex flex-col items-center  gap-1  text-white'>
            <p className=' bg-green-500/80 rounded-sm p-2' >{message}</p>
            <span className='text-sm'>redirecting in:{_timer}</span>
        </div>

    )
}
