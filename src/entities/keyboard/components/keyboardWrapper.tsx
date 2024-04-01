'use client'
import MetaLink from '@/components/metaLink'
import React, { ReactNode } from 'react'
import keyboard from './keyboard'
import { DesignKeyboard } from '@/types'
import '@/entities/keyboard/style.css'
import { cn } from '@/lib/utils'
import { TooltipComponent } from '@/components/ui/toolTipComponent'
import { InfoIcon } from 'lucide-react'
import Info from '@/components/ui/Info'
type props = {
    design?: DesignKeyboard | undefined;
    children: ReactNode,
    className?: string,
    
}
function KeyboardWrapper({ design, children, className = ''}: props) {
    return (
        <>
            {design && <MetaLink href={design.designUrl} />}


            < div className={cn(`flex flex-col items-start gap-1 keyboard-design-${design?.name || ''}`, className)} >
              


                {children}

            </div>
        </>
    )
}

export default KeyboardWrapper