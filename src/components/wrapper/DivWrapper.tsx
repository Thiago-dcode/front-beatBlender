import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

type Props = {
    className?: string,
    children: ReactNode,
    title?: ReactNode,
    footer?: ReactNode,
    bgColor?: string,

}
function DivWrapper({ className = '', children, title = undefined, footer = undefined, bgColor = '' }: Props) {
    return (
        <div style={{
            backgroundColor: bgColor
        }} className={"text-white flex flex-col items-start justify-center gap-2 w-full p-0.5 rounded-md"}>
            <>
                {title}
            </>
            <div className={cn('flex  items-center justify-center w-full ', className)}>
                {children}
            </div>
            <>
                {footer}
            </>
        </div>
    )
}

export default DivWrapper