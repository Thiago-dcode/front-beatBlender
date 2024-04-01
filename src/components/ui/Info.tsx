import { InfoIcon } from 'lucide-react'
import React from 'react'
import { TooltipComponent } from './toolTipComponent'
type Props = {
    text: string
    iconColor?: string,
    iconSize?: number,
}
export default function Info({ iconColor = 'black', iconSize = 20, text }: Props) {
    return (
        <TooltipComponent  trigger={<InfoIcon className='cursor-help' size={iconSize} color={iconColor} />}>
            <p className='max-w-sm text-center '>{text}</p>
        </TooltipComponent>
    )
}
