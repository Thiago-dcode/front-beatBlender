import MetaLink from '@/components/metaLink'
import React, { ReactNode } from 'react'
import keyboard from './keyboard'
import { DesignKeyboard } from '@/types'
import '@/entities/keyboard/style.css'
type props = {
    design?: DesignKeyboard | undefined;
    children: ReactNode
}
function KeyboardWrapper({ design, children }: props) {
    return (
        <>
            {design && <MetaLink href={design.designUrl} />}


            < div className={`flex flex-col items-start gap-1 keyboard-design-${ design?.name || ''}`} >


                {children}

            </div>
        </>
    )
}

export default KeyboardWrapper