import React, { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import '../style.css'
type props = {
    size: number,
    bgColor?: string,
    id: string,
    className? :string,
    children: ReactNode
}
function KeyWrapper({ size, bgColor = '', id, children ,className =''}: props) {
    return (
        <div style={
            {
                background: bgColor || '',
                width: `${size}rem`,
                height: `${size}rem`,
            }
        } className={cn(`relative button-key-div flex flex-col items-center justify-center `,className)} id={`div-${id}`}>{children}</div>
    )
}

export default KeyWrapper