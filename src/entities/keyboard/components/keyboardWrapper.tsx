import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
type props = {
    children: ReactNode,
    className?: string
}
function KeyboardWrapper({ children, className = '' }: props) {
    return (
        <div className={cn('keyboard flex gap-2 flex-wrap items-center justify-start flex-grow py-3 px-2 m-auto max-w-3xl', className)} id='keyboard'> {children}</div>
    )
}

export default KeyboardWrapper