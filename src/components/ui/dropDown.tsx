'use client'

import { Input } from 'postcss'
import { useState, useEffect, ReactNode } from 'react'
import DivWrapper from '../wrapper/DivWrapper'
import { cn } from '@/lib/utils'

type Props = {
    children: ReactNode,
    trigger: ReactNode,
    open?: boolean,
    preventDefault?: boolean,
    className?: string,
    onOpenChange?: (e: boolean) => void
}
export default function DropDown({ children, trigger, open = false, className = '' ,preventDefault = false, onOpenChange
    = () => { } }: Props) {
    const [_open, setOpen] = useState(open)

    useEffect(() => {

        onOpenChange(_open)
     

    }, [_open])
    useEffect(() => {
        setOpen(open)
    }, [open])
    return (
        <DivWrapper className="relative flex-col gap-2">

            <button type="button" onClick={() => {
                if (preventDefault) return
                setOpen(!_open)
            }}>
                {trigger}
            </button>

            {_open && <div className={cn("border rounded-sm bg-white w-full flex flex-col items-center absolute top-11 animate-in", className)}>
                {children}
            </div>}

        </DivWrapper>
    )
}
