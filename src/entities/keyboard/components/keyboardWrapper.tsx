'use client'
import MetaLink from '@/components/metaLink'
import React, { ReactNode } from 'react'
import keyboard from './keyboard'
import { DesignKeyboard } from '@/types'
import '@/entities/keyboard/style.css'
import { cn } from '@/lib/utils'
import { TooltipComponent } from '@/components/ui/toolTipComponent'
import { InfoIcon } from 'lucide-react'
type props = {
    design?: DesignKeyboard | undefined;
    children: ReactNode,
    className?: string,
    showToolTip?: boolean
}
function KeyboardWrapper({ design, children, className = '', showToolTip = false }: props) {
    return (
        <>
            {design && <MetaLink href={design.designUrl} />}


            < div className={cn(`flex flex-col items-start gap-1 keyboard-design-${design?.name || ''}`, className)} >
                <div className='self-end'>
                    {showToolTip && <TooltipComponent trigger={<InfoIcon size={20} color='black' />}>
                        <p>Right Click over the key to edit it</p>
                    </TooltipComponent>}
                </div>


                {children}

            </div>
        </>
    )
}

export default KeyboardWrapper