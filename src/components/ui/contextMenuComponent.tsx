
import React, { ReactNode, useEffect, useRef, useState } from 'react'

import { MessageCircleX, X } from 'lucide-react';
import useResponsive from '@/lib/hooks/useResponsive';
type Props = {
    trigger: ReactNode,
    children: ReactNode,
    onOpenChange?: (e: boolean) => void
}
export default function ContextMenuComponent({ trigger = 'hello', children, onOpenChange = () => { } }: Props) {

    let divContent = useRef<HTMLDivElement>(null)
    const device = useResponsive()
    const [contentIsBigger, setContentIsBigger] = useState(false)
    const [open, setOpen] = useState(false)
    useEffect(() => {

        onOpenChange(open)


    }, [open])

    useEffect(() => {

        if (!divContent.current) return


        setContentIsBigger(device.height - divContent.current.offsetHeight < 40)



    }, [device])


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
            }} className={`z-[95] backdrop-blur-sm fixed border-4 h-screen overflow-auto top-0 w-screen flex py-5 px-2 ${contentIsBigger ? '' : 'items-center'}  justify-center bg-black/40  left-0 m-auto context-menu-div`}>
                {<div ref={divContent} id='context-menu-content' className='z-[99] xs:w-fit border-4 border-white/80 bg-app-background/90 flex flex-col h-fit items-center justify-center rounded-md w-full max-w-sm  py-2 '>
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
