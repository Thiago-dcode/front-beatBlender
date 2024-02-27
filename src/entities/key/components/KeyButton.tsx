'use client'

import { Button } from '@/components/ui/button'
import { key, KeySize } from '@/types'
import React, { useEffect, useState } from 'react'
import '@/entities/key/style.css'
import SoundHandler from '@/lib/core/soundHandler'



export default function KeyButton({ _key, size = KeySize.xl, soundHandler }: { _key: key, size?: KeySize, soundHandler: SoundHandler | undefined }) {

    return (<>
        <div style={
            {
                width: `${size}rem`,
                height: `${size}rem`
            }
        } className={` button-key-div flex flex-col justify-center `} id={`div-${_key.key}`}>
            {soundHandler &&
                <Button variant={'disable'} id={`key-${_key.key}`} className='key-button' onClick={() => {
                    soundHandler.keyDown('loop')
                    soundHandler.keyUp()
                }} key={_key.id}>{_key.displayName}</Button>
            }
        </div>

    </>

    )

}
