
import React, { ReactNode, useEffect, useState } from 'react'

import { MessageCircleX, X } from 'lucide-react';
import { read } from 'fs';
type Props = {
    trigger: ReactNode,
    children: ReactNode,
    onOpenChange?: (e: boolean) => void
}
export default function ContextMenuComponent({ trigger = 'hello', children, onOpenChange = () => { } }: Props) {
    const [open, setOpen] = useState(false)
    useEffect(() => {
       
        onOpenChange(open)


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
            {open && <div onClick={() => {
                setOpen(false)
            }} className="z-[95] backdrop-blur-sm fixed border-4 h-screen top-0 w-screen flex items-center justify-center bg-black/40  left-0 m-auto context-menu-div">
                {<div className='z-[99] xs:w-fit border-4 border-white/80 bg-app-background/90 flex flex-col items-center justify-center rounded-md w-full max-w-sm  py-2 '>
                    <button onClick={() => {
                        setOpen(false)
                    }} className='bg-transparent self-end text-white/80 px-1'>
                        <X size={15} />
                    </button>
                    <div onClick={(e) => {
                        e.stopPropagation()
                    }} className='w-full h-full p-2 '>
                        {children}
                    </div>

                </div>}

            </div>}
        </>

    )
}
