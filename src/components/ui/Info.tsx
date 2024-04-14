import { InfoIcon } from 'lucide-react'
import React, { ReactNode } from 'react'
import { TooltipComponent } from './toolTipComponent'
type Props = {
    text: ReactNode
    iconColor?: string,
    iconSize?: number,
    icon?: ReactNode
}
export default function Info({ iconColor = 'black', iconSize = 20, text, icon = <InfoIcon className='cursor-help' size={iconSize} color={iconColor} /> }: Props) {
    return (
        <TooltipComponent trigger={icon}>
            <p className='max-w-sm text-center '>{text}</p>
        </TooltipComponent>
    )
}
