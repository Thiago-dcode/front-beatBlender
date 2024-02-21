import React from 'react'

export default function ErrorCode({ errorCode }: { errorCode: number }) {
    return (
        <div className='flex items-center gap-2'>
            {errorCode.toString().split('').map((num, i) => {

                return (
                    <p className='text-center m-auto flex  items-center justify-center text-white bg-slate-500 w-[20px] h-[20px] ' key={i}>{num}</p>
                )
            })}
        </div>
    )
}
