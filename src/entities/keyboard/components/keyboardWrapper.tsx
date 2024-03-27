import MetaLink from '@/components/metaLink'
import React, { ReactNode } from 'react'
import keyboard from './keyboard'
import { DesignKeyboard } from '@/types'
import '@/entities/keyboard/style.css'
import { cn } from '@/lib/utils'
type props = {
    design?: DesignKeyboard | undefined;
    children: ReactNode,
    className?: string
}
function KeyboardWrapper({ design, children,className= '' }: props) {
    return (
        <>
            {design && <MetaLink href={design.designUrl} />}


            < div className={cn(`flex flex-col items-start gap-1 keyboard-design-${ design?.name || ''}`,className)} >


                {children}

            </div>
        </>
    )
}

export default KeyboardWrapper