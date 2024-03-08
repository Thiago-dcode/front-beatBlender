'use client'
import KeyButton from '@/entities/key/components/KeyButton'
import SoundHandler from '@/lib/core/soundHandler'
import { KeySize, KeyboardWithKeysAndDesign } from '@/types'
import React, { useCallback, useEffect, useState } from 'react'
import '../style.css'
import useSetSoundHandlers from '../hooks/useSetSoundHandlers'
import useResponsive from '@/lib/hooks/useResponsive'
import KeyboardWrapper from './keyboardWrapper'
export default function Keyboard({ keyboard, enableKeyDown = true, keySize = KeySize.xl, displayName = true }: { keyboard: KeyboardWithKeysAndDesign, enableKeyDown?: boolean, keySize?: KeySize, displayName?: boolean }) {
    const { isPhone } = useResponsive()
    const soundHandlers = useSetSoundHandlers(keyboard, enableKeyDown)
    return (

        <>
            <link rel="stylesheet" type="text/css" href={keyboard.design.designUrl} />
            < div className={`flex flex-col items-start gap-1 keyboard-design-${keyboard.design.name}`} >
                {displayName && !isPhone && <div className='keyboard-title px-5 text-white flex items-center w-full justify-between'>
                    <p title='name' className='keyboard-title'>{keyboard.name}</p>
                    <p title='description' className='keyboard-description text-xs'>{keyboard.description}</p>
                </div>}

                <KeyboardWrapper>


                    {keyboard.keys.map(key => {
                        return (

                            <KeyButton enableKeyDown={enableKeyDown} soundHandler={soundHandlers ? soundHandlers[key.key] : undefined} size={keySize} key={key.id} _key={key} />
                        )
                    })}

                </KeyboardWrapper>

            </div >
        </>
    )
}
