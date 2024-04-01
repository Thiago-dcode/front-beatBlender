
import React, { ReactNode, useEffect, useState } from 'react'

import { X } from 'lucide-react';
import { read } from 'fs';
type Props = {
    trigger: ReactNode,
    children: ReactNode
}
export default function ContextMenuComponent({ trigger = 'hello', children }: Props) {
    const [ready, setReady] = useState(false)
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


            </div>
            {open && <div onClick={()=>{
                setOpen(false)
            }} className="z-[95] backdrop-blur-[1px] fixed border-4 h-screen top-0 w-screen flex items-center justify-center bg-black/40  left-0 m-auto context-menu-div">
                {<div className='z-[99] xs:w-fit  bg-app-background flex flex-col items-center justify-center rounded-md w-full max-w-sm   border-2 py-2 shadow-sm '>
                    <button onClick={() => {
                        setOpen(false)
                    }} className='bg-transparent self-end text-white/80 px-1'>
                        <X size={15} />
                    </button>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }} className='w-full h-full '>
                        {children}
                    </div>

                </div>}

            </div>}
        </>

    )
}
