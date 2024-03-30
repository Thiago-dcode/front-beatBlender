import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type Props = {
    className?: string,
    children: ReactNode,
    title?: ReactNode
}
function DivWrapper({ className = '', children, title = undefined }: Props) {
    return (
        <div className={"text-white flex flex-col items-start justify-center gap-1 w-full"}>
            <div className='pl-2'>
                {title}
            </div>
            <div className={cn('flex  items-center justify-center w-full ',className)}>
                {children}
            </div>
        </div>
    )
}

export default DivWrapper