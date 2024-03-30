
import React, { ReactNode, useEffect, useState } from 'react'

import { X } from 'lucide-react';
type Props = {
    trigger: ReactNode,
    children: ReactNode
}
export default function ContextMenuComponent({ trigger = 'hello', children }: Props) {

    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (!open) return


    }, [open])

    return (
        <>
            <div className=''>
                <button onContextMenu={(e) => {
                    e.preventDefault()
                    setOpen(!open)
                }} >
                    {trigger}
                </button>

                {open && <div className="absolute top-0 left-0 right-0 h-screen w-screen flex items-center justify-center ">
                    <div className='z-[99] xs:w-fit  bg-app-background/90 flex flex-col items-center justify-center rounded-md w-full max-w-sm   border-2 py-2 shadow-sm'>
                        <button onClick={() => {
                            setOpen(false)
                        }} className='bg-transparent self-end text-white/80 px-1'>
                            <X size={15} />
                        </button>
                        <div className='w-full h-full'>
                            {children}
                        </div>

                    </div>

                </div>}
            </div>
            {open && <div onMouseDown={(e) => {
                e.stopPropagation()
                setOpen(false)
            }} className='z-[98] top-0 bg-black/20 w-screen h-screen absolute border-4 left-0'>

            </div>}</>

    )
}
