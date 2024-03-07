import React from 'react'

export default function FormSuccess({ timer,timerBrake, message }: {
    timer: number,
    timerBrake: number,
    message: string
}) {
    return (
        <div className='flex flex-col items-center  gap-1  text-white'>
            <p className=' bg-green-500/80 rounded-sm p-2' >{message}</p>
            <span className='text-sm'>redirecting in:{timer === timerBrake ? 0 : timerBrake- timer}</span>
        </div>
        
    )
}
